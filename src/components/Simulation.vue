<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import {deserializeMessage, serializeMessage} from "../stores/communication";

const messages = ref<string[]>([]);
let socket: WebSocket | null = null;

const readMessage = async (event: MessageEvent) => {
  messages.value.push((await deserializeMessage(event.data)).toString());
}

// Function to send a message
const sendMessage = async () => {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    console.error("WebSocket is not connected");
    return;
  }
  const buffer = serializeMessage("");
  socket.send(await buffer); // Send the encoded message
}

onMounted(() => {
  // Open a WebSocket connection
  socket = new WebSocket("ws://localhost:3000");

  // Listen for messages
  socket.addEventListener("message", readMessage);
});

onUnmounted(() => {
  // Clean up WebSocket connection
  if (socket) {
    socket.close();
    socket = null;
  }
});
</script>

<template>
  <div class="container">
    <h2>Incoming Messages</h2>
    <ul>
      <li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>
    </ul>
    <button class="btn" @click="sendMessage">Send Message</button>
  </div>
</template>

