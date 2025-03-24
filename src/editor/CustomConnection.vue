<script setup lang="ts">

let props = defineProps<{
  data: string,
  start: number,
  end: number,
  path: string,
}>()

</script>

<template>
  <svg data-testid="connection">
    <path :d="props.path"></path>
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
    stroke: white;
    pointer-events: auto;
  }
}
</style>


