<script setup lang="ts">
  import { apiCall } from "@/lib/utils";
  import { TMusicResponse } from "@/type";
  import { useQuery } from "@tanstack/vue-query";
  import { ref } from "vue";
  import { useRoute } from "vue-router";
  import {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogContent,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import MusicForm from "@/components/forms/MusicForm.vue";
  import MusicTable from "@/components/artists/MusicTable.vue";
  import Pagination from "@/components/Pagination.vue";

  const route = useRoute();
  const artist_id = Number(route.params.id);

  const page = ref(1);

  const per_page = ref(5);

  const handleUpdatePerPage = (value: number) => {
    per_page.value = value;
    page.value = 1;
  };

  const { data } = useQuery({
    queryKey: ["getMusics", page, per_page],
    queryFn: async () => {
      const response = await apiCall(
        "get",
        `/artists/${artist_id}/musics?page=${page.value}&per_page=${per_page.value}`
      );
      return response.data as TMusicResponse;
    },
  });
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <div class="flex justify-end mb-4">
        <Button class="flex gap-2">
          <Plus :size="20" />
          Create Music</Button
        >
      </div>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[700px]">
      <DialogHeader>
        <DialogTitle>Music Form</DialogTitle>
      </DialogHeader>
      <div class="w-full">
        <MusicForm :artist_id="artist_id" />
      </div>
    </DialogContent>
  </Dialog>
  <MusicTable :musics="data?.musics || []" :artist_id="artist_id" />
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
