import {defineStore} from 'pinia'
import * as flatbuffers from "flatbuffers";
import {Message} from "../../external/flatbuffers/generated/ts/src/protocol/message";
import {Status as ProtoStatus} from "../../external/flatbuffers/generated/ts/src/protocol/status";
import {ref} from "vue";
import {useConfigStore} from "./config";
import {Query} from "../../external/flatbuffers/generated/ts/src/protocol/query";
import {Payload} from "../../external/flatbuffers/generated/ts/src/protocol/payload";


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

    ProtoStatus.startStatus(builder);
    ProtoStatus.addMsg(builder, message);
    const status = ProtoStatus.endStatus(builder);
    Message.startMessage(builder);
    Message.addStatus(builder, status)

    const messageOffset = Message.endMessage(builder);

    builder.finish(messageOffset);

    return builder.asUint8Array();
}

export async function serializeQuery(query: string): Promise<Uint8Array> {
    // Create a FlatBuffer message
    const builder = new flatbuffers.Builder(1024);
    const queryString = builder.createString(query);

    Query.startQuery(builder);
    Query.addQuery(builder, queryString)
    let queryOffset = Query.endQuery(builder);

    Message.startMessage(builder);
    Message.addData(builder, queryOffset);
    Message.addDataType(builder, Payload.Query);

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

    const sendMessage = async (binary: Uint8Array) => {
        if (ws.value && isConnected.value) {
            ws.value.send(binary);
        } else {
            console.warn("Cannot send message, WebSocket is not connected.");
        }
    };

    const query = async (query: string) => {
        const binary = await serializeQuery(query);
        await sendMessage(binary);
    }

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

    return { ws, isConnected, connect, addListener, removeListener, query };
})

export enum Status {
    Connected = "connected",
    Disconnected = "disconnected",
    Error = "error",
    Debug = "debug",
}
