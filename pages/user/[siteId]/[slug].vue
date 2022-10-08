<script setup lang="ts">
const client = useSupabaseClient()
const { params } = useRoute()

const { data, pending } = useAsyncData(`posts-${params.slug}`, async () => {
  const { data } = await client.from("posts").select("*, profiles(avatar_url, name)").eq("slug", params.slug).single()
  return data
})
</script>

<template>
  <div class="prose mx-auto w-full" v-if="!pending && data">
    <h1>{{ data.title }}</h1>
    <div class="not-prose">
      <h3>{{ data.profiles?.name }}</h3>
    </div>

    <div v-html="data.body"></div>
  </div>
</template>
