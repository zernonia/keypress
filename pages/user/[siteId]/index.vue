<script setup lang="ts">
import type { Posts } from "~~/utils/types"

const client = useSupabaseClient()
const subdomain = useSubdomain()
const profile = useProfile()

const { data, pending } = useAsyncData("posts", async () => {
  const { data, error } = await client
    .from<Posts>("posts")
    .select("*, profiles(username)")
    // if the user has no subdomain set, we will get it from it's username
    .or(`username.eq.${subdomain.value}, subdomain.eq.${subdomain.value}`, { foreignTable: "profiles" })
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
    </div>
    <!-- <aside></aside> -->
  </div>
</template>
