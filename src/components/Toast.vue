<script setup lang="ts">
import { ToastType, useToastStore } from '../stores/toast'
import { storeToRefs } from 'pinia'

const store = useToastStore()
const {toasts} = storeToRefs(store) //[{ message: "test", type: ToastType.success}];

const getTypesInfo = (t: ToastType):[string,string] => {
  switch (t) {
    case ToastType.success:
      return ["", "stroke-info"]
    case ToastType.error:
      return ["alert-error", "stroke-white"]
    case ToastType.warning:
      return ["alert-warning", "stroke-white"]
  }
}


</script>

<template>
<div v-if="toasts && toasts.length > 0" class="z-10 py-4 absolute w-auto right-0 gap-2 grid me-2">
  <div v-for="toast in toasts" :key="toast.message" class="alert" role="alert" :class="[getTypesInfo(toast.type)[0]]">
    <svg class="h-6 w-6 shrink-0" :class="[getTypesInfo(toast.type)[1]]" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round"
            stroke-linejoin="round" stroke-width="2"/>
    </svg>
    <span>
      {{toast.message}}
    </span>
  </div>
</div>
</template>

<style scoped>

</style>
