<script setup lang="ts">
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap"

const props = defineProps({ open: Boolean, confirmAction: Function, innerClass: String })
const emits = defineEmits(["update:open"])
const el = ref()
onClickOutside(el, () => {
  emits("update:open", !props.open)
})
const { activate, deactivate } = useFocusTrap(el, { immediate: true })

onKeyStroke("Escape", () => emits("update:open", false))

watch(
  () => props.open,
  (n) => nextTick(() => (n ? activate() : deactivate()))
)
</script>

<template>
  <transition name="command-dialog">
    <div v-if="open" class="fixed top-0 left-0 w-screen h-screen z-300 flex items-center justify-center">
      <div
        ref="el"
        class="inner w-full mx-4 max-w-112 bg-white rounded-2xl shadow-xl overflow-hidden"
        :class="innerClass"
      >
        <slot>Content</slot>
      </div>
    </div>
  </transition>
</template>
