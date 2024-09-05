<script setup lang="ts">
  import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { EyeIcon, EyeOffIcon } from "lucide-vue-next";
  import { ref } from "vue";

  const inputType = ref("password");

  const { name, placeholder, label } = defineProps<{
    name: string;
    placeholder?: string;
    label: string;
  }>();

  const toggleType = () => {
    inputType.value = inputType.value === "password" ? "text" : "password";
  };
</script>

<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem>
      <FormLabel>{{ label }}</FormLabel>
      <FormControl>
        <div class="relative">
          <Input
            :type="inputType"
            :placeholder="placeholder ?? 'Enter password'"
            v-bind="componentField"
            class="pr-10"
          />

          <Button
            class="absolute top-0 right-0 px-2 py-1"
            variant="ghost"
            type="button"
            @click="toggleType"
          >
            <EyeIcon v-if="inputType === 'password'" :size="20" />
            <EyeOffIcon v-else :size="20" />
          </Button>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
