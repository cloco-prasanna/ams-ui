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
  import { TUser } from "@/type";
  import { Button } from "../ui/button";
  const props = defineProps<{
    users?: TUser[];
  }>();
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
          <TableCell>{{
            user.dob ? user.dob.toLocaleDateString() : "N/A"
          }}</TableCell>
          <TableCell class="text-right flex gap-2 justify-end">
            <Button variant="outline" class="py-1 px-2">
              <PenBoxIcon class="h-4 w-4"
            /></Button>
            <Button variant="outline" class="py-1 px-2">
              <Trash2Icon class="h-4 w-4"
            /></Button>
          </TableCell>
        </TableRow>
        <TableRow v-else>
          <div class="font-medium w-full text-center">No data</div>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
