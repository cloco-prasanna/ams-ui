<script setup lang="ts">
  import * as z from "zod";
  import { h } from "vue";
  import { Button } from "@/components/ui/button";
  import { toast } from "@/components/ui/toast";
  import { AutoForm, AutoFormField } from "@/components/ui/auto-form";

  enum Sports {
    Football = "Football/Soccer",
    Basketball = "Basketball",
    Baseball = "Baseball",
    Hockey = "Hockey (Ice)",
    None = "I don't like sports",
  }

  const schema = z.object({
    firstname: z
      .string({
        required_error: "Firstname is required.",
      })
      .min(2, {
        message: "Firstname must be at least 2 characters.",
      }),

    lastname: z
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

    password: z
      .string({
        required_error: "Password is required.",
      })
      .min(8, {
        message: "Password must be at least 8 characters.",
      }),

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

    birthday: z.coerce.date().optional(),

    gender: z.enum(["male", "female", "other"]).optional(),
  });

  function onSubmit(values: Record<string, any>) {
    toast({
      title: "You submitted the following values:",
      description: h(
        "pre",
        { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
        h("code", { class: "text-white" }, JSON.stringify(values, null, 2))
      ),
    });
  }
</script>

<template>
  <AutoForm
    class="w-2/3 space-y-6 mx-auto p-4 rounded-lg border border-gray-300"
    :schema="schema"
    :field-config="{
      password: {
        label: 'Your secure password',
        inputProps: {
          type: 'password',
        },
      },
    }"
    @submit="onSubmit"
  >
    <div class="flex justify-between gap-2">
      <p>
        Already Registered?
        <RouterLink to="/" class="underline hover:text-orange-800"
          >Login</RouterLink
        >
      </p>
      <Button type="submit"> Submit </Button>
    </div>
  </AutoForm>
</template>
