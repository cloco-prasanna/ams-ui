<script setup lang="ts">
  import UserTable from "@/components/users/UserTable.vue";
  import { apiCall } from "@/lib/utils";
  import { useQuery } from "@tanstack/vue-query";

  const { data: users } = useQuery({
    queryKey: ["getUsers"],
    queryFn: async () => {
      const response = await apiCall("get", "/users");
      return response.data.users;
    },
  });
</script>

<template>
  <UserTable :users="users" />
</template>
