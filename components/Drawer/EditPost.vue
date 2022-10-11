<script setup lang="ts">
import { PropType } from "vue"

const props = defineProps({
  show: Boolean,
  settings: Object as PropType<{
    image: string
    active: boolean
    tags: string[]
  }>,
})
const emits = defineEmits(["update:show"])
const { settings } = toRefs(props)

watch(
  () => props.show,
  () => {
    if (!props.show) {
      const editorEl = document.querySelector(".content .ProseMirror") as HTMLDivElement
      if (editorEl) editorEl.focus()
    }
  }
)
</script>

<template>
  <Drawer :open="show" @update:open="emits('update:show', $event)">
    <div class="flex flex-col px-4 py-12">
      <h2 class="text-3xl font-bold">Settings</h2>
      <div class="mt-8">
        <Toggle class="mt-4" v-model="settings.active">Publish</Toggle>
      </div>

      <div class="mt-8">
        <label for="url">Cover image: </label>
        <Upload class="mt-4" v-model="settings.image"></Upload>
      </div>

      <div class="mt-8">
        <label for="url">Tags: </label>
        <TagsInput class="mt-4" v-model="settings.tags"></TagsInput>
      </div>
    </div>
  </Drawer>
</template>
