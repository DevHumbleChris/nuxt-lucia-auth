<script setup lang="ts">
import { cn } from "~/lib/utils";
import { Input } from "./ui/input";
import type { ComponentFieldBindingObject } from "vee-validate";

const props = defineProps<{
  class?: string;
  disabled: boolean;
  componentField: ComponentFieldBindingObject<any>;
}>();

const showPassword = ref(false);
</script>

<template>
  <div class="relative">
    <Input
      :type="showPassword ? 'text' : 'password'"
      :class="cn('pr-10', props?.class)"
      placeholder="********"
      :disabled="props?.disabled"
      v-bind="props?.componentField"
    />
    <Button
      type="button"
      variant="ghost"
      size="sm"
      class="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
      @click="showPassword = !showPassword"
      :disabled="props?.disabled"
    >
      <Icon
        v-if="showPassword"
        name="lucide:eye-off"
        class="size-4"
        aria-hidden="true"
      />
      <Icon v-else name="lucide:eye" class="size-4" aria-hidden="true" />
      <span class="sr-only">
        {{ showPassword ? "Hide password" : "Show password" }}
      </span>
    </Button>
  </div>
</template>
