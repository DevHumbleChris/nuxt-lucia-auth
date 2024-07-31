<script setup lang="ts">
import { Loader, ShieldX } from "lucide-vue-next";
import { toast } from "vue-sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";

const modalStore = useModalStore();
const globalUser = useUser();
const isSigningOut = ref(false);

const isModalOpen = computed(() => {
  return modalStore?.type === "signoutUser" && modalStore?.isOpen;
});

const onClose = () => {
  modalStore?.setIsOpen(false);
  modalStore?.onClose();
};

const onSignout = async () => {
  try {
    isSigningOut.value = true;
    const res = await $fetch("/api/auth/signout", {
      method: "POST",
    });

    const data = await useRequestFetch()("/api/user");

    if (!data) {
      globalUser.value = null;
      onClose();
      toast.success(res.message, {
        style: {
          background: "green",
          color: "white",
          border: 0,
        },
      });
      return await navigateTo("/signin");
    }
  } catch (error: any) {
    console.log(error.response);
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
    isSigningOut.value = false;
  }
};
</script>

<template>
  <AlertDialog :open="isModalOpen" @update:open="onClose">
    <AlertDialogContent class="w-[300px]">
      <AlertDialogHeader class="flex flex-col items-center">
        <AlertDialogDescription class="text-destructive">
          <Icon name="codicon:sign-out" class="size-[4rem]" />
        </AlertDialogDescription>
        <AlertDialogTitle class="text-center"
          >Oh no! You're leaving... <br />
          Are you sure?</AlertDialogTitle
        >
      </AlertDialogHeader>
      <div class="grid gap-2">
        <Button
          :disabled="isSigningOut"
          @click="onSignout"
          variant="destructive"
          class="w-full"
        >
          <Loader v-if="isSigningOut" class="animate-spin siez-5" />
          <span v-else>Yes! Sign me out.</span>
        </Button>
        <AlertDialogCancel
          :disabled="isSigningOut"
          variant="outline"
          class="w-full"
          >Naah! Just kidding 😂.</AlertDialogCancel
        >
      </div>
    </AlertDialogContent>
  </AlertDialog>
</template>
