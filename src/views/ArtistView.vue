<script setup lang="ts">
  import { apiCall, exportCSV } from "@/lib/utils";
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
  import { FileDown, FileUp, Plus } from "lucide-vue-next";
  import { toast } from "vue-sonner";

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

  const handleCSVExport = () => {
    if (data.value?.artists) exportCSV(data.value?.artists, "artists");
  };

  const handleCSVImport = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await apiCall("post", `/artists/import`, formData);
      if (response.status === 200) {
        toast.success("Artists imported!");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
</script>

<template>
  <div class="flex justify-between gap-4 flex-wrap mb-4">
    <Dialog>
      <DialogTrigger as-child>
        <div class="">
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
    <div class="flex gap-2">
      <Button class="flex gap-2" @click="handleCSVExport" variant="secondary">
        <FileDown :size="20" /> Export
      </Button>

      <Button class="flex gap-2 cursor-pointer" variant="secondary" asChild>
        <Label for="upload-button"> <FileUp :size="20" /> Import </Label>
      </Button>
      <Input
        id="upload-button"
        type="file"
        class="hidden"
        accept=".csv"
        @change="handleCSVImport"
      />
    </div>
  </div>
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
