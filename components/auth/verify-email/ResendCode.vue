<script setup lang="ts">
import { Loader, ShieldX } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { Button } from "~/components/ui/button";

const timeElapsed = ref(60); // Set initial time to 60 seconds

const isResendCode = ref(false);

let timer: ReturnType<typeof setInterval> | null = null;

const isStopTimer = ref(false);

const user = useAuthenticatedUser();

const startTimer = () => {
  isStopTimer.value = true;
  if (timer) {
    isStopTimer.value = false;
    return;
  }
  timer = setInterval(() => {
    if (timeElapsed.value > 0) {
      timeElapsed.value -= 1;
    } else {
      clearInterval(timer!);
      timer = null;
      isStopTimer.value = false;
      timeElapsed.value = 60;
    }
  }, 1000);
};

const onResendCode = async () => {
  try {
    isResendCode.value = true;

    const res = await $fetch("/api/auth/resend-mail", {
      method: "POST",
      body: {
        email: user.value.email,
      },
    });

    toast.success(res.message, {
      style: {
        background: "green",
        color: "white",
        border: 0,
      },
    });
    startTimer();
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
    isResendCode.value = false;
  }
};
</script>

<template>
  <div>
    <Button
      :disabled="isResendCode || (timeElapsed > 0 && isStopTimer)"
      @click="onResendCode"
      class="w-full"
      variant="secondary"
      type="button"
    >
      <Loader v-if="isResendCode" class="animate-spin size-5" />
      <span v-else-if="timeElapsed > 0 && isStopTimer">
        Send verification email in {{ timeElapsed }}s
      </span>
      <span v-else>Resend Code</span>
    </Button>
  </div>
</template>
