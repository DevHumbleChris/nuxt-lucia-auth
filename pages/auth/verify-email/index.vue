<script setup lang="ts">
import { Loader, ServerCrash } from "lucide-vue-next";
import VerifyCode from "~/components/auth/verify-email/VerifyCode.vue";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

definePageMeta({
  layout: "auth",
  middleware: ["protected"],
});

const user = useAuthenticatedUser();
const { data, error, status } = await useAsyncData("isEmailVerified", () =>
  $fetch(`/api/auth/${user.value.email}/check-verification`)
);
onBeforeMount(async () => {
  if (data.value?.isEmailVerified) {
    await navigateTo("/dashboard");
  }
});
</script>

<template>
  <div
    v-if="status === 'pending' || status === 'idle'"
    class="flex flex-col gap-3 items-center"
  >
    <Loader class="animate-spin size-10" />
    <p class="text-sm text-foreground">Checking email verfication.</p>
  </div>
  <div v-if="error" class="flex flex-col gap-3 items-center text-rose-600">
    <ServerCrash class="size-10" />
    <div>
      <p class="text-md font-bold">Server Crashed.</p>
      <p class="text-sm text-foreground">
        {{ error.statusMessage ? error.statusMessage : error.message }}
      </p>
    </div>
  </div>
  <Card class="w-full max-w-md">
    <CardHeader>
      <svg-icon name="useOdama" class="size-[8rem] -mt-[3rem] mx-auto" />
      <CardTitle class="-mt-[3rem]">Verify Email</CardTitle>
      <CardDescription>
        Verification code was sent to <strong>{{ user.email }}</strong
        >. Check your spam folder if you can't find the email.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <VerifyCode />
    </CardContent>
  </Card>
</template>
