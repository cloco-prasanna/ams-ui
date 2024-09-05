<script setup lang="ts">
  import { Skeleton } from "@/components/ui/skeleton";
  import { TableCell, TableRow } from "@/components/ui/table";
  const { rows = 5, columns } = defineProps<{
    columns: number;
    rows?: number;
  }>();
</script>

<template>
  <TableRow v-for="rowIndex in rows" :key="rowIndex">
    <TableCell v-for="colIndex in columns" :key="`${rowIndex}-${colIndex}`">
      <Skeleton class="h-4 rounded-lg" />
    </TableCell>
  </TableRow>
</template>
