<script setup lang="ts">
  import { apiCall } from "@/lib/utils";
  import { TArtistResponse, TMusicGenresResponse, TUserResponse } from "@/type";
  import { useQuery } from "@tanstack/vue-query";
  import { MicVocalIcon, UsersRoundIcon } from "lucide-vue-next";
  import SimpleUserTable from "@/components/users/SimpleUserTable.vue";
  import { Button } from "@/components/ui/button";
  import { DonutChart } from "@/components/ui/chart-donut";
  import { computed } from "vue";
  import { Card } from "@/components/ui/card";

  const { data: users } = useQuery({
    queryKey: ["getUsers"],
    queryFn: async () => {
      const response = await apiCall("get", `/users?per_page=5`);
      return response.data as TUserResponse;
    },
  });

  const { data: artists } = useQuery({
    queryKey: ["getArtists"],
    queryFn: async () => {
      const response = await apiCall("get", `/artists?per_page=5`);
      return response.data as TArtistResponse;
    },
  });

  const { data: musicGenres } = useQuery({
    queryKey: ["getMusicGenres"],
    queryFn: async () => {
      const response = await apiCall("get", `/artists/1/musics/genres`);
      return response.data as TMusicGenresResponse;
    },
  });

  const donutData = computed(() => {
    return (
      musicGenres?.value?.genres.map((genre) => ({
        name: genre.name,
        count: genre.count,
      })) || []
    );
  });

  const colors = ["brown", "orange", "#d9cb32", "teal", "#3d3b5e"];
</script>

<template>
  <div class="grid grid-cols-2 gap-4 sm:gap-10">
    <RouterLink to="/dashboard/users">
      <Card
        class="px-8 py-6 rounded-lg items-center flex gap-4 justify-between hover:shadow-lg transition-all"
      >
        <div class="space-y-2">
          <p class="font-medium">Users</p>
          <p class="sm:text-4xl text-3xl font-bold">
            {{ users?.totalCount }}
          </p>
        </div>
        <UsersRoundIcon :size="40"
      /></Card>
    </RouterLink>
    <RouterLink to="/dashboard/artists">
      <Card
        class="px-8 py-6 rounded-lg items-center flex gap-4 justify-between hover:shadow-lg transition-all"
      >
        <div class="space-y-2">
          <p class="font-medium">Artists</p>
          <p class="sm:text-4xl text-3xl font-bold">
            {{ artists?.totalCount }}
          </p>
        </div>
        <MicVocalIcon :size="40" />
      </Card>
    </RouterLink>
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-10 mt-10">
    <Card class="rounded-lg w-full">
      <div
        class="flex justify-between p-4 py-2 bg-secondary items-center text-sm"
      >
        <p>Recent Users</p>
        <Button class="p-0" variant="link" asChild
          ><RouterLink to="/dashboard/users"> View All</RouterLink></Button
        >
      </div>
      <SimpleUserTable :users="users?.users" />
    </Card>
    <Card class="p-6 space-y-10">
      <h4 class="font-semibold text-center text-xl">Musics by Genre</h4>
      <div class="" v-if="donutData.length > 0">
        <DonutChart
          index="name"
          :category="'count'"
          :data="donutData"
          :colors="colors"
        />
      </div>
      <div class="mt-4 space-y-2">
        <ul class="space-y-1 flex gap-4 flex-wrap">
          <li
            v-for="(genre, index) in donutData"
            :key="genre.name"
            class="flex items-center space-x-2"
          >
            <span
              :style="{ backgroundColor: colors[index] }"
              class="w-3 h-3 rounded-full inline-block"
            ></span>
            <span>{{ genre.name }}: {{ genre.count }}</span>
          </li>
        </ul>
      </div>
    </Card>
  </div>
</template>
