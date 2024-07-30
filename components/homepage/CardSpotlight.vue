<script setup lang="ts">
import type { Feature } from "~/types";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const props = defineProps<{
  feature: Feature;
}>();

const divRef = ref(null);
const position = ref({ x: 0, y: 0 });
const isFocused = ref(false);
const opacity = ref(0);

const handleMouseMove = () => {};

const handleFocus = () => {};

const handleBlur = () => {};

const handleMouseEnter = () => {};
</script>

<template>
  <Card
    ref="divRef"
    @onmouseleave="handleMouseMove"
    @onfocus="handleFocus"
    @onblur="handleBlur"
    @onmouseenter="handleMouseEnter"
    class="relative overflow-hidden rounded-xl border dark:border-gray-800 bg-white dark:bg-gradient-to-r dark:from-black dark:to-neutral-950 dark:shadow-2xl"
  >
    <CardHeader class="pb-6 space-y-3">
      <Icon :name="props?.feature.logo" class="size-[3rem]" />
      <div>
        <CardTitle class="text-xl">{{ props.feature.name }}</CardTitle>
        <CardDescription>{{ props.feature.description }}</CardDescription>
      </div>
    </CardHeader>
  </Card>
</template>
