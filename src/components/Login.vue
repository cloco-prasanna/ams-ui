<script setup lang="ts">
  import * as z from "zod";
  import axios from "axios";
  import { Button } from "@/components/ui/button";
  import { AutoForm } from "@/components/ui/auto-form";
  import { API_URL } from "@/lib/utils";
  import { useRouter } from "vue-router";
  import { toast } from "vue-sonner";

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

  async function onSubmit(values: Record<string, any>) {
    try {
      const res = await axios.post(`${API_URL}/tokens`, {
        user: values,
      });
      console.log(res);
      if (res.status == 200) {
        toast.success("Logged In successfully!");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("email", res.data.email);

        router.push("/");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }
</script>

<template>
  <AutoForm
    class="space-y-6 mx-auto max-w-[500px] my-10 p-4 rounded-lg border border-gray-300"
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
</template>
