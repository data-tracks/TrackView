<script setup lang="ts">
import DefaultLayout from '../layout/DefaultLayout.vue'
import { usePlanStore } from '../stores/plan'
import {onMounted, ref} from 'vue'
import { storeToRefs } from 'pinia'

let store = usePlanStore()

const { plans } = storeToRefs(store)

const stats = ref(new Map<string, any>([["Plans", plans.value.length]]));

onMounted(async () => {
  await store.fetchPlans()
})

</script>

<template>
  <default-layout title="Statistics">
    <div class="justify-center align-center justify-self-center drop-shadow-lg">
      <div class="stats card bg-black/50 p-5 min-w-[500px]">
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
