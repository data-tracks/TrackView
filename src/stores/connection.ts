import { defineStore } from 'pinia'
import * as flatbuffers from "flatbuffers";
import {Message} from "../../external/flatbuffers/generated/ts/src/protocol/message";
import {Status as ProtoStatus} from "../../external/flatbuffers/generated/ts/src/protocol/status";
import {String as ProtoString} from "../../external/flatbuffers/generated/ts/src/protocol/string";
import {ref} from "vue";
import {useConfigStore} from "./config";


async function translate(res: Response) {
    const buffer = await res.arrayBuffer();
    return new flatbuffers.ByteBuffer(new Uint8Array(buffer));
}

export async function deserializeMessage(res: Response): Promise<Message>{
    return Message.getRootAsMessage(await translate(res));
}

export async function serializeMessage(msg: string): Promise<Uint8Array> {
    // Create a FlatBuffer message
    const builder = new flatbuffers.Builder(1024);
    const message = builder.createString(msg);
    ProtoString.startString(builder);
    ProtoString.addData(builder, message);
    const stringOffset = ProtoString.endString(builder);
    ProtoStatus.startStatus(builder);
    ProtoStatus.addMsg(builder, stringOffset);
    const status = ProtoStatus.endStatus(builder);
    Message.startMessage(builder);
    Message.addStatus(builder, status)

    const messageOffset = Message.endMessage(builder);

    builder.finish(messageOffset);

    return builder.asUint8Array();
}

export const useConnectionStore = defineStore('communication', () => {
    const config = useConfigStore();
    const ws = ref<WebSocket|null>(null);
    const isConnected = ref(false)
    const listeners = ref(new Map<number, (event: MessageEvent<any>) => void>());
    const i = ref(0);


    const connect = () => {
        if (ws.value) return; // Prevent duplicate connections

        ws.value = new WebSocket(`ws://localhost:${config.port}/ws`)

        ws.value.onopen = () => {
            console.log("WebSocket connected");
            isConnected.value = true;
        };

        ws.value.onmessage = (event) => {
            console.log("Received:", event.data);
            for (let listener of listeners.value.values()) {
                listener(event);
            }
        };

        ws.value.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        ws.value.onclose = () => {
            console.log("WebSocket disconnected");
            isConnected.value = false;
            ws.value = null;
            setTimeout(connect, 3000); // Auto-reconnect after 3 seconds
        };
    };

    const sendMessage = async (message: string) => {
        if (ws.value && isConnected.value) {
            const binary = await serializeMessage(message);
            ws.value.send(binary);
        } else {
            console.warn("Cannot send message, WebSocket is not connected.");
        }
    };

    const addListener = (listener: ((event:MessageEvent<any>) => void )) => {
        const id = i.value;
        listeners.value.set(id, listener);
        i.value++;
        return id;
    }

    const removeListener = (id: number) => {
        listeners.value.delete(id);
    }

    connect();

    return { ws, isConnected, connect, sendMessage, addListener, removeListener };
})

export enum Status {
    Connected = "connected",
    Disconnected = "disconnected",
    Error = "error",
    Debug = "debug",
}
