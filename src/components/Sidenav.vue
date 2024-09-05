<script setup lang="ts">
  import { useRouter } from "vue-router";
  import { cn } from "@/lib/utils";
  import Button from "./ui/button/Button.vue";
  import {
    LayoutDashboardIcon,
    LogOut,
    LucideIcon,
    Mic2Icon,
    SettingsIcon,
    UsersRound,
  } from "lucide-vue-next";

  const $route = useRouter();

  type Item = {
    title: string;
    href: string;
    icon: LucideIcon;
  };

  const sidebarNavItems: Item[] = [
    {
      title: "Users",
      href: "/dashboard/users",
      icon: UsersRound,
    },
    {
      title: "Artists",
      href: "/dashboard/artists",
      icon: Mic2Icon,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: SettingsIcon,
    },
  ];

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };
</script>

<template>
  <div
    class="flex lg:flex-col justify-between h-full lg:min-h-[60vh] overflow-x-scroll sm:overflow-auto"
  >
    <nav class="flex lg:flex-col">
      <RouterLink to="/dashboard">
        <Button
          variant="ghost"
          :class="
            cn(
              'w-full text-left justify-start flex items-center gap-2',
              $route.currentRoute.value.path == `/dashboard` &&
                'bg-muted hover:bg-muted'
            )
          "
        >
          <LayoutDashboardIcon :size="20" /> Dashboard
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
              'w-full text-left justify-start  flex items-center gap-2',
              $route.currentRoute.value.path.includes(`${item.href}`) &&
                'bg-muted hover:bg-muted'
            )
          "
        >
          <component :is="item.icon" class="w-5 h-5" />

          {{ item.title }}
        </Button>
      </RouterLink>
    </nav>
    <div class="flex-1"></div>
    <Button
      class="items-start gap-4 flex"
      variant="outline"
      @click="handleLogout"
    >
      <LogOut :size="20" /> <span class="lg:block hidden">Logout</span>
    </Button>
  </div>
</template>
