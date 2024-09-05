<script setup lang="ts">
  import { apiCall } from "@/lib/utils";
  import { TUser } from "@/type";
  import { useQuery } from "@tanstack/vue-query";
  import ThemeSelect from "./ThemeSelect.vue";
  import { useAuth } from "@/hooks/useAuth";

  const { userId } = useAuth();
  const { data } = useQuery({
    queryKey: ["getUser", userId],
    queryFn: async () => {
      const response = await apiCall("get", `/users/${userId}`);
      return response.data as TUser;
    },
  });
</script>

<template>
  <nav class="px-4 sm:px-10 pt-10 max-w-[1400px] mx-auto">
    <div class="flex items-center justify-between text-center">
      <RouterLink to="/">
        <img
          src="/logo.png"
          alt="logo"
          class="object-fill rounded-full"
          width="60"
          height="60"
          clas
      /></RouterLink>
      <div class="flex items-center">
        <div class="font-bold flex flex-col items-start text-sm">
          <span>{{ data?.first_name }} {{ data?.last_name }}</span>
          <span class="text-xs text-slate-500">{{ data?.email }}</span>
        </div>
        <ThemeSelect />
      </div>
    </div>
  </nav>
</template>
