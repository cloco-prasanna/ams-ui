<script setup lang="ts">
  import { Toaster } from "./components/ui/sonner";
  import { onMounted } from "vue";

  onMounted(() => {
    document.title = "Cloco Nepal | AMS";
  });
</script>

<template>
  <main class="">
    <RouterView />
  </main>
  <Toaster richColors />
</template>

<style scoped>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
</style>
