<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import Header from "@/components/Header.vue";
  import UserTable from "@/components/users/UserTable.vue";
  import axios from "axios";
  import { TUser } from "@/type";
  import { API_URL } from "@/lib/utils";

  const users = ref<TUser[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      users.value = response.data.users;
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  onMounted(() => {
    fetchUsers();
  });
</script>

<template>
  <Header />
  <div class="p-10">
    <UserTable :users="users" />
  </div>
</template>
