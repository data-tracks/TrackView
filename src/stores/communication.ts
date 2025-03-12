import { defineStore } from 'pinia'
import * as flatbuffers from "flatbuffers";
import {Command} from "@protocol/protocol";
import {ByteBuffer} from "flatbuffers";

async function translate(res: Response) {
    const buffer = await res.arrayBuffer();
    return  new flatbuffers.ByteBuffer(new Uint8Array(buffer));
}

export async function translateCommand(res: Response): Message{
    return Command.getRootAsCommand(translateCommand(res));
}

export const useCommunicationStore = defineStore('communication', () => {
    const fetching = async () => {

    }

    return {  }
})
