<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
import Footer from "~/components/Footer.vue";
import Header from "~/components/Header.vue";
</script>

<template>
  <main>
    <Header />
    <slot />
    <Toaster :close-button="true" />
    <Footer />
  </main>
</template>
