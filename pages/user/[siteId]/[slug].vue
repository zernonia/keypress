<script setup lang="ts">
import { format } from "date-fns"
import { Posts } from "~~/utils/types"
import { stripHtml } from "string-strip-html"
import { constructUrl } from "~~/utils/functions"

const client = useSupabaseClient()
const { params } = useRoute()
const url = useUrl()

const { data, pending } = useAsyncData(`posts-${params.slug}`, async () => {
  const { data } = await client
    .from<Posts>("posts")
    .select("*, profiles(avatar_url, name, username)")
    .eq("slug", params.slug)
    .single()
  return data
})

useCustomHead(
  computed(() => data.value?.title),
  computed(() => (data.value?.body ? stripHtml(data.value?.body)?.result?.slice(0, 160) : undefined)),
  computed(() => (data.value?.cover_img === "" ? `${url}/og/${params.slug}` : data.value?.cover_img))
)

const fullUrl = computed(() => constructUrl(data.value, false))
</script>

<template>
  <div>
    <Transition name="fade" mode="out-in">
      <article class="prose mx-auto w-full" v-if="!pending && data">
        <div class="not-prose flex items-center pt-8 pb-4">
          <NuxtImg class="w-12 h-12 rounded-full mr-4" :src="data.profiles.avatar_url"></NuxtImg>
          <div>
            <h3 class="text-lg">{{ data.profiles?.name }}</h3>
            <h4 class="text-sm text-gray-400">{{ format(new Date(data.created_at), "MMMM d") }}</h4>
          </div>
        </div>
        <h1>{{ data.title }}</h1>

        <NuxtImg v-if="data.cover_img" :src="data.cover_img" class="my-8 w-full h-auto"></NuxtImg>

        <!-- <Tiptap v-model="data.body"></Tiptap> -->
        <div v-html="data.body"></div>

        <hr />

        <div class="not-prose mt-2 flex items-center space-x-2">
          <NuxtLink
            class="px-1 text-2xl text-gray-300 focus:text-dark-300 hover:text-dark-300 transition"
            :to="`https://twitter.com/intent/tweet?url=${fullUrl}&text=Check%20out%20this%20new%20post`"
            target="_blank"
          >
            <div class="i-mdi-twitter"></div>
          </NuxtLink>
          <NuxtLink
            class="px-1 text-2xl text-gray-300 focus:text-dark-300 hover:text-dark-300 transition"
            :to="`https://www.facebook.com/sharer/sharer.php?u=${fullUrl}`"
            target="_blank"
          >
            <div class="i-mdi-facebook"></div
          ></NuxtLink>
          <NuxtLink
            class="px-1 text-2xl text-gray-300 focus:text-dark-300 hover:text-dark-300 transition"
            :to="`https://www.linkedin.com/shareArticle?mini=true&url=${fullUrl}`"
            target="_blank"
          >
            <div class="i-mdi-linkedin"></div
          ></NuxtLink>
        </div>

        <!-- <div>More posts</div> -->

        <!-- <div>Comments</div> -->
      </article>
      <Loader v-else></Loader>
    </Transition>
  </div>
</template>
