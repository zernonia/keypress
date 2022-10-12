<script setup lang="ts">
import { createFocusTrap } from "focus-trap"

useHead({
  charset: "utf-8",
  titleTemplate: (title) => `${title} | KeyPress`,
  link: [{ rel: "icon", href: "/logo.svg" }],
})

onMounted(() => {
  const trap = createFocusTrap("body", { escapeDeactivates: false })
  trap.activate()
})
</script>
<template>
  <div class="relative">
    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </div>
</template>
