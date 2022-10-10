<script setup lang="ts">
import { stripHtml } from "string-strip-html"
import { format } from "date-fns"
import { PropType } from "vue"
import { Posts } from "~~/utils/types"

const props = defineProps({
  subdomain: Boolean,
  post: Object as PropType<Posts>,
})

const constructUrl = (name: string, slug: string) => {
  // todo: map other custom domain
  if (props.subdomain) return `/${slug}`
  if (process.dev) return `http://${name}.localhost:3000/${slug}`
  else return `https://${name}.keypress.blog/${slug}`
}
</script>

<template>
  <NuxtLink
    class="focus:outline-none group"
    :target="subdomain ? '' : '_blank'"
    :to="constructUrl(post.profiles?.name, post.slug)"
  >
    <div
      class="p-6 my-4 bg-white shadow-none group-focus:shadow-xl group-focus:shadow-xl shadow-gray-200 rounded-3xl transition-all flex"
    >
      <div>
        <div v-if="!subdomain" class="flex items-center space-x-2">
          <NuxtImg class="w-5 h-5 rounded-full" :src="post.profiles.avatar_url"></NuxtImg>
          <h4 class="text-sm font-medium">{{ post.profiles.name }}</h4>
        </div>

        <h1 class="mt-2 font-semibold text-2xl">{{ post.title }}</h1>
        <p class="mt-1 text-gray-400">{{ stripHtml(post.body).result.slice(0, 120) }}...</p>

        <div class="mt-2 text-sm text-gray-400">
          <span> {{ format(new Date(post.created_at), "MMM d") }}</span>
          <NuxtLink>{{ post.tags?.[0] }}</NuxtLink>
        </div>
      </div>
      <NuxtImg class="w-40 h-40 ml-12 rounded-xl flex-shrink-0" v-if="post.cover_img" :src="post.cover_img"></NuxtImg>
    </div>
  </NuxtLink>
</template>