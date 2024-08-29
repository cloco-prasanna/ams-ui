<script setup lang="ts">
  import * as z from "zod";
  import axios from "axios";
  import { Button } from "@/components/ui/button";
  import { AutoForm } from "@/components/ui/auto-form";
  import { API_URL } from "@/lib/utils";
  import { useRouter } from "vue-router";
  import { toast } from "vue-sonner";

  const schema = z.object({
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

    dob: z.coerce.date().optional(),

    gender: z.enum(["male", "female", "other"]).optional(),
  });

  const router = useRouter();

  async function onSubmit(values: Record<string, any>) {
    try {
      const res = await axios.post(
        `${API_URL}/users`,
        {
          user: {
            ...values,
            dob: values.birthday,
          },
        },
        {}
      );
      if (res.status == 201) {
        toast.success("Registration successful!");
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error.message);
    }

    // toast({
    //   title: "You submitted the following values:",
    //   description: h(
    //     "pre",
    //     { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
    //     h("code", { class: "text-white" }, JSON.stringify(values, null, 2))
    //   ),
    // });
  }
</script>

<template>
  <AutoForm
    class="w-2/3 space-y-6 mx-auto max-w-[700px] my-10 p-4 rounded-lg border border-gray-300"
    :schema="schema"
    :field-config="{
      first_name: {
        label: 'Firstname',
      },
      last_name: {
        label: 'Firstname',
      },
      password: {
        inputProps: {
          type: 'password',
          placeholder: '••••••••',
        },
      },
      dob: {
        label: 'Date of Birth',
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
