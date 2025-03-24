<script setup lang="ts">
import DefaultLayout from '../layout/DefaultLayout.vue'
import { usePlanStore } from '../stores/plan'
import { storeToRefs } from 'pinia'
import {computed, onMounted, type Ref, ref, useTemplateRef} from "vue";
import Card from "@/components/default/Card.vue";
import {createEditor} from "@/editor/editor";

let store = usePlanStore()

const { plans } = storeToRefs(store)
let length = computed(() => {
  return plans.value.length
})

const stats = ref(new Map<string, Ref<any>>([["Plans", length]]));

const rete = useTemplateRef('rete');

onMounted(() => {
  createEditor(rete.value)
})

</script>

<template>
  <default-layout title="Statistics">
    <div class="justify-center align-center justify-self-center drop-shadow-lg">
      <Card :has-padding="true">
        <div class="stat" v-for="[k,v] in stats" :key="k">
          <div class="stat-title">
            {{ k }}
          </div>
          <div class="stat-value text-secondary">
            {{ v }}
          </div>
        </div>
      </Card>
      <Card class="mt-5" :has-padding="true">
        <div class="rete h-[300px]" ref="rete"></div>
      </Card>
    </div>

  </default-layout>
</template>
