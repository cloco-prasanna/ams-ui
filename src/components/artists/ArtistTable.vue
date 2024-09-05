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
  import { TArtist } from "@/type";
  import { Button } from "../ui/button";
  import { apiCall } from "@/lib/utils";
  import { useQueryClient, useMutation } from "@tanstack/vue-query";
  import ArtistForm from "../forms/ArtistForm.vue";
  const props = defineProps<{
    artists?: TArtist[];
  }>();

  const queryClient = useQueryClient();
  const deleteArtistMn = useMutation({
    mutationFn: (id: number) => apiCall("delete", `/artists/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getArtists"] });
    },
  });

  const deleteArtist = (id: number) => {
    deleteArtistMn.mutate(id);
  };
</script>

<template>
  <div class="p-2 border border-slate-200 rounded-lg">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]"> Id </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>First Release Year</TableHead>
          <TableHead>No of Albums</TableHead>
          <TableHead>Dob</TableHead>
          <TableHead class="text-right"> Actions </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-if="props.artists?.length"
          v-for="artist in props.artists"
          :key="artist.id"
        >
          <TableCell>{{ artist.id }}</TableCell>
          <TableCell
            ><Button asChild variant="link" class="p-0"
              ><RouterLink :to="`artists/${artist.id}`">{{
                artist.name
              }}</RouterLink></Button
            ></TableCell
          >
          <TableCell>{{ artist.gender ?? "--" }}</TableCell>
          <TableCell>{{ artist.address ?? "--" }}</TableCell>
          <TableCell>{{ artist.first_release_year ?? "--" }}</TableCell>
          <TableCell>{{ artist.no_of_albums_released ?? "--" }}</TableCell>
          <TableCell>{{
            artist.dob ? new Date(artist.dob).toLocaleDateString() : "--"
          }}</TableCell>
          <TableCell class="text-right flex gap-2 justify-end">
            <Dialog>
              <DialogTrigger as-child>
                <Button variant="outline" class="py-1 px-2">
                  <PenBoxIcon class="h-4 w-4"
                /></Button>
              </DialogTrigger>
              <DialogContent class="sm:max-w-[700px]">
                <DialogHeader>
                  <DialogTitle>Update Artist Form</DialogTitle>
                </DialogHeader>
                <div class="w-full">
                  <ArtistForm :artist="artist" />
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
                    this artist and all his albums from our server.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction @click="deleteArtist(artist.id)"
                    >Delete</AlertDialogAction
                  >
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </TableCell>
        </TableRow>
        <TableRow v-else class="w-full">
          <TableCell class="font-medium w-full text-center" colspan="9"
            >No artist found</TableCell
          >
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
