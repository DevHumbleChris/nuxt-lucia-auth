<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
</script>

<template>
  <main>
    <slot />
    <Toaster :close-button="true" />
  </main>
</template>
