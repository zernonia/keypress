<script lang="ts" setup>
const user = useSupabaseUser()
</script>

<template>
  <div>
    <nav class="flex justify-between items-center">
      <NuxtLink>Hydrogen</NuxtLink>

      <div>
        <NuxtLink to="/login" v-if="!user">Login</NuxtLink>
        <div>
          <img
            class="w-10 h-10 rounded-full"
            :src="user?.user_metadata?.avatar_url"
            :alt="user?.user_metadata?.full_name"
          />
        </div>
      </div>
    </nav>
    <slot />
  </div>
</template>
