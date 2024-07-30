<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
</script>

<template>
  <main>
    <div class="grid min-h-screen place-items-center p-4">
      <slot />
    </div>
    <Toaster :close-button="true" />
  </main>
</template>
