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
  import { Input } from "@/components/ui/input";
  import Pagination from "@/components/Pagination.vue";
  import UserForm from "@/components/forms/UserForm.vue";
  import { TUserResponse } from "@/type";
  import { ref } from "vue";
  import { Plus } from "lucide-vue-next";

  const page = ref(1);

  const per_page = ref(5);

  const search = ref("");

  const handleUpdatePerPage = (value: number) => {
    per_page.value = value;
    page.value = 1;
  };

  const { data } = useQuery({
    queryKey: ["getUsers", page, per_page, search],
    queryFn: async () => {
      const response = await apiCall(
        "get",
        `/users?search=${search.value}&page=${page.value}&per_page=${per_page.value}`
      );
      return response.data as TUserResponse;
    },
  });
</script>

<template>
  <div class="flex justify-between">
    <Dialog>
      <DialogTrigger as-child>
        <div class="mb-4">
          <Button class="flex gap-2">
            <Plus :size="20" />
            Create User</Button
          >
        </div>
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
    <div class="">
      <Input type="text" placeholder="Search" v-model="search" />
    </div>
  </div>
  <UserTable :users="data?.users || []" />
  <Pagination
    v-if="data"
    :current_page="page"
    :last_page="data.last_page"
    :prev="data.prev"
    :next="data.next"
    :per_page="per_page"
    @next-page="page++"
    @prev-page="page--"
    @update:per_page="handleUpdatePerPage"
  />
</template>
