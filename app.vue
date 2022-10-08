<script setup lang="ts">
useHead({
  charset: "utf-8",
  titleTemplate: (title) => `${title} | KeyPress`,
  link: [{ rel: "icon", href: "/logo.svg" }],
})
</script>
<template>
  <div>
    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </div>
</template>
