<script setup lang="ts">
import { format } from "date-fns"
import { Posts } from "~~/utils/types"

const client = useSupabaseClient()
const { params } = useRoute()

const { data, pending } = useAsyncData(`posts-${params.slug}`, async () => {
  const { data } = await client
    .from<Posts>("posts")
    .select("*, profiles(avatar_url, name)")
    .eq("slug", params.slug)
    .single()
  return data
})
</script>

<template>
  <article class="prose mx-auto w-full" v-if="!pending && data">
    <div class="not-prose flex items-center pt-8 pb-4">
      <NuxtImg class="w-12 h-12 rounded-full mr-4" :src="data.profiles.avatar_url"></NuxtImg>
      <div>
        <h3 class="text-lg">{{ data.profiles?.name }}</h3>
        <h4 class="text-sm text-gray-400">{{ format(new Date(data.created_at), "MMMM d") }}</h4>
      </div>
    </div>
    <h1>{{ data.title }}</h1>

    <NuxtImg v-if="data.cover_img" :src="data.cover_img" class="my-8"></NuxtImg>

    <!-- <Tiptap v-model="data.body"></Tiptap> -->
    <div v-html="data.body"></div>

    <hr />

    <div>Share</div>

    <div>More posts</div>

    <div>Comments</div>
  </article>
</template>
