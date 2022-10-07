<script setup lang="ts">
const client = useSupabaseClient()

const { data, pending } = useAsyncData("posts", async () => {
  const { data } = await client
    .from("posts")
    .select("*, profiles(avatar_url, name)")
    .order("created_at", { ascending: false })
  return data
})

const constructUrl = (name: string, slug: string) => {
  if (process.dev) return `http://${name}.localhost:3000/${slug}`
  else return `https://${name}.keypress.blog/${slug}`
}
</script>

<template>
  <div>
    <ul>
      <li class="my-4" v-for="post in data">
        <NuxtLink class="focus:outline-none group" target="_blank" :to="constructUrl(post.profiles?.name, post.slug)">
          <div class="p-8 bg-transparent group-focus:bg-white rounded-xl transition">
            <h1 class="font-semibold text-lg">{{ post.title }}</h1>
          </div>
        </NuxtLink>
        <!-- <p v-html="post.body.slice(0, 160)"></p> -->
        <!-- {{ post }} -->
      </li>
    </ul>
  </div>
</template>
