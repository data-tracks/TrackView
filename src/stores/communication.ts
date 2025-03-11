import { defineStore } from 'pinia'
import { flatbuffers } from "flatbuffers";
import {Command} from "../../external/flatbuffers/generated/ts/src/protocol";

export const useCommunicationStore = defineStore('communication', () => {
    const fetching = async () => {
        const response = await fetch("http://localhost:3000/user");
        const buffer = await response.arrayBuffer();
        const byteBuffer = new flatbuffers.ByteBuffer(new Uint8Array(buffer));
        const command = Command.getRootAsCommand(byteBuffer);
    }

    return { fetch }
})
