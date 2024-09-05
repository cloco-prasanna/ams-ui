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
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
  import { PenBoxIcon, Trash2Icon } from "lucide-vue-next";
  import { TMusic } from "@/type";
  import { Button } from "../ui/button";
  import { apiCall, errorHandler } from "@/lib/utils";
  import { useQueryClient, useMutation } from "@tanstack/vue-query";
  import MusicForm from "../forms/MusicForm.vue";
  import { Card } from "@/components/ui/card";
  import GenreLabel from "./GenreLabel.vue";

  import SkeletonRow from "../SkeletonRow.vue";
  const props = defineProps<{
    musics?: TMusic[];
    artist_id: number;
    isLoading?: boolean;
  }>();

  const queryClient = useQueryClient();
  const deleteMusicMn = useMutation({
    mutationFn: (id: number) =>
      apiCall("delete", `/artists/${props.artist_id}/musics/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getMusics"] });
    },
    onError: (error: any) => {
      console.log(error);
      errorHandler(error);
    },
  });

  const deleteMusic = (id: number) => {
    deleteMusicMn.mutate(id);
  };
</script>

<template>
  <Card class="p-2 rounded-lg">
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
        <SkeletonRow v-if="props.isLoading" :columns="5" />

        <TableRow
          v-if="!props.isLoading && props.musics?.length"
          v-for="music in props.musics"
          :key="music.id"
        >
          <TableCell>{{ music.id }}</TableCell>
          <TableCell>{{ music.title }}</TableCell>
          <TableCell>{{ music.album_name ?? "--" }}</TableCell>
          <TableCell>
            <GenreLabel v-if="music.genre" :genre="music.genre" />
            <span v-else>--</span>
          </TableCell>

          <TableCell class="text-right flex gap-2 justify-end">
            <Dialog>
              <DialogTrigger as-child>
                <Button variant="outline" class="py-1 px-2">
                  <PenBoxIcon class="h-4 w-4"
                /></Button>
              </DialogTrigger>
              <DialogContent class="sm:max-w-[700px]">
                <DialogHeader>
                  <DialogTitle>Update Music Form</DialogTitle>
                </DialogHeader>
                <div class="w-full">
                  <MusicForm :music="music" :artist_id="artist_id" />
                </div>
              </DialogContent>
            </Dialog>

            <AlertDialog>
              <AlertDialogTrigger as-child>
                <Button variant="outline" class="py-1 px-2">
                  <Trash2Icon class="h-4 w-4"
                /></Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this music from our server.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction @click="deleteMusic(music.id)"
                    >Delete</AlertDialogAction
                  >
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </TableCell>
        </TableRow>
        <TableRow v-else class="w-full">
          <TableCell class="font-medium w-full text-center" colspan="9"
            >No music found</TableCell
          >
        </TableRow>
      </TableBody>
    </Table>
  </Card>
</template>
