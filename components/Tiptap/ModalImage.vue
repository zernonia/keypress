<script setup lang="ts">
import type { Editor } from "@tiptap/core"
import { PropType } from "vue"

const user = useSupabaseUser()
const client = useSupabaseClient()

const props = defineProps({
  show: Boolean,
  editor: Object as PropType<Editor>,
})
const isVisible = ref(props.show)

const { files, open: openFileDialog, reset } = useFileDialog({ accept: "image/*" })
const { base64 } = useBase64(computed(() => files.value?.item?.(0)))
const alt = ref("")

const isLoading = ref(false)
const save = async () => {
  if (!files.value?.item(0)) return
  isLoading.value = true
  const file = files.value.item(0)
  const { data } = await client.storage
    .from("posts")
    .upload(`${user.value.id}/${file.name}`, file, { cacheControl: "3600" })

  if (data.Key) {
    const { publicURL } = client.storage.from("posts").getPublicUrl(data.Key.replace("posts/", ""))

    props.editor
      .chain()
      .focus()
      .setImage({
        src: publicURL,
        alt: alt.value,
      })
      .run()
  }
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
        <div class="h-64 w-full bg-light-300 flex items-center justify-center rounded-2xl overflow-hidden">
          <img class="w-full h-full object-scale-down" :src="base64" v-if="base64" />
        </div>

        <div class="mt-4 flex items-center">
          <button accept="image/*" type="button" @click="openFileDialog()" class="btn-primary">Upload</button>
          <input type="text" class="ml-4" name="alt-name" id="alt-name" placeholder="alternate" v-model="alt" />
        </div>
      </div>

      <div class="flex justify-end">
        <button class="btn-plain" @click="isVisible = false">Cancel</button>
        <Button class="btn-primary ml-2" :loading="isLoading" @click="save">Save</Button>
      </div>
    </div>
  </Modal>
</template>
