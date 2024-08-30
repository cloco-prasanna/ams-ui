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
  import { Gender, TArtist } from "@/type";
  import { apiCall } from "@/lib/utils";
  import { useMutation } from "@tanstack/vue-query";
  import { toast } from "vue-sonner";
  import { toTypedSchema } from "@vee-validate/zod";

  const { artist } = defineProps<{
    artist?: TArtist;
  }>();

  const formSchema = toTypedSchema(
    z.object({
      name: z
        .string({
          required_error: "Name is required.",
        })
        .min(2, {
          message: "Name must be at least 2 characters.",
        }),

      first_release_year: z.coerce
        .number({
          invalid_type_error: "First Release year must be a number.",
        })
        .min(1500, {
          message: "Invalid min first release year",
        })
        .max(2025, {
          message: "Invalid max first release year",
        })
        .optional(),

      no_of_albums_released: z.coerce
        .number({
          invalid_type_error: "It must be a number.",
        })
        .optional(),

      address: z
        .string({
          required_error: "Address is required.",
        })
        .optional(),

      dob: z.coerce.date().optional(),

      gender: z.nativeEnum(Gender).optional(),
    })
  );

  const updateArtistMn = useMutation({
    mutationFn: ({ input, id }: { input: any; id: number }) =>
      apiCall("patch", `/artists/${id}`, { artist: input }),
    onSuccess: (res) => {
      console.log(res);
      toast.success("artist Updated");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const createArtistMn = useMutation({
    mutationFn: (input: any) => apiCall("post", `/artists/`, { artist: input }),
    onSuccess: () => {
      toast.success("artist Created");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const { handleSubmit } = useForm({
    validationSchema: formSchema,
    initialValues: {
      name: artist?.name ?? "",
      gender: artist?.gender ?? Gender.Other,
      first_release_year: artist?.first_release_year ?? undefined,
      no_of_albums_released: artist?.no_of_albums_released ?? undefined,
      address: artist?.address ?? "",
      dob: artist?.dob ?? undefined,
    },
  });

  const onSubmit = handleSubmit((values) => {
    if (artist?.id) {
      updateArtistMn.mutate({ input: values, id: artist.id });
    } else {
      createArtistMn.mutate({ ...values, password: "password" });
    }
  });

  z;
</script>

<template>
  <form @submit="onSubmit" class="space-y-4">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input type="text" placeholder="shadcn" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="grid grid-cols-2 gap-4">
      <FormField v-slot="{ componentField }" name="gender">
        <FormItem>
          <FormLabel>Gender</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a gender" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="(gender, key) in Gender"
                  :key="key"
                  :value="gender"
                >
                  {{ key }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="dob">
        <FormItem>
          <FormLabel>Date of birth</FormLabel>
          <FormControl>
            <Input type="date" placeholder="" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <FormField v-slot="{ componentField }" name="first_release_year">
        <FormItem>
          <FormLabel>First Release Year</FormLabel>
          <FormControl>
            <Input type="number" placeholder="shadcn" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="no_of_albums_released">
        <FormItem>
          <FormLabel>No of Albums Released</FormLabel>
          <FormControl>
            <Input type="number" placeholder="shadcn" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <FormField v-slot="{ componentField }" name="address">
      <FormItem>
        <FormLabel>Address</FormLabel>
        <FormControl>
          <Input type="" placeholder="shadcn" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit"> Submit </Button>
  </form>
</template>
