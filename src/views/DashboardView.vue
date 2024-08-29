<script lang="ts">
  import Header from "@/components/Header.vue";
  import Sidenav from "@/components/Sidenav.vue";

  export default {
    components: {
      Sidenav,
      Header,
    },
  };
</script>

<script setup lang="ts">
  const loggedInUser = localStorage.getItem("email");
</script>

<template>
  <Header />

  <div class="p-10">
    <h1 class="mb-4">Welcome, {{ loggedInUser }}</h1>
    <div class="flex gap-4 items-start">
      <div class="min-w-[200px] border">
        <Sidenav />
      </div>
      <div class="flex-1">
        <RouterView />
      </div>
    </div>
  </div>
</template>
