<script setup lang="ts">
const { params } = useRoute()
</script>

<template>
  <div>Home for user {{ params.slug }}</div>
</template>
