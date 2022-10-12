<script setup lang="ts">
import type { Posts } from "~~/utils/types"

const client = useSupabaseClient()
const profile = useSubdomainProfile()

const { data, pending } = useAsyncData("posts", async () => {
  const { data, error } = await client
    .from<Posts>("posts")
    .select("*, profiles!inner (username)")
    .eq("active", true)
    // @ts-ignore
    .eq("profiles.id", profile.value.id)
    .order("created_at", { ascending: false })

  return data
})

useCustomHead(computed(() => `${profile.value?.name}'s blog`))
</script>

<template>
  <div class="my-20">
    <h1 class="text-4xl font-semibold">{{ profile?.name }}'s posts</h1>
    <div>
      <ul v-if="data">
        <li class="my-4" v-for="post in data">
          <PostCard subdomain v-if="post.id" :post="post"></PostCard>
        </li>
      </ul>
      <Loader v-if="pending"></Loader>
    </div>
    <!-- <aside></aside> -->
  </div>
</template>
