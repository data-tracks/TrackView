<script setup lang="ts">
import { RouterLink } from 'vue-router'
import router from '../router'
import {capitalize, type Component} from 'vue'
import IconConsole from "../components/icons/IconConsole.vue";
import IconBuilder from "../components/icons/IconBuilder.vue";
import IconSimulation from "../components/icons/IconSimulation.vue";
import IconInfo from "../components/icons/IconInfo.vue";

const routes = router.getRoutes()

const getComponent = (path: String): Component => {
  switch (path) {
    case '/':
      return IconConsole;
    case '/builder':
      return IconBuilder;
    case '/info':
      return IconInfo;
    default:
      return IconSimulation;
  }
}

</script>

<template>
  <div class="flex items-center pr-4">
    <ul class="menu bg-base-200 rounded-box gap-2">
      <li v-for="route in routes" :key="route.path">
        <RouterLink :to="route.path" :data-tip="capitalize(route.name as string)" class="tooltip tooltip-right" activeClass="menu-active">
          <component class="h-6 w-6" :is="getComponent(route.path)" v-bind="{fill:'white' }" />
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>

.tooltip {
  position: relative;
}
</style>
