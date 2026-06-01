<!-- src/App.vue -->
<template>
  <Layout>
    <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </Layout>
</template>

<script setup>
import Layout from "./components/Layout.vue";
import { useSiteHead } from "./js/seo";

useSiteHead();
</script>

<style>
.route-enter-active,
.route-leave-active {
  transition: opacity var(--dur) var(--ease-out-quart);
}
.route-enter-from,
.route-leave-to {
  opacity: 0;
}
@media (prefers-reduced-motion: reduce) {
  .route-enter-active,
  .route-leave-active {
    transition: none;
  }
}
</style>
