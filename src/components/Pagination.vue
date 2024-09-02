<script setup lang="ts">
  import { TPagination } from "@/type";
  import { Button } from "@/components/ui/button";
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
  } from "@/components/ui/select";
  import { ref, watch } from "vue";
  import { ChevronLeft, ChevronRight } from "lucide-vue-next";

  const props = defineProps<Omit<TPagination, "totalCount">>();
  const emit = defineEmits<{
    (event: "next-page"): void;
    (event: "prev-page"): void;
    (event: "update:per_page", value: number): void;
  }>();

  const selectedPerPage = ref(props.per_page.toString());

  const handleNext = () => {
    emit("next-page");
  };

  const handlePrev = () => {
    emit("prev-page");
  };

  watch(selectedPerPage, (newValue: string) => {
    emit("update:per_page", parseInt(newValue, 10));
  });
</script>

<template>
  <div class="flex gap-4 items-center justify-end mt-4">
    <div class="flex gap-2 items-center">
      Rows per page:
      <Select v-model="selectedPerPage">
        <SelectTrigger class="w-[70px]">{{ selectedPerPage }}</SelectTrigger>
        <SelectContent class="min-w-[70px]">
          <SelectGroup>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    <p class="mx-2">{{ props.current_page }} of {{ props.last_page }}</p>
    <div class="flex items-center gap-1">
      <Button
        @click="handlePrev"
        :disabled="!props.prev"
        class="py-1 px-2 rounded-full"
        variant="ghost"
      >
        <ChevronLeft :size="20" />
      </Button>
      <Button
        @click="handleNext"
        :disabled="!props.next"
        class="py-1 px-2 rounded-full"
        variant="ghost"
      >
        <ChevronRight :size="20" />
      </Button>
    </div>
  </div>
</template>
