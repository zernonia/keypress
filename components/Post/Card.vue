<script setup lang="ts">
import { stripHtml } from "string-strip-html";
import { format } from "date-fns";
import { PropType } from "vue";
import type { Posts } from "~~/utils/types";
import { constructUrl } from "~~/utils/functions";

const props = defineProps({
  subdomain: Boolean,
  post: Object as PropType<Posts>,
});

const url = computed(() => constructUrl(props.post, props.subdomain));
</script>

<template>
  <NuxtLink v-if="post" class="group block" :target="subdomain ? '' : '_blank'" :to="url">
    <div
      class="p-4 md:p-6 my-4 flex flex-col-reverse md:flex-row bg-white shadow-none group-focus:shadow-xl group-focus:shadow-xl hover:shadow-xl shadow-gray-200 rounded-2xl transition-all"
    >
      <div class="w-full flex flex-col justify-between md:h-40">
        <div>
          <div v-if="!subdomain && post?.profiles" class="flex items-center space-x-2">
            <NuxtImg class="w-5 h-5 rounded-full" :src="post.profiles.avatar_url ?? ''"></NuxtImg>
            <h4 class="text-sm font-medium">{{ post.profiles.name }}</h4>
            <div
              v-if="post.featured"
              class="px-2 py-1 rounded-lg bg-light-300 text-gray-400 !ml-6 text-sm font-semibold flex items-center"
            >
              <div class="i-mdi-star mr-1"></div>
              <span>Featured</span>
            </div>
          </div>

          <h1 class="mt-2 font-semibold text-2xl">{{ post.title }}</h1>
          <p class="mt-1 text-gray-400">{{ stripHtml(post.body ?? "").result.slice(0, 120) }}...</p>
        </div>

        <div class="mt-4 text-sm text-gray-400 place-items-end">
          <span> {{ format(new Date(post.created_at ?? ""), "MMM d") }}</span>
          <span v-if="post.tags" class="ml-2 bg-light-300 px-2 py-1 rounded">{{ post.tags?.[0] }}</span>
        </div>
      </div>
      <NuxtImg
        class="w-full md:w-40 h-40 md:ml-12 mb-6 md:mb-0 rounded-xl flex-shrink-0 object-cover"
        v-if="post.cover_img"
        :src="post.cover_img"
      ></NuxtImg>
    </div>
  </NuxtLink>
</template>
