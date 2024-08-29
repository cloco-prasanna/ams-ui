<script setup lang="ts">
  import Header from "@/components/Header.vue";
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
  <Header />
  <div class="p-10">
    <UserTable :users="users" />
  </div>
</template>
