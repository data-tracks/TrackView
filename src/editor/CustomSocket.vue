<script setup lang="ts">

defineProps<{
  data: any;
}>()

</script>

<template>
  <div class="socket rounded-2 bg-black" :title="data.name"></div>
</template>

<style lang="scss" scoped>
@use "sass:math";
@use "vars";

.socket {
  display: inline-block;
  cursor: pointer;
  width: vars.$socket-size;
  height: vars.$socket-size;
  vertical-align: middle;
  z-index: 2;
  box-sizing: border-box;
  &:hover {
    background: #ddd;
  }
}
</style>



