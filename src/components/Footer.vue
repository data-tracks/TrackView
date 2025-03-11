<script setup lang="ts">
import { Theme, useThemeStore } from '../stores/theme'
import { storeToRefs } from 'pinia'
import Status from "../components/Status.vue";

const themeStore = useThemeStore();

</script>

<template>
<div class="p-2 px-4 flex text-sm   justify-between" >
  <div class="flex">
    @DataTracks {{new Date().getFullYear()}}
  </div>

  <Status />
</div>
</template>

<style scoped>

</style>
