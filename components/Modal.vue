<script setup lang="ts">
const props = defineProps({ open: Boolean, confirmAction: Function })
const emits = defineEmits(["update:open"])
const el = ref()
onClickOutside(el, () => {
  emits("update:open", !props.open)
})

onKeyStroke("Escape", () => emits("update:open", false))
</script>

<template>
  <transition name="command-dialog">
    <div v-if="open" class="fixed top-0 left-0 w-screen h-screen z-100 flex items-center justify-center">
      <div ref="el" class="inner w-full mx-4 max-w-112 bg-white rounded-xl shadow-2xl overflow-hidden">
        <slot>Content</slot>
      </div>
    </div>
  </transition>
</template>
