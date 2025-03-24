<script setup lang="ts">

import { useThemeStore } from '../../stores/theme'
import { storeToRefs } from 'pinia'

export interface CardProps {
  hasPadding?: boolean,
}

withDefaults(defineProps<CardProps>(), {
  hasPadding: false
})

const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)

</script>

<template>
  <div class="card bg-black/50 shadow-lg">
    <div class="p-2 mb-4 px-4 flex justify-between" v-if="$slots.left || $slots.right">
      <div class="font-medium">
        <slot name="left"></slot>
      </div>

      <div class="font-medium">
        <slot name="right"></slot>
      </div>
    </div>
    <div class="pb-6" :class="hasPadding ? 'p-4': ''">
      <slot />
    </div>
    <div v-if="$slots.bottom" class="border-t border-gray-300 py-4" :class="{'border-grey-900 bg-gray-800': isDark}">
      <slot name="bottom"></slot>
    </div>

  </div>
</template>

<style scoped>

</style>
