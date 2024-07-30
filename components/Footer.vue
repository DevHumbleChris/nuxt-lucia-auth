<script setup lang="ts">
import { CodeIcon } from "lucide-vue-next";
import { githubUrl, twitterUrl } from "~/types";
</script>

<template>
  <footer class="mt-6 px-4 py-6">
    <div class="container flex items-center p-0">
      <CodeIcon class="mr-2 h-6 w-6" />
      <p class="text-sm">
        Built by {{ " " }}
        <NuxtLink
          target="_blank"
          class="underline underline-offset-4"
          :to="twitterUrl"
        >
          AmChrisKE
        </NuxtLink>
        . Get the source code from {{ " " }}
        <NuxtLink
          target="_blank"
          class="underline underline-offset-4"
          :to="githubUrl"
        >
          GitHub
        </NuxtLink>
        .
      </p>
      <div class="ml-auto">
        <ThemeToggle />
      </div>
    </div>
  </footer>
</template>
