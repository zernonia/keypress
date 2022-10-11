<script setup lang="ts">
import { Posts } from "~~/utils/types"

useCustomHead("Experience keyboard-first blogging platform")

const client = useSupabaseClient()
const { data, pending } = useAsyncData(
  "posts",
  async () => {
    const { data } = await client
      .from<Posts>("posts")
      .select("*, profiles(avatar_url, name, username, domains (url, active) )")
      .order("created_at", { ascending: false })
    return data
  },
  { lazy: true, server: false }
)
</script>

<template>
  <div>
    <div class="my-32 text-center">
      <h1 class="text-6xl font-bold">
        Write your story
        <!-- <NuxtLink class="text-6xl h-min font-bold text-light-9 00" to="/write">Write your story...</NuxtLink> -->
      </h1>
      <h2 class="mt-2 text-4xl font-bold text-light-900">with keyboard only</h2>
    </div>

    <NuxtImg
      class="w-80 h-auto"
      src="https://images.unsplash.com/photo-1665049420194-8f562db50cbd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
      alt=""
    />

    <h2 class="mt-20 text-4xl font-bold">Posts</h2>
    <Loader v-if="pending"></Loader>
    <ul v-else class="mt-4">
      <li v-for="post in data">
        <PostCard :post="post"></PostCard>
      </li>
    </ul>
  </div>
</template>
