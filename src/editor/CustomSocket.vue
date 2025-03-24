<script setup lang="ts">

defineProps<{
  data: any;
}>()

</script>

<template>
  <div class="socket" :title="data.name"></div>
</template>

<style lang="scss" scoped>
@use "sass:math";
@import "vars";

.socket {
  display: inline-block;
  cursor: pointer;
  border: 1px solid grey;
  width: $socket-size;
  height: $socket-size * 2;
  vertical-align: middle;
  background: #fff;
  z-index: 2;
  box-sizing: border-box;
  &:hover {
    background: #ddd;
  }
}
</style>



