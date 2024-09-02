<script setup lang="ts">
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { TUser } from "@/type";

  const props = defineProps<{
    users?: TUser[];
  }>();
</script>

<template>
  <div class="">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]"> Id </TableHead>
          <TableHead>Firstname</TableHead>
          <TableHead>Lastname</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-if="props.users" v-for="user in props.users" :key="user.id">
          <TableCell>{{ user.id }}</TableCell>
          <TableCell>{{ user.first_name ?? "--" }}</TableCell>
          <TableCell>{{ user.last_name ?? "--" }}</TableCell>
          <TableCell>{{ user.email }}</TableCell>
          <TableCell>{{
            user.created_at
              ? new Date(user.created_at).toLocaleDateString()
              : "--"
          }}</TableCell>
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
