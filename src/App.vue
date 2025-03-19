<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Toast from './components/Toast.vue'
import ModalService from './components/ModalService.vue'

</script>

<template>
  <div class="app h-full w-full p-4">
    <ModalService class="absolute" />
    <Toast class="absolute" />
    <Header class="header" />
    <main class="content content-center items-center grid">
      <router-view v-slot="{ Component }" class="grow">
        <transition name="fade" mode="out-in" :duration="{ enter: 300, leave: 100 }">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer class="footer" />
  </div>
</template>

<style lang="scss">
body {
  height: 100vh;

  #app {
    height: 100%;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.app {
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: 1fr min-content;
  grid-auto-flow: row;
  grid-template-areas:
    "menu content"
    "footer footer";
}

.footer { grid-area: footer; }

.menu { grid-area: menu; }

.content { grid-area: content; }



</style>
