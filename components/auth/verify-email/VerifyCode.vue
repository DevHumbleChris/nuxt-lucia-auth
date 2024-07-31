<script setup lang="ts">
import { toast } from "vue-sonner";
import ResendCode from "./ResendCode.vue";
import VerifyForm from "./VerifyForm.vue";
import { Button } from "~/components/ui/button";
import { ShieldX } from "lucide-vue-next";

const globalUser = useUser();

const onSignout = async () => {
  try {
    const res = await $fetch("/api/auth/signout", {
      method: "POST",
    });

    const data = await useRequestFetch()("/api/user");

    if (!data) {
      globalUser.value = null;
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
  }
};
</script>

<template>
  <div class="flex flex-col gap-2">
    <VerifyForm />
    <ResendCode />
    <div>
      <Button
        @click="onSignout"
        type="button"
        variant="link"
        class="p-0 font-normal"
      >
        want to use another email? Log out now.
      </Button>
    </div>
  </div>
</template>
