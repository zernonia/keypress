<script setup lang="ts">
import { format } from "date-fns"

const profile = useProfile()
</script>

<template>
  <div class="w-full">
    <ul v-if="profile">
      <li v-for="post in profile.posts" class="my-4">
        <NuxtLink :to="`/edit/${post.id}`" class="block">
          <div class="p-4 rounded-2xl bg-white shadow-none focus:shadow-lg hover:shadow-lg transition">
            <h2 class="text-lg font-semibold">{{ post.title }}</h2>
            <span class="text-sm text-gray-400"> {{ format(new Date(post.created_at), "MMM d") }}</span>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
