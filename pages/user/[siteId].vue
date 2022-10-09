<script setup lang="ts">
import { Profiles } from "~~/utils/types"

const client = useSupabaseClient()
const subdomain = useSubdomain()
const profile = useProfile()

// this should fetch user's profiles and settings (if any)
useAsyncData("profile", async () => {
  const { data } = await client
    .from<Profiles>("profiles")
    .select("*")
    .or(`username.eq.${subdomain.value}, subdomain.eq.${subdomain.value}`)
    .single()

  profile.value = data
  return data
})

definePageMeta({
  layout: "user",
})
</script>

<template>
  <div>
    <NuxtPage></NuxtPage>
  </div>
</template>
