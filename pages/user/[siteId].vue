<script setup lang="ts">
import { Profiles } from "~~/utils/types"

const client = useSupabaseClient()
const subdomain = useSubdomain()
const profile = useSubdomainProfile()

// this should fetch user's profiles and settings (if any)
useAsyncData("profile", async () => {
  const { data, error } = await client
    .from<Profiles>("profiles")
    .select("*")
    .or(`username.eq.${subdomain.value}, subdomain.eq.${subdomain.value}`)
    .maybeSingle()

  profile.value = data
  return data
})

definePageMeta({
  layout: "user",
})
</script>

<template>
  <div>
    <NuxtPage v-if="profile"></NuxtPage>
    <div class="text-4xl my-20 font-bold text-center" v-else>Page not found</div>
  </div>
</template>
