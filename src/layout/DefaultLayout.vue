<script setup lang="ts">
import { useThemeStore } from '../stores/theme'

defineProps<{
  title?: string
}>()

const themeStore = useThemeStore()

</script>

<template>
  <div class="container mx-auto p-6">
    <div class="flex flex-wrap justify-between items-center mb-4 px-2">
      <h1 class="text-3xl font-bold" v-if="title">{{ title }}</h1>
    </div>

    <slot />
  </div>
</template>

<style scoped>

</style>
