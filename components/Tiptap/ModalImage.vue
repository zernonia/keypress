<script setup lang="ts">
import type { Editor } from "@tiptap/core"
import { PropType } from "vue"

const props = defineProps({
  show: Boolean,
  editor: Object as PropType<Editor>,
})
const isVisible = ref(props.show)

const alt = ref("")
const image = ref("")
const isLoading = ref(false)

const save = async () => {
  if (!image.value) return
  isLoading.value = true

  props.editor
    .chain()
    .focus()
    .setImage({
      src: image.value,
      alt: alt.value,
    })
    .run()

  isLoading.value = false
  isVisible.value = false
}

watch(isVisible, () => {
  if (!isVisible.value) {
    const editorEl = document.querySelector(".content .ProseMirror") as HTMLDivElement
    if (editorEl) editorEl.focus()
  }
})
</script>

<template>
  <Modal v-model:open="isVisible">
    <div class="flex flex-col p-6">
      <h2 class="text-3xl font-bold">Add image</h2>

      <div class="my-6">
        <Upload v-model="image"></Upload>

        <div class="mt-4 flex items-center">
          <input type="text" name="alt-name" id="alt-name" placeholder="alternate" v-model="alt" />
        </div>
      </div>

      <div class="flex justify-end">
        <Button class="btn-primary ml-2" :loading="isLoading" @click="save">Save</Button>
        <button class="btn-plain" @click="isVisible = false">Cancel</button>
      </div>
    </div>
  </Modal>
</template>
