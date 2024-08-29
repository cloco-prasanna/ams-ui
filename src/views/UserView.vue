<script setup lang="ts">
  import UserTable from "@/components/users/UserTable.vue";
  import axios from "axios";
  import { API_URL } from "@/lib/utils";
  import { useQuery } from "@tanstack/vue-query";

  const { data: users } = useQuery({
    queryKey: ["getUsers"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/users`);
      return response.data.users;
    },
  });
</script>

<template>
  <UserTable :users="users" />
</template>
