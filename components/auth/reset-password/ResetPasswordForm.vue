<script setup lang="ts">
import { Input } from "~/components/ui/input";
import { resetPasswordSchema } from "~/types";
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

const props = defineProps<{
  setIsResetPassword: (payload: boolean) => void;
  email: string;
}>();

const form = useForm({
  validationSchema: resetPasswordSchema,
});

const isResettingPassword = ref(false);

const isSubmitting = computed(() => {
  return form.isSubmitting;
});

const onSendPasswordCode = form.handleSubmit(async (values) => {
  try {
    isResettingPassword.value = true;

    const res = await $fetch("/api/auth/reset-password", {
      method: "POST",
      body: {
        ...values,
        email: props?.email,
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

    props?.setIsResetPassword(false);
    await navigateTo("/auth/signin");
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
    isResettingPassword.value = false;
  }
});
</script>

<template>
  <form @submit="onSendPasswordCode" class="space-y-4">
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
    <FormField v-slot="{ componentField }" name="code">
      <FormItem>
        <FormLabel>Code *</FormLabel>
        <FormControl>
          <Input
            type="text"
            v-bind="componentField"
            :disabled="isSubmitting.value"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button
      :disabled="isResettingPassword"
      type="submit"
      class="w-full"
      aria-label="submit-btn"
    >
      <Loader v-if="isResettingPassword" class="animate-spin size-4" />
      <span v-else>Reset Password</span>
    </Button>
    <Button
      :disabled="isResettingPassword"
      variant="outline"
      class="w-full"
      asChild
    >
      <NuxtLink to="/">Cancel</NuxtLink>
    </Button>
  </form>
</template>
