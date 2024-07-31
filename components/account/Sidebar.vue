<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Home, Package2, Settings } from "lucide-vue-next";
import ActionTooltip from "./ActionTooltip.vue";
import { Button } from "../ui/button";
import { cn } from "~/lib/utils";

const isExpandView = ref(false);
</script>

<template>
  <aside
    :class="
      cn(
        'fixed inset-y-0 left-0 z-10 group hidden w-14 transition-all duration-500 ease-in-out flex-col border-r bg-background sm:flex',
        isExpandView && 'w-[15rem] z-40'
      )
    "
  >
    <Button
      variant="ghost"
      size="icon"
      @click="isExpandView = !isExpandView"
      :class="
        cn(
          'hover:bg-transparent',
          isExpandView ? 'absolute top-0 right-0' : 'w-fit mx-auto'
        )
      "
    >
      <Icon
        :name="
          isExpandView
            ? 'gg:chevron-double-left-r'
            : 'gg:chevron-double-right-r'
        "
        class="size-6"
      />
    </Button>
    <nav
      :class="
        cn(
          'flex flex-col items-center gap-4 px-2 py-4',
          isExpandView && 'items-start px-5 mt-10'
        )
      "
    >
      <a
        href="#"
        :class="
          cn(
            'group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base',
            isExpandView && ''
          )
        "
      >
        <Package2 class="h-4 w-4 transition-all group-hover:scale-110" />
        <span class="sr-only">Acme Inc</span>
      </a>
      <ActionTooltip name="Dashboard">
        <a
          href="#"
          :class="
            cn(
              'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors md:h-8 md:w-8',
              isExpandView && 'justify-start text-foreground gap-3 w-full'
            )
          "
        >
          <Home class="size-5 flex-shrink-0" />
          <span
            :class="
              cn(
                isExpandView ? 'block' : 'hidden',
                'transiton-all duration-500 ease-in-out'
              )
            "
            >Dashboard</span
          >
        </a>
      </ActionTooltip>
    </nav>
    <nav
      :class="
        cn(
          'mt-auto flex flex-col items-center gap-4 px-2 py-4',
          isExpandView && 'items-start px-5'
        )
      "
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <a
              href="#"
              :class="
                cn(
                  'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors md:h-8 md:w-8',
                  isExpandView && 'justify-start text-foreground gap-3 w-full'
                )
              "
            >
              <Settings class="size-5 flex-shrink-0" />
              <span
                :class="
                  cn(
                    isExpandView ? 'block' : 'hidden',
                    'transiton-all duration-500 ease-in-out'
                  )
                "
                >Settings</span
              >
            </a>
          </TooltipTrigger>
          <TooltipContent side="right"> Settings </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </nav>
  </aside>
</template>
