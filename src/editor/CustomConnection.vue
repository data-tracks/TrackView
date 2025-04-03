<script setup lang="ts">

let props = defineProps<{
  data: any,
  start: any,
  end: any,
  path: string,
}>()

</script>

<template>
  <svg data-testid="connection">
    <path class="stroke-blue-400" :d="props.path"></path>
  </svg>
</template>

<style lang="scss" scoped>
svg {
  overflow: visible !important;
  position: absolute;
  pointer-events: none;
  width: 9999px;
  height: 9999px;
  path {
    fill: none;
    stroke-width: 3px;
    pointer-events: auto;
  }
}
</style>


