import { defineStore } from 'pinia'
import * as flatbuffers from "flatbuffers";
import {Message, Payload} from "/external/flatbuffers/generated/ts/src/protocol";


async function translate(res: Response) {
    const buffer = await res.arrayBuffer();
    return new flatbuffers.ByteBuffer(new Uint8Array(buffer));
}

export async function deserializeMessage(res: Response): Promise<Message>{
    return Message.getRootAsMessage(await translate(res));
}

export async function serializeMessage(msg: string) {
    // Create a FlatBuffer message
    const builder = new flatbuffers.Builder(1024);
    const textOffset = builder.createString(msg);

    Message.startMessage(builder);
    const messageOffset = Message.endMessage(builder);

    builder.finish(messageOffset);

    return builder.asUint8Array();
}

export const useCommunicationStore = defineStore('communication', () => {
    const fetching = async () => {

    }

    return {  }
})
