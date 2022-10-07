<script lang="ts" setup>
const user = useSupabaseUser()
</script>

<template>
  <div class="p-4 bg-light-300 min-h-screen w-full flex flex-col">
    <div class="max-w-screen-lg mx-auto w-full">
      <nav class="flex justify-between items-center">
        <NuxtLink to="/">
          <Logo class="w-12 h-12"></Logo>
        </NuxtLink>

        <div class="flex items-center">
          <Command class="mr-4"></Command>
          <NuxtLink to="/login" v-if="!user">Login</NuxtLink>
          <div>
            <NuxtImg
              v-if="user?.user_metadata?.avatar_url"
              class="w-10 h-10 rounded-full"
              :src="user?.user_metadata?.avatar_url"
              :alt="user?.user_metadata?.full_name"
            />
          </div>
        </div>
      </nav>
      <slot />
    </div>
  </div>
</template>
