<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignupForm from "~/components/auth/signup/SignupForm.vue";

definePageMeta({
  layout: "auth",
});

const user = useUser();

onBeforeMount(async () => {
  if (!user.value?.isEmailVerified) {
    return await navigateTo("/auth/verify-email");
  }
  await navigateTo("/dashboard");
});
</script>

<template>
  <Card class="w-full max-w-md">
    <CardHeader class="text-center">
      <CardTitle>Nuxt Lucia Auth Sign Up</CardTitle>
      <CardDescription>Sign up to start using the app</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Button variant="outline" class="w-full" asChild>
          <NuxtLink to="/login/discord">
            <Icon name="tabler:brand-google" class="mr-2 size-5" />
            Sign up with Google
          </NuxtLink>
        </Button>
        <Button variant="outline" class="w-full" asChild>
          <NuxtLink to="/login/discord">
            <Icon name="tabler:brand-github" class="mr-2 size-5" />
            Sign up with Github
          </NuxtLink>
        </Button>
      </div>
      <div class="my-2 flex items-center">
        <div class="flex-grow border-t border-muted" />
        <div class="mx-2 text-muted-foreground">or</div>
        <div class="flex-grow border-t border-muted" />
      </div>
      <SignupForm />
    </CardContent>
  </Card>
</template>
