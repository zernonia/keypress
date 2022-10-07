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

const inputEl = ref<HTMLInputElement>()
onMounted(() => {
  inputEl.value.focus()
})
const { files, open: openFileDialog, reset } = useFileDialog({ accept: "image/*" })
const { base64 } = useBase64(computed(() => files.value?.item?.(0)))

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
        alt: "alt text",
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
    <div class="flex flex-col p-4">
      <h2>Add image</h2>

      <div class="my-6">
        <img class="h-64 w-auto m-auto object-contain" :src="base64" v-if="base64" />

        <button ref="inputEl" accept="image/*" type="button" @click="openFileDialog()" class="btn-primary">
          Upload
        </button>
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
