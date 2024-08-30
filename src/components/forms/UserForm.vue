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
  import { Gender, TUser } from "@/type";
  import { apiCall } from "@/lib/utils";
  import { useMutation, useQueryClient } from "@tanstack/vue-query";
  import { toast } from "vue-sonner";
  import { toTypedSchema } from "@vee-validate/zod";

  const { user } = defineProps<{
    user?: TUser;
  }>();

  const formSchema = toTypedSchema(
    z.object({
      first_name: z
        .string({
          required_error: "Firstname is required.",
        })
        .min(2, {
          message: "Firstname must be at least 2 characters.",
        }),

      last_name: z
        .string({
          required_error: "Lastname is required.",
        })
        .min(2, {
          message: "Lastname must be at least 2 characters.",
        }),

      email: z
        .string({
          required_error: "Email is required.",
        })
        .email(),

      phone: z.coerce
        .number({
          invalid_type_error: "Phone number must be a number.",
        })
        .min(10, {
          message: "Invalid phone number",
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

  const queryClient = useQueryClient();

  const updateUserMn = useMutation({
    mutationFn: ({ input, id }: { input: any; id: number }) =>
      apiCall("patch", `/users/${id}`, { user: input }),
    onSuccess: (res) => {
      console.log(res);
      toast.success("User Updated");
      queryClient.invalidateQueries({ queryKey: ["getUsers"] });
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const createUserMn = useMutation({
    mutationFn: (input: any) => apiCall("post", `/users/`, { user: input }),
    onSuccess: (res) => {
      console.log(res);
      toast.success("User Created");
      queryClient.invalidateQueries({ queryKey: ["getUsers"] });
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const { handleSubmit } = useForm({
    validationSchema: formSchema,
    initialValues: {
      first_name: user?.first_name ?? "",
      last_name: user?.last_name ?? "",
      email: user?.email ?? "",
      gender: user?.gender ?? Gender.Other,
      phone: user?.phone ?? undefined, // Ensure this is either a number or undefined
      address: user?.address ?? "",
      dob: user?.dob ?? undefined,
    },
  });

  const onSubmit = handleSubmit((values) => {
    if (user?.id) {
      updateUserMn.mutate({ input: values, id: user.id });
    } else {
      createUserMn.mutate({ ...values, password: "password" });
    }
  });

  z;
</script>

<template>
  <form @submit="onSubmit" class="space-y-4">
    <div class="grid grid-cols-2 gap-4">
      <FormField v-slot="{ componentField }" name="first_name">
        <FormItem>
          <FormLabel>Firstname</FormLabel>
          <FormControl>
            <Input type="text" placeholder="shadcn" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="last_name">
        <FormItem>
          <FormLabel>Lastname</FormLabel>
          <FormControl>
            <Input type="text" placeholder="shadcn" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input
            type="email"
            placeholder="eg. johndoe@gmail.com"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="grid grid-cols-2 gap-4">
      <FormField v-slot="{ componentField }" name="phone">
        <FormItem>
          <FormLabel>Phone</FormLabel>
          <FormControl>
            <Input type="phone" placeholder="shadcn" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="address">
        <FormItem>
          <FormLabel>Address</FormLabel>
          <FormControl>
            <Input type="" placeholder="shadcn" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
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
    <Button type="submit"> Submit </Button>
  </form>
</template>
