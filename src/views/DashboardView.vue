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

<template>
  <Header />

  <div class="p-10">
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
