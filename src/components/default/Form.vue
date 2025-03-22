<script setup lang="ts">

defineProps<{
  isValid: boolean,
  message?: string
}>()

</script>


<template>
<div class="">
  <slot />
</div>
  <span v-if="!isValid && message">{{ message }}</span>
</template>

<style scoped>

</style>
