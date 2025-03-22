<script setup lang="ts">

import Simulation from "../components/Simulation.vue";
import Card from "@/components/default/Card.vue";
import DefaultLayout from "@/layout/DefaultLayout.vue";
</script>

<template>
  <default-layout title="Simulation">
    <Card :has-padding="true">
      <Simulation />
    </Card>
  </default-layout>
</template>

<style scoped>

</style>
