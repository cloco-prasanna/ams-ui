<script setup lang="ts">
  import { apiCall } from "@/lib/utils";
  import { TMusicResponse } from "@/type";
  import { useQuery } from "@tanstack/vue-query";
  import { ref, watch } from "vue";
  import { useRoute, useRouter } from "vue-router";
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
  import { ArrowLeft, Plus } from "lucide-vue-next";
  import { Input } from "@/components/ui/input";
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { Genre } from "@/type";

  const route = useRoute();
  const artist_id = Number(route.params.id);

  const page = ref(1);

  const per_page = ref(5);

  const search = ref("");

  const genre = ref("");

  const handleUpdatePerPage = (value: number) => {
    per_page.value = value;
  };

  watch([search, genre, per_page], () => {
    page.value = 1;
  });

  const { data } = useQuery({
    queryKey: ["getMusics", page, per_page, artist_id, search, genre],
    queryFn: async () => {
      const response = await apiCall(
        "get",
        `/artists/${artist_id}dsf/musics?search=${search.value}&genre=${genre.value}&page=${page.value}&per_page=${per_page.value}`
      );
      return response.data as TMusicResponse;
    },
  });

  const router = useRouter();
  const handleReturn = () => {
    router.back();
  };
</script>

<template>
  <div class="flex items-center gap-2 mb-4">
    <Button @click="handleReturn" variant="link" class="px-0 py-0">
      <ArrowLeft />
    </Button>
    Back to Artists
  </div>
  <div class="flex justify-between mb-4 flex-wrap gap-4">
    <Dialog>
      <DialogTrigger as-child>
        <div>
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
    <div class="flex gap-2 flex-wrap">
      <div class="">
        <Input type="text" placeholder="Search" v-model="search" />
      </div>
      <Select v-model="genre">
        <SelectTrigger class="w-[180px]">
          <SelectValue placeholder="Filter Genre" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Genre</SelectLabel>
            <SelectItem value=" ">All Genres</SelectItem>
            <SelectItem v-for="(val, key) in Genre" :key="key" :value="val">
              {{ key }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  </div>
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
