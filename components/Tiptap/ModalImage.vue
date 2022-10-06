<script setup lang="ts">
import type { Editor } from "@tiptap/core"
import { PropType } from "vue"

const props = defineProps({
  show: Boolean,
  editor: Object as PropType<Editor>,
})
const open = ref(props.show)

const inputEl = ref<HTMLInputElement>()
onMounted(() => {
  inputEl.value.focus()
})

const save = () => {
  props.editor
    .chain()
    .focus()
    .setImage({
      src: "https://images.unsplash.com/photo-1664674842252-2361f75fa73b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      alt: "alt text",
    })
    .run()
  open.value = false
}

watch(open, () => {
  if (!open.value) {
    const editorEl = document.querySelector(".content .ProseMirror") as HTMLDivElement
    if (editorEl) editorEl.focus()
  }
})
</script>

<template>
  <Modal v-model:open="open">
    <div class="flex flex-col p-4">
      <h2>Add image</h2>

      <div class="my-6">
        <input ref="inputEl" accept="image/*" type="file" name="upload" id="upload" />
      </div>

      <div>
        <label for="alt-name">Alt name</label>
        <input type="text" name="alt-name" id="alt-name" />
      </div>

      <div>
        <button @click="save">Save</button>
      </div>
    </div>
  </Modal>
</template>
