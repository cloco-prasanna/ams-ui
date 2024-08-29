<script setup lang="ts">
  import { apiCall } from "@/lib/utils";
  import { useQuery } from "@tanstack/vue-query";
  import ArtistTable from "@/components/artists/ArtistTable.vue";

  const { data: artists } = useQuery({
    queryKey: ["getArtists"],
    queryFn: async () => {
      const response = await apiCall("get", "/artists");
      return response.data.artists;
    },
  });
</script>

<template>
  <ArtistTable :artists="artists" />
</template>
