<script setup lang="ts">
import { Loader } from "lucide-vue-next";

definePageMeta({
  layout: "auth",
});

const { query } = useRoute();

const { data, error, status } = await useFetch(
  `/api/auth/verify/${query?.token}/magic-link`
);

onBeforeMount(async () => {
  if (data.value) {
    await navigateTo("/dashboard");
  }
});
</script>

<template>
  <div
    v-if="status === 'pending' || status === 'idle'"
    class="flex flex-col items-center gap-5"
  >
    <p class="text-xl font-bold capitalize">Verifying token...</p>
    <Loader class="animate-spin size-10" />
  </div>
  <div v-else-if="error" class="flex flex-col items-center gap-5">
    <p class="text-xl font-bold capitalize">
      {{
        error.statusMessage === "jwt expired"
          ? "Token Expired!"
          : error.statusMessage
      }}
    </p>
    <svg-icon name="sad" />
  </div>
</template>
