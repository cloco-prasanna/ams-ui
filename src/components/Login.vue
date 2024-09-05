<script setup lang="ts">
  import * as z from "zod";
  import { Button } from "@/components/ui/button";
  import { AutoForm } from "@/components/ui/auto-form";
  import { apiCall } from "@/lib/utils";
  import { useRouter } from "vue-router";
  import { toast } from "vue-sonner";
  import { useMutation } from "@tanstack/vue-query";
  import { Separator } from "./ui/separator";

  const schema = z.object({
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
      toast.error(error.message);
    },
  });

  async function onSubmit(values: Record<string, any>) {
    loginMn.mutate({ user: values });
  }
</script>

<template>
  <div
    class="mx-auto max-w-[500px] my-10 p-4 rounded-lg border border-gray-300"
  >
    <h1 class="text-lg font-bold">Login to Cloco AMS</h1>
    <Separator class="my-4" />
    <AutoForm
      class="space-y-6"
      :schema="schema"
      :field-config="{
        email: {
          label: 'Email Address',
          inputProps: {
            type: 'email',
            placeholder: 'Enter email address',
          },
        },
        password: {
          inputProps: {
            type: 'password',
            placeholder: 'Enter password',
          },
        },
      }"
      @submit="onSubmit"
    >
      <div class="flex justify-between gap-2">
        <p>
          Not Registered?
          <RouterLink to="/register" class="underline hover:text-orange-800"
            >Create an account</RouterLink
          >
        </p>
        <Button type="submit"> Submit </Button>
      </div>
    </AutoForm>
  </div>
</template>
