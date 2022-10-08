<script setup lang="ts">
import { Profiles } from "~~/utils/types"

const client = useSupabaseClient()
const subdomain = useSubdomain()

// this should fetch user's profiles and settings (if any)
const { data, pending } = useAsyncData("profile", async () => {
  const { data } = await client
    .from<Profiles>("profiles")
    .select("*")
    .or(`username.eq.${subdomain.value}, subdomain.eq.${subdomain.value}`)
    .single()
  return data
})
</script>

<template>
  <div>
    <NuxtPage></NuxtPage>
  </div>
</template>
