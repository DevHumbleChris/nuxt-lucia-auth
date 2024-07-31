<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
import AccountHeader from "~/components/account/AccountHeader.vue";
import Sidebar from "~/components/account/Sidebar.vue";
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
  </main>
</template>
