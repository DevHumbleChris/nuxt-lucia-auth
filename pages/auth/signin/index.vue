<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SigninForm from "~/components/auth/signin/SigninForm.vue";

definePageMeta({
  layout: "auth",
});

useHead({
  titleTemplate: "%s - Signin",
});

const modalStore = useModalStore();
const user = useUser();

onBeforeMount(async () => {
  if (user.value) {
    if (!user.value?.isEmailVerified) {
      return await navigateTo("/auth/verify-email");
    }
    await navigateTo("/dashboard");
  }
});

const onRequestMagicLink = () => {
  modalStore?.onOpen("magicLinkRequest");
  modalStore?.setIsOpen(true);
};
</script>

<template>
  <Card class="w-full max-w-md">
    <CardHeader class="text-center">
      <CardTitle>Nuxt Lucia Auth Sign In</CardTitle>
      <CardDescription
        >Sign in to your account to access your dashboard</CardDescription
      >
    </CardHeader>
    <CardContent>
      <div class="grid gap-2">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Button variant="outline" class="w-full" asChild>
            <a href="/api/oauth/google">
              <Icon name="tabler:brand-google" class="mr-2 size-5" />
              Sign in with Google
            </a>
          </Button>
          <Button variant="outline" class="w-full" asChild>
            <a href="/api/oauth/github">
              <Icon name="tabler:brand-github" class="mr-2 size-5" />
              Sign in with Github
            </a>
          </Button>
        </div>
        <Button
          type="button"
          @click="onRequestMagicLink"
          variant="outline"
          class="w-full"
        >
          <Icon name="solar:magic-stick-2-outline" class="mr-2 size-5" />
          Sign in with Magic Link
        </Button>
      </div>
      <div class="my-2 flex items-center">
        <div class="flex-grow border-t border-muted" />
        <div class="mx-2 text-muted-foreground">or</div>
        <div class="flex-grow border-t border-muted" />
      </div>
      <SigninForm />
    </CardContent>
  </Card>
</template>
