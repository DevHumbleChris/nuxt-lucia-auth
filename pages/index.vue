<script setup lang="ts">
import { PlusIcon } from "lucide-vue-next";
import CardSpotlight from "~/components/homepage/CardSpotlight.vue";
import CopyToClipboard from "~/components/homepage/CopyToClipboard.vue";
import { Button } from "~/components/ui/button";
import { features, githubUrl } from "~/types";
</script>

<template>
  <section
    class="mx-auto grid min-h-[calc(100vh-300px)] max-w-5xl flex-col items-center justify-center gap-4 text-center"
  >
    <div class="p-4">
      <div class="mb-10 flex items-center justify-center gap-3">
        <Icon name="vscode-icons:file-type-nuxt" class="size-[5rem]" />
        <PlusIcon class="h-8 w-8" />
        <Icon name="simple-icons:lucia" class="size-[52px]" />
      </div>
      <h1
        class="text-balance bg-gradient-to-tr from-black/70 via-black to-black/60 bg-clip-text text-center text-3xl font-bold text-transparent dark:from-zinc-400/10 dark:via-white/90 dark:to-white/20 sm:text-5xl md:text-6xl lg:text-7xl"
      >
        Nuxt.js Lucia Auth Starter Template
      </h1>
      <p
        class="text-balance mb-10 mt-4 text-center text-muted-foreground md:text-lg lg:text-xl"
      >
        A Nuxt.js Authentication starter template (password reset, email
        validation and oAuth). Includes Lucia, Drizzle, TailwindCSS, Shadcn-UI
        and Admin Dashboard.
      </p>
      <div class="mb-10">
        <div class="mx-auto max-w-[430px]">
          <CopyToClipboard :text="'git clone ' + githubUrl" />
        </div>
      </div>
      <div class="flex justify-center gap-4">
        <Button size="lg" variant="outline" asChild>
          <NuxtLink target="_blank" :to="githubUrl">
            <Icon name="tabler:brand-github" class="mr-1 size-5" />
            GitHub
          </NuxtLink>
        </Button>
        <Button size="lg" asChild>
          <NuxtLink to="/auth/signin">Get Started</NuxtLink>
        </Button>
      </div>
    </div>
  </section>
  <section>
    <div class="container mx-auto lg:max-w-screen-lg my-10">
      <h1 class="mb-4 text-center text-3xl font-bold md:text-4xl lg:text-5xl">
        <a id="features"></a> Features
      </h1>
      <p
        class="text-balance mb-10 text-center text-muted-foreground md:text-lg lg:text-xl"
      >
        This starter template is a guide to help you get started with Nuxt.js
        for large scale applications. Feel free to add or remove features to
        suit your needs.
      </p>
      <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        <CardSpotlight
          v-for="(feature, index) in features"
          :key="index"
          :feature="feature"
        />
      </div>
    </div>
  </section>
</template>
