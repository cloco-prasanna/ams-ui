<script setup lang="ts">
  import { API_URL, errorHandler } from "@/lib/utils";
  import { useMutation } from "@tanstack/vue-query";
  import axios from "axios";
  import { useForm } from "vee-validate";
  import { useRouter } from "vue-router";
  import { toast } from "vue-sonner";
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
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { toTypedSchema } from "@vee-validate/zod";
  import { Gender } from "@/type";
  import { computed, ref } from "vue";
  import {
    CalendarDate,
    DateFormatter,
    getLocalTimeZone,
    parseDate,
    today,
  } from "@internationalized/date";
  import { cn } from "@/lib/utils";
  import { toDate } from "radix-vue/date";
  import { Calendar } from "@/components/ui/calendar";
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
  import InputPassword from "./forms/InputPassword.vue";

  const df = new DateFormatter("en-US", {
    dateStyle: "long",
  });

  const placeholder = ref();
  const schema = toTypedSchema(
    z
      .object({
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
          .string()
          .min(8, "Password must be at least 8 characters long")
          .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must include at least one uppercase letter, lowercase letter, number, and special character"
          ),
        confirm_password: z.string({
          required_error: "Confirm Password is required",
        }),
        phone: z.string().min(10, {
          message: "Invalid phone number",
        }),
        address: z.string().optional(),
        dob: z
          .string()
          .refine((v) => v, { message: "A date of birth is required." }),
        gender: z.enum(["male", "female", "other"]).optional(),
      })
      .refine((data) => data.password === data.confirm_password, {
        message: "Passwords do not match",
        path: ["confirm_password"],
      })
  );

  const router = useRouter();

  const registerMn = useMutation({
    mutationFn: (input: any) => axios.post(`${API_URL}/auth/register`, input),
    onSuccess: () => {
      toast.success("Registration successful!");
      router.push("/");
    },
    onError: (error: any) => {
      console.log(error);
      errorHandler(error);
    },
  });

  const { handleSubmit, values, setFieldValue } = useForm({
    validationSchema: schema,
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      confirm_password: "",
      gender: Gender.Other,
    },
  });

  const dateValue = computed({
    get: () => (values.dob ? parseDate(values.dob) : undefined),
    set: (val) => val,
  });

  const onSubmit = handleSubmit((values) => {
    registerMn.mutate({ user: { ...values, dob: values.dob } });
  });
</script>

<template>
  <div
    class="mx-auto max-w-[700px] my-10 p-4 rounded-lg border border-gray-300"
  >
    <h1 class="text-lg font-bold flex justify-between mb-4">
      <span>User Registration</span> <span>Cloco AMS</span>
    </h1>
    <Separator class="my-4" />
    <form @submit="onSubmit" class="space-y-6">
      <div class="grid grid-cols-2 gap-4">
        <FormField v-slot="{ componentField }" name="first_name">
          <FormItem>
            <FormLabel>Firstname</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Enter your firstname"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="last_name">
          <FormItem>
            <FormLabel>Lastname</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Enter your lastname"
                v-bind="componentField"
              />
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
              placeholder="Enter your email address"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <InputPassword name="password" label="Password" />
      <InputPassword name="confirm_password" label="Confirm Password" />

      <FormField v-slot="{ componentField }" name="phone">
        <FormItem>
          <FormLabel>Phone Number</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Enter your phone number"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="address">
        <FormItem>
          <FormLabel>Address</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Enter your address"
              v-bind="componentField"
            />
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
        <FormField name="dob">
          <FormItem class="flex flex-col space-y-2 mt-3">
            <FormLabel>Date of birth</FormLabel>
            <Popover>
              <PopoverTrigger as-child>
                <FormControl>
                  <Button
                    variant="outline"
                    :class="
                      cn(
                        ' ps-3 text-start font-normal',
                        !dateValue && 'text-muted-foreground'
                      )
                    "
                  >
                    <span>{{
                      dateValue ? df.format(toDate(dateValue)) : "Pick a date"
                    }}</span>
                    <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
                  </Button>
                  <input hidden />
                </FormControl>
              </PopoverTrigger>
              <PopoverContent class="w-auto p-0">
                <Calendar
                  v-model:placeholder="placeholder"
                  v-model="dateValue"
                  calendar-label="Date of birth"
                  initial-focus
                  :min-value="new CalendarDate(1900, 1, 1)"
                  :max-value="today(getLocalTimeZone())"
                  @update:model-value="(v:any) => {
                if (v) {
                  setFieldValue('dob', v.toString())
                }
                else {
                  setFieldValue('dob', undefined)
                }
              }"
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <div class="flex justify-between gap-2">
        <p>
          Already Registered?
          <RouterLink to="/" class="underline hover:text-orange-800"
            >Login</RouterLink
          >
        </p>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  </div>
</template>
