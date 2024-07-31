<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
import Footer from "~/components/Footer.vue";
import Header from "~/components/Header.vue";

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
    <Header />
    <slot />
    <Toaster :close-button="true" />
    <Footer />
  </main>
</template>
