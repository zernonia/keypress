<script setup lang="ts">
import type { Posts } from "~~/utils/types"
import { stripHtml } from "string-strip-html"
import { format } from "date-fns"

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

useCustomHead(computed(() => `${profile.value?.name}'s blog'`))
</script>

<template>
  <div class="my-20">
    <h1 class="text-4xl font-semibold capitalize">{{ profile?.name }}'s Posts</h1>
    <div>
      <ul>
        <li class="my-4" v-for="post in data">
          <NuxtLink class="focus:outline-none group" :to="`/${post.slug}`">
            <div
              class="py-8 px-0 hover:px-8 bg-transparent hover:bg-white group-focus:px-8 group-focus:bg-white rounded-3xl transition-all flex"
            >
              <div>
                <h1 class="mt-2 font-semibold text-2xl">{{ post.title }}</h1>
                <p class="mt-1 text-gray-400">{{ stripHtml(post.body).result.slice(0, 120) }}...</p>

                <div class="mt-2 text-sm text-gray-400">
                  <span> {{ format(new Date(post.created_at), "MMM d") }}</span>
                  <NuxtLink>{{ post.tags?.[0] }}</NuxtLink>
                </div>
              </div>
              <NuxtImg
                class="w-40 h-40 ml-12 rounded-xl flex-shrink-0"
                v-if="post.cover_img"
                :src="post.cover_img"
              ></NuxtImg>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <!-- <aside></aside> -->
  </div>
</template>
