<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PasswordInput from "~/components/PasswordInput.vue";

definePageMeta({
  layout: "auth",
});
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
        <Button variant="outline" class="w-full" asChild>
          <NuxtLink to="/login/discord">
            <Icon name="tabler:brand-google" class="mr-2 size-5" />
            Log in with Google
          </NuxtLink>
        </Button>
        <Button variant="outline" class="w-full" asChild>
          <NuxtLink to="/login/discord">
            <Icon name="tabler:brand-github" class="mr-2 size-5" />
            Log in with Github
          </NuxtLink>
        </Button>
      </div>
      <div class="my-2 flex items-center">
        <div class="flex-grow border-t border-muted" />
        <div class="mx-2 text-muted-foreground">or</div>
        <div class="flex-grow border-t border-muted" />
      </div>
      <form class="grid gap-4">
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input
            required
            id="email"
            placeholder="email@example.com"
            autoComplete="email"
            name="email"
            type="email"
          />
        </div>

        <div class="space-y-2">
          <Label for="password">Password</Label>
          <PasswordInput
            id="password"
            name="password"
            required
            autoComplete="current-password"
            placeholder="********"
            :disabled="false"
          />
        </div>

        <div class="flex flex-wrap justify-between">
          <Button variant="link" size="sm" class="p-0">
            <NuxtLink to="/auth/signup">Not signed up? Sign up now.</NuxtLink>
          </Button>
          <Button variant="link" size="sm" class="p-0">
            <NuxtLink to="/auth/reset-password">Forgot password?</NuxtLink>
          </Button>
        </div>
        <Button class="w-full" aria-label="submit-btn"> Signin </Button>
        <Button variant="outline" class="w-full" asChild>
          <NuxtLink to="/">Cancel</NuxtLink>
        </Button>
      </form>
    </CardContent>
  </Card>
</template>
