<script setup lang="ts">
  import Header from "@/components/Header.vue";
  import Sidenav from "@/components/Sidenav.vue";
  import { useAuth } from "@/hooks/useAuth";

  const { role } = useAuth();
</script>

<template>
  <Header />

  <div class="p-10 max-w-[1400px] mx-auto">
    <h1 class="mb-4">Welcome, {{ role }}</h1>
    <div class="flex xl:flex-row flex-col gap-10">
      <div class="xl:min-w-[200px] border rounded-lg">
        <Sidenav />
      </div>
      <div class="xl:flex-1 w-full">
        <RouterView />
      </div>
    </div>
  </div>
</template>
