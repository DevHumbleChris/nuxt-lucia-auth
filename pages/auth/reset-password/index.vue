<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ResetPasswordForm from "~/components/auth/reset-password/ResetPasswordForm.vue";
import SendResetEmail from "~/components/auth/reset-password/SendResetEmail.vue";

definePageMeta({
  layout: "auth",
});

useHead({
  titleTemplate: "%s - Reset Password",
});

const isResetPassword = ref(false);
const email = ref("");

const setIsResetPassword = (payload: boolean) => {
  isResetPassword.value = payload;
};

const setEmail = (payload: string) => {
  email.value = payload;
};
</script>

<template>
  <Card v-if="isResetPassword" class="w-full max-w-md">
    <CardHeader>
      <CardTitle>Reset password?</CardTitle>
      <CardDescription>
        Enter your new password and the code sent to your email to reset your
        password.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ResetPasswordForm
        :email="email"
        :setIsResetPassword="setIsResetPassword"
      />
    </CardContent>
  </Card>
  <Card v-else class="w-full max-w-md">
    <CardHeader>
      <CardTitle>Forgot password?</CardTitle>
      <CardDescription>
        Password reset code will be sent to your email.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <SendResetEmail
        :setIsResetPassword="setIsResetPassword"
        :setEmail="setEmail"
      />
    </CardContent>
  </Card>
</template>
