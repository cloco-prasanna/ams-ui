<script setup lang="ts">
  import { useForm } from "vee-validate";
  import * as z from "zod";
  import { Button } from "@/components/ui/button";
  import { apiCall, errorHandler } from "@/lib/utils";
  import { useMutation } from "@tanstack/vue-query";
  import { toast } from "vue-sonner";
  import { toTypedSchema } from "@vee-validate/zod";
  import { Card } from "@/components/ui/card";
  4;
  import InputPassword from "./InputPassword.vue";

  const formSchema = toTypedSchema(
    z
      .object({
        current_password: z.string({
          required_error: "This field is required",
        }),
        new_password: z.string({
          required_error: "This field is required",
        }),
        confirm_new_password: z.string({
          required_error: "This field is required",
        }),
      })
      .refine((data) => data.new_password === data.confirm_new_password, {
        message: "New passwords must match",
        path: ["confirm_new_password"],
      })
      .refine((data) => data.current_password !== data.new_password, {
        message: "New password cannot be the same as the current password",
        path: ["new_password"],
      })
  );

  const updatePasswordMn = useMutation({
    mutationFn: (input: any) =>
      apiCall("patch", `/auth/change_password`, input),
    onSuccess: (res) => {
      console.log(res);
      toast.success("Password Updated");
    },
    onError: (error: any) => {
      console.log(error);
      errorHandler(error);
    },
  });

  const { handleSubmit } = useForm({
    validationSchema: formSchema,
  });

  const onSubmit = handleSubmit((values) => {
    updatePasswordMn.mutate({
      current_password: values.current_password,
      new_password: values.new_password,
    });
  });
</script>

<template>
  <Card class="p-6">
    <h1 class="text-lg font-bold mb-4">Change Password</h1>
    <form @submit="onSubmit" class="space-y-4">
      <InputPassword
        name="current_password"
        label="Current Password"
        placeholder="Current Password"
      />
      <InputPassword
        name="new_password"
        label="New Password"
        placeholder="Enter new password"
      />
      <InputPassword
        name="confirm_new_password"
        label="Confirm Password"
        placeholder="Enter new password"
      />
      <div class="flex justify-end">
        <Button type="submit"> Submit </Button>
      </div>
    </form></Card
  >
</template>
