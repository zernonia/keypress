<script setup lang="ts">
const profile = useProfile()
</script>

<template>
  <div class="w-full">
    <ul>
      <li v-for="post in profile.posts">
        <NuxtLink :to="`/edit/${post.id}`">
          {{ post }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
