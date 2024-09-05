<script setup lang="ts">
  import { Badge } from "@/components/ui/badge";
  import { Genre } from "@/type";
  const { genre } = defineProps<{
    genre: string;
  }>();

  let badgeColor = "";

  switch (genre) {
    case Genre.Classic:
      badgeColor = "bg-[#3d3b5e]";
      break;
    case Genre.RnB:
      badgeColor = "bg-teal-600";
      break;
    case Genre.Country:
      badgeColor = "bg-[#d9cb32]";
      break;
    case Genre.Rock:
      badgeColor = "bg-orange-700";
      break;
    case Genre.Jazz:
      badgeColor = "bg-orange-900";
      break;
    default:
      badgeColor = "bg-slate-600";
  }
</script>

<template>
  <Badge :class="`text-white ${badgeColor} capitalize text-sm`">{{
    genre
  }}</Badge>
</template>
