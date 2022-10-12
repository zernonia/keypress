<script setup lang="ts">
import { stripHtml } from "string-strip-html"
import { format } from "date-fns"
import { PropType } from "vue"
import { Posts } from "~~/utils/types"
import { constructUrl } from "~~/utils/functions"

const props = defineProps({
  subdomain: Boolean,
  post: Object as PropType<Posts>,
})

const url = computed(() => constructUrl(props.post, props.subdomain))
</script>

<template>
  <NuxtLink class="group block" :target="subdomain ? '' : '_blank'" :to="url">
    <div
      class="p-6 my-4 bg-white shadow-none group-focus:shadow-xl group-focus:shadow-xl shadow-gray-200 rounded-3xl transition-all flex"
    >
      <div class="w-full flex flex-col h-full">
        <div v-if="!subdomain" class="flex items-center space-x-2">
          <NuxtImg class="w-5 h-5 rounded-full" :src="post.profiles.avatar_url"></NuxtImg>
          <h4 class="text-sm font-medium">{{ post.profiles.name }}</h4>
        </div>

        <h1 class="mt-2 font-semibold text-2xl">{{ post.title }}</h1>
        <p class="mt-1 text-gray-400">{{ stripHtml(post.body).result.slice(0, 120) }}...</p>

        <div class="mt-2 text-sm text-gray-400 place-items-end">
          <span> {{ format(new Date(post.created_at), "MMM d") }}</span>
          <NuxtLink v-if="post.tags" class="ml-2 bg-light-300 px-2 py-1 rounded">{{ post.tags?.[0] }}</NuxtLink>
        </div>
      </div>
      <NuxtImg class="w-40 h-40 ml-12 rounded-xl flex-shrink-0" v-if="post.cover_img" :src="post.cover_img"></NuxtImg>
    </div>
  </NuxtLink>
</template>
