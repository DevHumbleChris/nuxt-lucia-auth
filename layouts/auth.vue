<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
import AuthModalProvider from "~/providers/AuthModalProvider.vue";

useHead({
  meta: [
    { property: "og:title", content: `Nuxt Lucia Auth Starter Template` },
    {
      name: "description",
      content:
        "This is a Nuxt.js project with authentication implemented using Lucia.",
    },
    {
      property: "og:description",
      content:
        "This is a Nuxt.js project with authentication implemented using Lucia.",
    },
    { property: "og:url", content: "https://nuxt-lucia-auth.vercel.app/" },
    { name: "twitter:title", content: "Nuxt Lucia Auth Starter Template" },
    {
      name: "twitter:description",
      content:
        "This is a Nuxt.js project with authentication implemented using Lucia.",
    },
    { name: "twitter:site", content: "https://nuxt-lucia-auth.vercel.app/" },
  ],
  title: `Nuxt Lucia Auth Starter Template`,
});

defineOgImageComponent("NuxtSeo", {
  title: "Nuxt Lucia Auth Starter Template",
  description:
    "This is a Nuxt.js project with authentication implemented using Lucia.",
  theme: "#ff0000",
  colorMode: "dark",
});
</script>

<template>
  <main>
    <div class="grid min-h-screen place-items-center p-4">
      <slot />
    </div>
    <Toaster :close-button="true" />
    <AuthModalProvider />
  </main>
</template>
