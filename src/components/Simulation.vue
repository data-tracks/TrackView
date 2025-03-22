<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import {useConnectionStore} from "../stores/connection";
import {useConfigStore} from "../stores/config";
import {storeToRefs} from "pinia";

const messages = ref<string[]>([]);

const communication = useConnectionStore();

const {addListener, removeListener} = communication;
let id = -1;

const config = useConfigStore();
const {port} = storeToRefs(config);
const message = ref<string>("");

const send = () => {
  message.value = "";
}

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
  <div class="flex flex-col">
    <div class="container">
      <ul class="mt-4">
        <li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>
      </ul>
    </div>
    <div class="container">
      <h2>Interaction</h2>
      <fieldset class="fieldset">
        <label class="fieldset-label">Port</label>
        <input class="input" type="text" v-model="port" />

        <label class="fieldset-label">Message</label>
        <input type="text" class="input" v-model="message" />
        <div class="mt-3">
          <button class="btn" :disabled="message.trim() == ''" @click="send">Send</button>
        </div>
      </fieldset>
    </div>
  </div>
</template>

