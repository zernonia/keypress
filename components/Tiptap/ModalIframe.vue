<script setup lang="ts">
import type { Editor } from "@tiptap/core"
import { PropType } from "vue"

const props = defineProps({
  show: Boolean,
  editor: Object as PropType<Editor>,
})
const open = ref(props.show)

const url = ref("")
const save = () => {
  if (!url.value?.match(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi)) return

  props.editor
    .chain()
    .focus()
    .setIframe({
      src: url.value,
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
    <div class="flex flex-col p-6">
      <h2 class="text-3xl font-bold">Add iframe</h2>

      <div class="flex items-center my-6">
        <label for="url" class="mr-4 flex-shrink-0">URL :</label>
        <input type="url" name="url" id="url" placeholder="https://supabase.com" v-model="url" />
      </div>

      <div class="flex justify-end">
        <button class="btn-plain" @click="open = false">Cancel</button>
        <Button class="btn-primary ml-2" @click="save">Save</Button>
      </div>
    </div>
  </Modal>
</template>
