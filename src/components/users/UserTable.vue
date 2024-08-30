<script setup lang="ts">
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { PenBoxIcon, Trash2Icon } from "lucide-vue-next";
  import { Button } from "../ui/button";
  import { useMutation, useQueryClient } from "@tanstack/vue-query";
  import { apiCall } from "@/lib/utils";
  import {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogContent,
  } from "@/components/ui/dialog";
  import UserForm from "../forms/UserForm.vue";
  import { TUser } from "@/type";

  const props = defineProps<{
    users?: TUser[];
  }>();
  const queryClient = useQueryClient();
  const deleteUserMn = useMutation({
    mutationFn: (id: number) => apiCall("delete", `/users/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUsers"] });
    },
  });

  const deleteUser = (id: number) => {
    deleteUserMn.mutate(id);
  };
</script>

<template>
  <div class="p-2 border border-slate-200 rounded-lg">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]"> Id </TableHead>
          <TableHead>Firstname</TableHead>
          <TableHead>Lastname</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Dob</TableHead>
          <TableHead class="text-right"> Actions </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-if="props.users" v-for="user in props.users" :key="user.id">
          <TableCell>{{ user.id }}</TableCell>
          <TableCell>{{ user.first_name }}</TableCell>
          <TableCell>{{ user.last_name }}</TableCell>
          <TableCell>{{ user.email }}</TableCell>
          <TableCell>{{ user.gender }}</TableCell>
          <TableCell>{{ user.address }}</TableCell>
          <TableCell>{{ user.phone }}</TableCell>
          <TableCell>{{ user.dob ?? "N/A" }}</TableCell>
          <TableCell class="text-right flex gap-2 justify-end">
            <Dialog>
              <DialogTrigger as-child>
                <Button variant="outline" class="py-1 px-2">
                  <PenBoxIcon class="h-4 w-4"
                /></Button>
              </DialogTrigger>
              <DialogContent class="sm:max-w-[700px]">
                <DialogHeader>
                  <DialogTitle>User Form</DialogTitle>
                </DialogHeader>
                <div class="w-full">
                  <UserForm :user="user" />
                </div>
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              class="py-1 px-2"
              @click="deleteUser(user.id)"
            >
              <Trash2Icon class="h-4 w-4"
            /></Button>
          </TableCell>
        </TableRow>
        <TableRow v-else class="w-full">
          <TableCell class="font-medium w-full text-center" colspan="9"
            >No users data</TableCell
          >
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
