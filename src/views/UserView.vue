<script setup lang="ts">
  import UserTable from "@/components/users/UserTable.vue";
  import { apiCall } from "@/lib/utils";
  import { useQuery } from "@tanstack/vue-query";
  import { Button } from "@/components/ui/button";
  import {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogContent,
  } from "@/components/ui/dialog";
  import UserForm from "@/components/forms/UserForm.vue";

  const { data: users } = useQuery({
    queryKey: ["getUsers"],
    queryFn: async () => {
      const response = await apiCall("get", "/users");
      return response.data.users;
    },
  });
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button>Add User</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[700px]">
      <DialogHeader>
        <DialogTitle>User Form</DialogTitle>
      </DialogHeader>
      <div class="w-full">
        <UserForm />
      </div>
    </DialogContent>
  </Dialog>
  <UserTable :users="users" />
</template>
