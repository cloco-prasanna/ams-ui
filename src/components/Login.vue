<script setup lang="ts">
  import * as z from "zod";
  import { apiCall, errorHandler } from "@/lib/utils";
  import { useRouter } from "vue-router";
  import { toast } from "vue-sonner";
  import { useMutation } from "@tanstack/vue-query";
  import { Separator } from "./ui/separator";
  import { toTypedSchema } from "@vee-validate/zod";
  import { useForm } from "vee-validate";
  import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import InputPassword from "./forms/InputPassword.vue";
  import Button from "./ui/button/Button.vue";
  import { Card } from "@/components/ui/card";

  const schema = toTypedSchema(
    z.object({
      email: z
        .string({
          required_error: "Email is required.",
        })
        .email(),

      password: z
        .string({
          required_error: "Password is required.",
        })
        .min(8, {
          message: "Password must be at least 8 characters.",
        }),
    })
  );

  const { handleSubmit } = useForm({
    validationSchema: schema,
    initialValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const loginMn = useMutation({
    mutationFn: (input: any) => apiCall("post", "/auth/login", input),
    onSuccess: (res) => {
      toast.success("Logged In successfully!");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.email);
      router.push("/dashboard");
    },
    onError: (error: any) => {
      console.log(error);
      errorHandler(error);
    },
  });

  const onSubmit = handleSubmit((values) => {
    loginMn.mutate({ user: values });
  });
</script>

<template>
  <Card class="mx-auto max-w-[500px] my-10 p-4 rounded-lg">
    <h1 class="text-lg font-bold">Login to Cloco AMS</h1>
    <Separator class="my-4" />

    <form @submit="onSubmit" class="space-y-6">
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              type="email"
              placeholder="Enter your email address"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <InputPassword name="password" label="Password" />

      <div class="flex justify-between gap-2">
        <p>
          Not Registered?
          <RouterLink to="/register" class="underline hover:text-orange-800"
            >Create an account</RouterLink
          >
        </p>
        <Button type="submit"> Login </Button>
      </div>
    </form>
  </Card>
</template>
