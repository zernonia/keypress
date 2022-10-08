<script setup lang="ts">
const { params } = useRoute()
</script>

<template>
  <div>this is user {{ params.slug }} index page</div>
</template>
