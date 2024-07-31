<script setup lang="ts">
import PasswordInput from "~/components/PasswordInput.vue";
import { signupSchema } from "~/types";
import { Loader, ShieldX } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { useForm } from "vee-validate";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const form = useForm({
  validationSchema: signupSchema,
});

const isSigningUp = ref(false);

const isSubmitting = computed(() => {
  return form.isSubmitting;
});

const onSubmit = form.handleSubmit(async (values) => {
  try {
    isSigningUp.value = true;

    const res = await $fetch("/api/auth/signup", {
      method: "POST",
      body: {
        email: values.email,
        password: values.password,
      },
    });

    form.handleReset();

    toast.success(res.message, {
      style: {
        background: "green",
        color: "white",
        border: 0,
      },
    });

    await navigateTo("/auth/verify-email");
  } catch (error: any) {
    const errorMessage = error.response
      ? error.response._data.message
      : error.message;

    toast.error(errorMessage, {
      icon: ShieldX,
      style: {
        background: "red",
        color: "white",
        border: 0,
      },
    });
  } finally {
    isSigningUp.value = false;
  }
});
</script>

<template>
  <form @submit="onSubmit" class="grid gap-4">
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel class="text-base">Email *</FormLabel>
        <FormControl>
          <Input
            type="email"
            placeholder="e.g johndoe@example.com"
            v-bind="componentField"
            :disabled="isSubmitting.value"
          />
        </FormControl>
        <FormMessage class="text-xs" />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel class="text-base">Password *</FormLabel>
        <FormControl>
          <PasswordInput
            :disabled="isSubmitting.value"
            :componentField="componentField"
          />
        </FormControl>
        <FormMessage class="text-xs" />
      </FormItem>
    </FormField>
    <div class="flex flex-wrap justify-between">
      <Button type="button" variant="link" size="sm" class="p-0">
        <NuxtLink to="/auth/signin"
          >Already signed up? Signin instead.</NuxtLink
        >
      </Button>
    </div>
    <Button
      :disabled="isSigningUp"
      type="submit"
      class="w-full"
      aria-label="submit-btn"
    >
      <Loader v-if="isSigningUp" class="animate-spin size-4" />
      <span v-else>Signup</span>
    </Button>
    <Button type="button" variant="outline" class="w-full" asChild>
      <NuxtLink to="/">Cancel</NuxtLink>
    </Button>
  </form>
</template>
