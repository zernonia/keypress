<script setup lang="ts">
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap"
import { StyleValue } from "vue"

useHead({
  charset: "utf-8",
  titleTemplate: (title) => `${title} | KeyPress`,
  link: [{ rel: "icon", href: "/logo.svg" }],
})

// const body = ref()
// useFocusTrap(body)

// const activeElement = useActiveElement()

// const boxStyle = computed<StyleValue>(() => {
//   const el = activeElement.value

//   if (el?.offsetTop && el?.offsetLeft) {
//     return {
//       top: el?.offsetTop + "px",
//       left: el?.offsetLeft + "px",
//       width: el?.offsetWidth + "px",
//       height: el?.offsetHeight + "px",
//     }
//   }
// })
</script>
<template>
  <div ref="body" class="relative">
    <!-- <div class="absolute top-0 left-0 w-0 h-0 border border-dark-50 transition-all ease-in-out" :style="boxStyle"></div> -->

    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </div>
</template>
