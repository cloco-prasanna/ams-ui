<script setup lang="ts">
  import ChangePasswordForm from "@/components/forms/ChangePasswordForm.vue";
  import { useAuth } from "@/hooks/useAuth";
  import { apiCall } from "@/lib/utils";
  import { TUser } from "@/type";
  import { useQuery } from "@tanstack/vue-query";
  import UserForm from "@/components/forms/UserForm.vue";
  import { Card } from "@/components/ui/card";

  const { userId } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["getUser", userId],
    queryFn: async () => {
      const response = await apiCall("get", `/users/${userId}`);
      return response.data as TUser;
    },
  });
</script>

<template>
  <Card class="p-6 mb-4">
    <h1 class="text-lg font-bold mb-4">Update Profile</h1>
    <UserForm v-if="!isLoading" :user="data" />
  </Card>
  <ChangePasswordForm />
</template>
