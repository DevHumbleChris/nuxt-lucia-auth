<script setup lang="ts">
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Loader, ShieldX } from "lucide-vue-next";
import { verifySchema } from "~/types";
import { useForm } from "vee-validate";
import { toast } from "vue-sonner";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

const isVerifyCode = ref(false);

const user = useAuthenticatedUser();

const form = useForm({
  validationSchema: verifySchema,
});

const isSubmitting = computed(() => {
  return form.isSubmitting;
});

const onVerifyCode = form.handleSubmit(async (values) => {
  try {
    isVerifyCode.value = true;

    const res = await $fetch("/api/auth/verify-email", {
      method: "POST",
      body: {
        code: values.code,
        userId: user.value.id,
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
  } catch (error: any) {
    const errorMessage = error.response
      ? error.response._data.statusMessage
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
    isVerifyCode.value = false;
  }
});
</script>

<template>
  <form @submit="onVerifyCode">
    <FormField v-slot="{ componentField }" name="code">
      <FormItem>
        <FormLabel>Verification Code *</FormLabel>
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
      :disabled="isVerifyCode"
      type="submit"
      class="mt-4 w-full gap-1"
      aria-label="submit-btn"
    >
      <Loader v-if="isVerifyCode" class="animate-spin size-5" />
      <span v-else>Verify</span>
    </Button>
  </form>
</template>
