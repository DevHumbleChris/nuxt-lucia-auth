<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

withDefaults(
  defineProps<{
    name: string;
    side?: "right" | "top" | "bottom" | "left";
  }>(),
  {
    side: "right",
    name: "Tooltip",
  }
);
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <slot />
      </TooltipTrigger>
      <TooltipContent :side="side" class="capitalize">
        {{ name }}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
