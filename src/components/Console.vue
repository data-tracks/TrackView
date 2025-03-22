<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import {useConnectionStore} from "@/stores/connection";
import {useToastStore} from "@/stores/toast";

let id = -1;

const input = ref("");

const communication = useConnectionStore();

const {addListener, removeListener, query} = communication;

const responses = ref([]);

const toast = useToastStore();

const send = async () => {
  await query(input.value);
  input.value = "";
  toast.addToast("Successfully send query!");
}

onMounted(() => {
  id = addListener(() =>  {
    responses.value.push(responses.value[0]);
    if (responses.value.length > 5) {
      responses.value.splice(0, 5);
    }
  })
});

onUnmounted(() => {
  removeListener(id);
});
</script>

<template>
  <div class="flex flex-col pb-16 min-w-[400px] justify-self-center container">
    <h1 class="text-xl mb-3 font-bold px-2 w-auto">
       Console
    </h1>
    <div>

    </div>
    <div>
      <textarea class="input textarea bg-white/80 text-black w-full" v-model="input" placeholder="Type command here..."></textarea>
      <div class="card-actions justify-end">
        <button class="btn btn-secondary mt-3" @click="send">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
