<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import {deserializeMessage, serializeMessage} from "../stores/communication";
import {ToastType, useToastStore} from "../stores/toast";

const messages = ref<string[]>([]);
let socket: WebSocket | null = null;

const readMessage = async (event: MessageEvent) => {
  messages.value.push((await deserializeMessage(event.data)).toString());
}

const toast = useToastStore();



// Function to send a message
const sendMessage = async () => {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    toast.addToast("WebSocket is not connected", ToastType.error);
    return;
  }
  const buffer = serializeMessage("");
  socket.send(await buffer); // Send the encoded message
  toast.addToast("Send message");
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

    <ul class="mt-4">
      <li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>
    </ul>
    <button class="btn" @click="sendMessage">Send Message</button>
  </div>
</template>

