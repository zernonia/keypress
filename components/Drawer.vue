<script setup lang="ts">
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap"

const props = defineProps({ open: Boolean, confirmAction: Function })
const emits = defineEmits(["update:open"])
const el = ref()
onClickOutside(el, () => {
  emits("update:open", !props.open)
})
const { activate, deactivate } = useFocusTrap(el)

onKeyStroke("Escape", () => emits("update:open", false))

watch(
  () => props.open,
  (n) => nextTick(() => (n ? activate() : deactivate())),
  { immediate: true }
)
</script>

<template>
  <transition name="slide-in-right">
    <div v-if="open" class="fixed top-0 left-0 w-screen h-screen z-100 flex justify-end">
      <div ref="el" class="inner w-full max-w-112 ml-8 bg-white rounded-xl shadow-xl overflow-hidden">
        <slot>Content</slot>
      </div>
    </div>
  </transition>
</template>
