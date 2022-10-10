<script setup lang="ts">
import { Profiles } from "~~/utils/types"

const user = useSupabaseUser()
const client = useSupabaseClient()
const profile = useProfile()

const { pending } = useAsyncData(
  "profile",
  async () => {
    const { data } = await client
      .from<Profiles>("profiles")
      .select("*, domains(url, active), posts(id, title, created_at)")
      .order("created_at", { ascending: false, foreignTable: "posts" })
      .eq("id", user.value?.id)
      .maybeSingle()

    profile.value = data
    return data
  },
  { server: false }
)

useCustomHead("Dashboard")

definePageMeta({
  middleware: "auth",
})
</script>

<template>
  <div class="my-12">
    <h2 class="text-3xl font-bold">Dashboard</h2>

    <div class="flex">
      <aside class="flex-shrink-0 w-72 my-8">
        <ul>
          <li class="my-2"><NuxtLink to="/dashboard/posts">Posts</NuxtLink></li>
          <li class="my-2"><NuxtLink to="/dashboard/profile">Profile</NuxtLink></li>
          <li class="my-2"><NuxtLink to="/dashboard/domain">Domain</NuxtLink></li>
        </ul>
      </aside>
      <Loader v-if="pending"></Loader>
      <NuxtPage v-else></NuxtPage>
    </div>
  </div>
</template>
