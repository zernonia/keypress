<script setup lang="ts">
import type { Editor } from "@tiptap/core"
import { PropType } from "vue"

const props = defineProps({
  show: Boolean,
  editor: Object as PropType<Editor>,
})
const open = ref(props.show)

const save = () => {
  props.editor
    .chain()
    .focus()
    .setIframe({
      src: "https://supabase-schema.vercel.app/",
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
      <h2>Add iframe</h2>

      <div>
        <label for="url">Source url</label>
        <input type="url" name="url" id="alt-name" />
      </div>

      <div>
        <button @click="save">Save</button>
      </div>
    </div>
  </Modal>
</template>
