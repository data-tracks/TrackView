<script setup lang="ts">
import DefaultLayout from '../layout/DefaultLayout.vue'
import { usePlanStore } from '../stores/plan'
import { storeToRefs } from 'pinia'
import {computed, type Ref, ref} from "vue";

let store = usePlanStore()

const { plans } = storeToRefs(store)
let length = computed(() => {
  return plans.value.length
})

const stats = ref(new Map<string, Ref<any>>([["Plans", length]]));

</script>

<template>
  <default-layout title="Statistics">
    <div class="justify-center align-center justify-self-center drop-shadow-lg">
      <div class="stats card bg-black/50 p-5 min-w-[500px] w-full">
        <div class="stat" v-for="[k,v] in stats">
          <div class="stat-title">
            {{ k }}
          </div>
          <div class="stat-value text-secondary">
            {{ v }}
          </div>
        </div>
      </div>
    </div>

  </default-layout>
</template>
