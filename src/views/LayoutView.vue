<script setup lang="ts">
  import Header from "@/components/Header.vue";
  import Sidenav from "@/components/Sidenav.vue";
  import { useAuth } from "@/hooks/useAuth";
  import { apiCall } from "@/lib/utils";
  import { TUser } from "@/type";
  import { useQuery } from "@tanstack/vue-query";

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
  <Header />

  <div class="sm:p-10 p-4 max-w-[1400px] mx-auto">
    <h1 class="mb-4 text-lg">
      Welcome, <span class="font-medium">{{ data?.first_name }} san 😄 </span>
    </h1>
    <div class="flex lg:flex-row flex-col gap-10">
      <div class="lg:min-w-[200px] border rounded-lg lg:max-h-[70vh]">
        <Sidenav />
      </div>
      <div class="xl:flex-1 w-full">
        <RouterView />
      </div>
    </div>
  </div>
</template>
