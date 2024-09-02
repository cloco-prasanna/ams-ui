<script setup lang="ts">
  import { useRouter } from "vue-router";
  import { cn } from "@/lib/utils";
  import Button from "./ui/button/Button.vue";

  interface Item {
    title: string;
    href: string;
  }

  const $route = useRouter();

  const sidebarNavItems: Item[] = [
    {
      title: "Users",
      href: "/dashboard/users",
    },
    {
      title: "Artists",
      href: "/dashboard/artists",
    },
  ];
</script>

<template>
  <nav class="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
    <RouterLink to="/dashboard">
      <Button
        variant="ghost"
        :class="
          cn(
            'w-full text-left justify-start',
            $route.currentRoute.value.path == `/dashboard` &&
              'bg-muted hover:bg-muted'
          )
        "
      >
        Dashboard
      </Button>
    </RouterLink>
    <RouterLink
      v-for="item in sidebarNavItems"
      :key="item.title"
      :to="item.href"
    >
      <Button
        variant="ghost"
        :class="
          cn(
            'w-full text-left justify-start',
            $route.currentRoute.value.path.includes(`${item.href}`) &&
              'bg-muted hover:bg-muted'
          )
        "
      >
        {{ item.title }}
      </Button>
    </RouterLink>
  </nav>
</template>
