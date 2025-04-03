<script setup lang="ts">

const props = defineProps<{
  'data': any,
}>()

const onClick = () => {
  console.log('onClick')
}

</script>

<template>
  <div class="grid w-full justify-items-center">
    <button class="btn hover:bg-primary self-center" @click="onClick">{{props.data.label}}</button>
  </div>
</template>

<style scoped>

</style>
