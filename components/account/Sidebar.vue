<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Home,
  LineChart,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-vue-next";
import ActionTooltip from "./ActionTooltip.vue";
</script>

<template>
  <aside
    class="fixed inset-y-0 left-0 z-10 group hidden w-14 hover:w-[15rem] transition-all duration-500 ease-in-out hover:z-40 flex-col border-r bg-background sm:flex"
  >
    <nav
      class="flex flex-col items-center group-hover:items-start gap-4 group-hover:px-5 px-2 py-4"
    >
      <a
        href="#"
        class="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
      >
        <Package2 class="h-4 w-4 transition-all group-hover:scale-110" />
        <span class="sr-only">Acme Inc</span>
      </a>
      <ActionTooltip name="Dashboard">
        <a
          href="#"
          class="flex h-9 w-9 items-center justify-center group-hover:justify-start rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 group-hover:w-full group-hover:gap-3"
        >
          <Home class="h-5 w-5" />
          <span class="hidden group-hover:block">Dashboard</span>
        </a>
      </ActionTooltip>
    </nav>
    <nav
      class="mt-auto flex flex-col items-center group-hover:items-start gap-4 group-hover:px-5 px-2 py-4"
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <a
              href="#"
              class="flex h-9 w-9 items-center justify-center group-hover:justify-start rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 group-hover:w-full group-hover:gap-3"
            >
              <Settings class="h-5 w-5" />
              <span class="hidden group-hover:block">Settings</span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="right"> Settings </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </nav>
  </aside>
</template>
