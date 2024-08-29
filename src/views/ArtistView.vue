<script setup lang="ts">
  import axios from "axios";
  import { API_URL } from "@/lib/utils";
  import { useQuery } from "@tanstack/vue-query";
  import ArtistTable from "@/components/artists/ArtistTable.vue";

  const { data: artists } = useQuery({
    queryKey: ["getArtists"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/artists`);
      return response.data.artists;
    },
  });
</script>

<template>
  <ArtistTable :artists="artists" />
</template>
