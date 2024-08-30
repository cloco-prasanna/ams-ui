<script setup lang="ts">
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
  import Pagination from "@/components/Pagination.vue";
  import { TArtistResponse } from "@/type";
  import ArtistForm from "@/components/forms/ArtistForm.vue";
  import ArtistTable from "@/components/artists/ArtistTable.vue";
  import { ref } from "vue";
  import { Plus } from "lucide-vue-next";

  const page = ref(1);

  const per_page = ref(5);

  const handleUpdatePerPage = (value: number) => {
    per_page.value = value;
    page.value = 1;
  };

  const { data } = useQuery({
    queryKey: ["getArtists", page, per_page],
    queryFn: async () => {
      const response = await apiCall(
        "get",
        `/artists?page=${page.value}&per_page=${per_page.value}`
      );
      return response.data as TArtistResponse;
    },
  });
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <div class="flex justify-end mb-4">
        <Button class="flex gap-2">
          <Plus :size="20" />
          Create Artist</Button
        >
      </div>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[700px]">
      <DialogHeader>
        <DialogTitle>Artist Form</DialogTitle>
      </DialogHeader>
      <div class="w-full">
        <ArtistForm />
      </div>
    </DialogContent>
  </Dialog>
  <artistTable :artists="data?.artists || []" />
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
