<script setup lang="ts">

import { ArrowDownBoldIcon, ArrowUpBoldIcon } from 'mdi-vue3'
import {Status, useConnectionStore} from "../stores/connection";
import {storeToRefs} from "pinia";


const connection = useConnectionStore();

const {isConnected} = storeToRefs(connection);


</script>

<template>
<div>
  <div class="text-green-400 flex gap-2" v-if="isConnected">
    <ArrowUpBoldIcon width="1rem" class="fill-green-400"  />
    {{Status.Connected}}
  </div>
  <div class="text-red-400 flex gap-2" v-else>
    <ArrowDownBoldIcon width="1rem" class="fill-red-400"  />
    {{Status.Disconnected}}
  </div>
</div>
</template>

<style scoped>

</style>
