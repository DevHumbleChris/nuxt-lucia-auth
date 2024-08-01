<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { magicLinkRequestSchema } from "~/types";

const modalStore = useModalStore();

const isModalOpen = computed(() => {
  return modalStore?.type === "magicLinkRequest" && modalStore?.isOpen;
});

const isSendingMagicLink = ref(false);

const form = useForm({
  validationSchema: magicLinkRequestSchema,
});

const isSubmitting = computed(() => {
  return form.isSubmitting;
});

const onClose = () => {
  modalStore?.setIsOpen(false);
  modalStore?.onClose();
};

const onSendMagicLink = form.handleSubmit(async (values) => {
  try {
    isSendingMagicLink.value = true;

    const res = await $fetch("/api/auth/request-magic-link", {
      method: "POST",
      body: {
        ...values,
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

    onClose();
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
    isSendingMagicLink.value = false;
  }
});
</script>

<template>
  <AlertDialog :open="isModalOpen" @update:open="onClose">
    <AlertDialogContent class="w-full max-w-md">
      <AlertDialogHeader class="items-center">
        <Icon
          name="solar:magic-stick-2-outline"
          class="size-[3rem] text-black dark:text-white"
        />
        <AlertDialogTitle>Magic Link Request</AlertDialogTitle>
        <AlertDialogDescription class="text-center">
          Pop in your email to get the magic link—abracadabra! ✨
        </AlertDialogDescription>
      </AlertDialogHeader>
      <form @submit="onSendMagicLink" class="space-y-3">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email *</FormLabel>
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
        <div class="grid gap-2">
          <Button :disabled="isSendingMagicLink" class="w-full">
            <Loader v-if="isSendingMagicLink" class="animate-spin siez-5" />
            <span v-else>Yes! I want the magic.</span>
          </Button>
          <AlertDialogCancel
            :disabled="isSendingMagicLink"
            variant="outline"
            class="w-full"
            >Naah! Just kidding 😂.</AlertDialogCancel
          >
        </div>
      </form>
    </AlertDialogContent>
  </AlertDialog>
</template>
