<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
import AccountHeader from "~/components/account/AccountHeader.vue";
import Sidebar from "~/components/account/Sidebar.vue";
import ModalProvider from "~/providers/ModalProvider.vue";

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
  <main class="flex min-h-screen w-full flex-col bg-muted/40">
    <div class="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <AccountHeader />
        <slot />
      </div>
    </div>
    <Toaster :close-button="true" />
    <ModalProvider />
  </main>
</template>
