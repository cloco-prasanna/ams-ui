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
  import { TArtist } from "@/type";
  import { Button } from "../ui/button";
  const props = defineProps<{
    artists?: TArtist[];
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
        <TableRow
          v-if="props.artists"
          v-for="artist in props.artists"
          :key="artist.id"
        >
          <TableCell>{{ artist.id }}</TableCell>
          <TableCell>{{ artist.name }}</TableCell>
          <TableCell>{{ artist.first_release_year }}</TableCell>
          <TableCell>{{ artist.no_of_albums_released }}</TableCell>
          <TableCell>{{ artist.gender }}</TableCell>
          <TableCell>{{ artist.address }}</TableCell>
          <TableCell>{{
            artist.dob ? artist.dob.toLocaleDateString() : "N/A"
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
        <TableRow v-else class="w-full">
          <TableCell class="font-medium w-full text-center" colspan="9"
            >No artist data</TableCell
          >
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
