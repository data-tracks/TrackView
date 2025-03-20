<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import {useConnectionStore} from "../stores/connection";
import {useConfigStore} from "../stores/config";
import {storeToRefs} from "pinia";

const messages = ref<string[]>([]);

const communication = useConnectionStore();

const {addListener, removeListener, sendMessage} = communication;
let id = -1;

const config = useConfigStore();
const {port} = storeToRefs(config);

onMounted(() => {
  id = addListener(() =>  {
    messages.value.push(messages.value[0]);
    if (messages.value.length > 5) {
      messages.value.splice(0, 5);
    }
  })
});

onUnmounted(() => {
  removeListener(id);
});
</script>

<template>
  <div class="container">
    <h2>Incoming Messages</h2>

    <p>Port</p>
    <input type="text" v-model="port" />

    <ul class="mt-4">
      <li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>
    </ul>
    <button class="btn" @click="sendMessage('test')">Send Message</button>
  </div>
</template>

