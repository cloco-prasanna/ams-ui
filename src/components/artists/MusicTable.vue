<script setup lang="ts">
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogContent,
  } from "@/components/ui/dialog";
  import { PenBoxIcon, Trash2Icon } from "lucide-vue-next";
  import { TMusic } from "@/type";
  import { Button } from "../ui/button";
  import { apiCall } from "@/lib/utils";
  import { useQueryClient, useMutation } from "@tanstack/vue-query";
  import MusicForm from "../forms/MusicForm.vue";
  const props = defineProps<{
    musics?: TMusic[];
    artist_id: number;
  }>();

  const queryClient = useQueryClient();
  const deleteMusicMn = useMutation({
    mutationFn: (id: number) =>
      apiCall("delete", `/artists/${props.artist_id}/musics/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getMusics"] });
    },
  });

  const deleteMusic = (id: number) => {
    deleteMusicMn.mutate(id);
  };
</script>

<template>
  <div class="p-2 border border-slate-200 rounded-lg">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]"> Id </TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Album Name</TableHead>
          <TableHead>Genre</TableHead>
          <TableHead class="text-right"> Actions </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-if="props.musics?.length"
          v-for="music in props.musics"
          :key="music.id"
        >
          <TableCell>{{ music.id }}</TableCell>
          <TableCell>{{ music.title }}</TableCell>
          <TableCell>{{ music.album_name ?? "--" }}</TableCell>
          <TableCell>{{ music.genre ?? "--" }}</TableCell>

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
                  <MusicForm :music="music" :artist_id="artist_id" />
                </div>
              </DialogContent>
            </Dialog>
            <Button
              variant="outline"
              class="py-1 px-2"
              @click="deleteMusic(music.id)"
            >
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
