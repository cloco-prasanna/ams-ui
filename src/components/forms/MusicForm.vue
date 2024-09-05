<script setup lang="ts">
  import { useForm } from "vee-validate";
  import * as z from "zod";
  import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Genre, TMusic } from "@/type";
  import { apiCall, errorHandler } from "@/lib/utils";
  import { useMutation, useQueryClient } from "@tanstack/vue-query";
  import { toast } from "vue-sonner";
  import { toTypedSchema } from "@vee-validate/zod";

  const { music, artist_id } = defineProps<{
    music?: TMusic;
    artist_id: number;
  }>();

  const formSchema = toTypedSchema(
    z.object({
      title: z
        .string({
          required_error: "Title is required.",
        })
        .min(1, "Title is required"),
      album_name: z
        .string({
          required_error: "Album Name is required.",
        })
        .min(1, "Album Name is required"),
      genre: z.string().optional(),
    })
  );

  const queryClient = useQueryClient();

  const updateMusicMn = useMutation({
    mutationFn: ({ input, id }: { input: any; id: number }) =>
      apiCall("patch", `/artists/${artist_id}/musics/${id}`, { music: input }),
    onSuccess: (res) => {
      console.log(res);
      toast.success("music Updated");
      queryClient.invalidateQueries({ queryKey: ["getMusics"] });
    },
    onError: (error: any) => {
      console.log(error);
      errorHandler(error);
    },
  });

  const createMusicMn = useMutation({
    mutationFn: (input: any) =>
      apiCall("post", `/artists/${artist_id}/musics`, { music: input }),
    onSuccess: (res) => {
      console.log(res);
      toast.success("Music Created");
      queryClient.invalidateQueries({ queryKey: ["getMusics"] });
    },
    onError: (error: any) => {
      console.log(error);
      errorHandler(error);
    },
  });

  const { handleSubmit } = useForm({
    validationSchema: formSchema,
    initialValues: {
      title: music?.title ?? "",
      album_name: music?.album_name ?? "",
      genre: music?.genre,
    },
  });

  const onSubmit = handleSubmit((values) => {
    if (music?.id) {
      updateMusicMn.mutate({ input: values, id: music.id });
    } else {
      createMusicMn.mutate({ ...values });
    }
  });
</script>

<template>
  <form @submit="onSubmit" class="space-y-4">
    <FormField v-slot="{ componentField }" name="title">
      <FormItem>
        <FormLabel>Title</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="eg. Billie Jean"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="album_name">
      <FormItem>
        <FormLabel>Album Name</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Thriller" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="genre">
      <FormItem>
        <FormLabel>Gender</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select a genre" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                v-for="(genre, key) in Genre"
                :key="key"
                :value="genre"
              >
                {{ key }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="flex justify-end">
      <Button type="submit"> Submit </Button>
    </div>
  </form>
</template>
