<script setup lang="ts">
import { Input } from "~/components/ui/input";
import { resetPasswordCodeSchema } from "~/types";
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
  setEmail: (payload: string) => void;
}>();

const form = useForm({
  validationSchema: resetPasswordCodeSchema,
});

const isSendingCode = ref(false);

const isSubmitting = computed(() => {
  return form.isSubmitting;
});

const onSendPasswordCode = form.handleSubmit(async (values) => {
  try {
    isSendingCode.value = true;

    const res = await $fetch("/api/auth/send-reset-password-code", {
      method: "POST",
      body: {
        email: values.email,
      },
    });

    props?.setEmail(values.email);
    form.handleReset();

    toast.success(res.message, {
      style: {
        background: "green",
        color: "white",
        border: 0,
      },
    });

    props?.setIsResetPassword(true);
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
    isSendingCode.value = false;
  }
});
</script>

<template>
  <form @submit="onSendPasswordCode" class="space-y-4">
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

    <div class="flex flex-wrap justify-between">
      <NuxtLink to="/auth/signup">
        <Button type="button" variant="link" size="sm" class="p-0">
          Not signed up? Sign up now
        </Button>
      </NuxtLink>
    </div>

    <Button
      :disabled="isSendingCode"
      type="submit"
      class="w-full"
      aria-label="submit-btn"
    >
      <Loader v-if="isSendingCode" class="animate-spin size-4" />
      <span v-else>Send Code</span>
    </Button>
    <Button :disabled="isSendingCode" variant="outline" class="w-full" asChild>
      <NuxtLink to="/">Cancel</NuxtLink>
    </Button>
  </form>
</template>
