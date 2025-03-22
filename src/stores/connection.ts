import {defineStore} from 'pinia'
import * as flatbuffers from "flatbuffers";
import {Builder} from "flatbuffers";
import {ref} from "vue";
import {useConfigStore} from "./config";
import { Register, Create, CreatePlan, CreateType, Message, Payload} from "trackrails"


async function translate(res: Response) {
    const buffer = await res.arrayBuffer();
    return new flatbuffers.ByteBuffer(new Uint8Array(buffer));
}

export async function deserializeMessage(res: Response): Promise<Message>{
    return Message.getRootAsMessage(await translate(res));
}

export function serializeCreatePlan(name: string, plan: string) {
    return buildMessage((builder: Builder) => {
        const nameOffset = builder.createString(name);
        const planOffset = builder.createString(plan);

        CreatePlan.startCreatePlan(builder);
        CreatePlan.addPlan(builder, planOffset);
        CreatePlan.addName(builder, nameOffset);
        let createPlanOffset = CreatePlan.endCreatePlan(builder);

        Create.startCreate(builder);
        Create.addCreateType(builder, createPlanOffset);
        Create.addCreateTypeType(builder, CreateType.CreatePlan);
        return Create.endCreate(builder);
    }, Payload.Create);
}

export function serializeRegister() {
    return buildMessage((b: Builder) => {
        Register.startRegister(b);
        return Register.endRegister(b);
    }, Payload.Register);
}

export function buildMessage(attacher: (builder:Builder) => number, payload: Payload): Uint8Array {
    const builder = new flatbuffers.Builder(1024);


    let createOffset = attacher(builder);

    Message.startMessage(builder);
    Message.addData(builder, createOffset);
    Message.addDataType(builder, payload);

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

        ws.value.onopen = async () => {
            console.log("WebSocket connected");
            isConnected.value = true;

            let register = serializeRegister();
            await sendMessage(register);
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
            console.log("Error");
            throw Error(`WebSocket not connected`);
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

    return { ws, isConnected, connect, addListener, removeListener, sendMessage };
})

export enum Status {
    Connected = "connected",
    Disconnected = "disconnected",
    Error = "error",
    Debug = "debug",
}
