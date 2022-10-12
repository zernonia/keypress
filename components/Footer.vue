<script setup lang="ts">
const url = useUrl()
</script>

<template>
  <div class="max-w-screen-lg mx-auto">
    <footer class="mt-12 py-6 border-t-2 border-light-700 flex flex-col sm:flex-row justify-between">
      <div>
        <NuxtLink class="flex items-center font-bold text-xl text-dark-300" to="/"
          ><NuxtImg src="/banner.png" class="w-auto h-10 mr-4"></NuxtImg>
        </NuxtLink>
      </div>
      <div class="mt-4 sm:mt-0 flex text-sm sm:text-base space-x-6">
        <ul>
          <h5 class="pr-10 mb-4 font-semibold text-dark-50">Menu</h5>
          <li class="py-0.5">
            <NuxtLink class="text-gray-400 hover:text-dark-300 transition" :to="`${url}/write`">Write</NuxtLink>
          </li>
          <li class="py-0.5">
            <NuxtLink class="text-gray-400 hover:text-dark-300 transition" :to="`${url}/posts`">All Posts</NuxtLink>
          </li>
          <li class="py-0.5">
            <NuxtLink class="text-gray-400 hover:text-dark-300 transition" :to="`${url}/login`">Login</NuxtLink>
          </li>
        </ul>

        <ul>
          <h5 class="pr-10 mb-4 font-semibold text-dark-50">Open Source</h5>
          <li class="py-0.5">
            <NuxtLink
              class="text-gray-400 hover:text-dark-300 transition"
              to="https://github.com/zernonia/keypress"
              target="_blank"
              >GitHub</NuxtLink
            >
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>
