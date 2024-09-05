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
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { Input } from "@/components/ui/input";
  import Pagination from "@/components/Pagination.vue";
  import UserForm from "@/components/forms/UserForm.vue";
  import { TUserResponse } from "@/type";
  import { ref, watch } from "vue";
  import { Plus } from "lucide-vue-next";

  const page = ref(1);

  const per_page = ref(5);

  const search = ref("");
  const order_by = ref("");
  const sort_order = ref("");

  const handleUpdatePerPage = (value: number) => {
    per_page.value = value;
  };

  watch([search, order_by, sort_order, per_page], () => {
    page.value = 1;
  });

  const { data } = useQuery({
    queryKey: ["getUsers", page, per_page, search, sort_order, order_by],
    queryFn: async () => {
      const response = await apiCall(
        "get",
        `/users?search=${search.value}&order_by=${order_by.value}&sort_order=${sort_order.value}&page=${page.value}&per_page=${per_page.value}`
      );
      return response.data as TUserResponse;
    },
  });
</script>

<template>
  <div class="flex justify-between flex-wrap gap-4 mb-4">
    <Dialog>
      <DialogTrigger as-child>
        <div>
          <Button class="flex gap-2">
            <Plus :size="20" />
            Create User</Button
          >
        </div>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Create User Form</DialogTitle>
        </DialogHeader>
        <div class="w-full">
          <UserForm />
        </div>
      </DialogContent>
    </Dialog>
    <div class="flex gap-2 flex-wrap">
      <div class="">
        <Input type="text" placeholder="Search" v-model="search" />
      </div>
      <Select v-model="order_by">
        <SelectTrigger class="w-[180px]">
          <SelectValue placeholder="Order by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Order by</SelectLabel>
            <SelectItem value="first_name">Firstname</SelectItem>
            <SelectItem value="last_name">Lastname </SelectItem>
            <SelectItem value="email">Email </SelectItem>
            <SelectItem value="created_at">Created At </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select v-model="sort_order">
        <SelectTrigger class="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort by</SelectLabel>
            <SelectItem value="asc"> Asc </SelectItem>
            <SelectItem value="desc"> Desc </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
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
