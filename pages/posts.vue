<script setup lang="ts">
import type { Posts } from "~~/utils/types"

const client = useSupabaseClient()

const { data, pending } = useAsyncData("posts", async () => {
  const { data } = await client
    .from<Posts>("posts")
    .select("*, profiles(avatar_url, name,username, subdomain)")
    .order("created_at", { ascending: false })
  return data
})

interface Tags {
  name: string
  count: number
}
const { data: tags } = useAsyncData("tags", async () => {
  const { data } = await client.from<Tags>("tags_view").select("*")
  return data
})

useCustomHead("Explore all posts")
</script>

<template>
  <div class="my-12">
    <h1 class="text-4xl font-semibold">Posts</h1>
    <div class="flex">
      <div class="w-full">
        <div v-if="pending">
          <Loader></Loader>
        </div>
        <ul v-else>
          <li class="my-4" v-for="post in data">
            <PostCard :post="post"></PostCard>
          </li>
        </ul>
      </div>
      <aside class="ml-6 w-60 flex-shrink-0">
        <h5>Tags</h5>

        <ul>
          <li v-for="tag in tags">
            {{ tag.name }} <span>{{ tag.count }}</span>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>
