<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { routes } from "~/types";
import { Button } from "./ui/button";
</script>

<template>
  <header
    class="sticky top-0 left-0 right-0 w-full backdrop-blur-sm px-2 z-50 py-4 lg:py-6"
  >
    <div class="container flex items-center gap-2 p-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            class="focus:outline-none focus:ring-1 md:hidden"
            size="icon"
            variant="outline"
          >
            <Icon name="icon-park-outline:hamburger-one" class="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <div class="py-1">
            <DropdownMenuItem v-for="route in routes" :key="route.name" asChild>
              <NuxtLink :to="route.href">{{ route.name }}</NuxtLink>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <NuxtLink
        class="flex items-center justify-center text-xl font-medium"
        to="/"
      >
        <p class="font-bold">Nuxt Lucia Auth</p>
      </NuxtLink>
      <nav class="ml-10 hidden gap-4 sm:gap-6 md:flex">
        <NuxtLink
          v-for="route in routes"
          :key="route.name"
          class="text-sm font-medium text-muted-foreground/70 transition-colors hover:text-muted-foreground"
          :href="route.href"
        >
          {{ route.name }}
        </NuxtLink>
      </nav>
      <div class="ml-auto">
        <Button variant="secondary">
          <NuxtLink to="/auth/signin">Signin</NuxtLink>
        </Button>
      </div>
    </div>
  </header>
</template>
