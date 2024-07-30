<script setup lang="ts">
import { CheckIcon, CopyIcon } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const props = defineProps<{
  text: string;
}>();

const isCopied = ref(false);
const text = ref(props?.text);

const copyToClipboard = async () => {
  isCopied.value = true;
  setTimeout(() => {
    isCopied.value = false;
  }, 2000);

  await navigator.clipboard.writeText(props?.text);
  toast("Copied to clipboard", {
    icon: CopyIcon,
  });
};
</script>

<template>
  <div class="flex justify-center gap-3">
    <Input readonly v-model="text" class="bg-secondary text-muted-foreground" />
    <Button size="icon" @click="copyToClipboard">
      <CheckIcon
        v-if="isCopied"
        :class="cn(isCopied ? 'opacity-100' : 'opacity-0', '')"
      />
      <CopyIcon v-else class="size-5" />
    </Button>
  </div>
</template>
