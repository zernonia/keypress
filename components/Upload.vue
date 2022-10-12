<script setup lang="ts">
const props = defineProps({
  modelValue: String,
})
const emits = defineEmits(["update:modelValue"])

const client = useSupabaseClient()
const user = useSupabaseUser()
const { files, open: openFileDialog, reset } = useFileDialog({ accept: "image/*" })

const { base64 } = useBase64(computed(() => files.value?.item?.(0)))
const imageSrc = ref(props.modelValue)

const isUploading = ref(false)
const upload = async (file: File) => {
  isUploading.value = true
  const filename = `${user.value?.id}/${file.name}`
  const { data, error } = await client.storage.from("posts").upload(filename, file, { cacheControl: "3600" })

  const { publicURL } = client.storage.from("posts").getPublicUrl(data?.Key?.replace("posts/", "") ?? filename)
  emits("update:modelValue", publicURL)
  isUploading.value = false
}

watch(files, async (n) => {
  if (n.length) {
    const file = n.item(0)
    upload(file)
  }
})
watch(base64, (n) => (imageSrc.value = n))
</script>

<template>
  <button
    :disabled="isUploading"
    accept="image/*"
    type="button"
    class="block w-full p-0 ring-3 ring-transparent hover:ring-gray-400 focus:ring-gray-400 rounded-2xl transition overflow-hidden"
    @click="openFileDialog()"
  >
    <div class="h-64 w-full bg-light-300 flex items-center justify-center">
      <img class="w-full h-full object-scale-down" :src="imageSrc" v-if="imageSrc" />
      <p v-else class="text-gray-400">Press 'Enter' to upload image</p>
    </div>
  </button>
</template>
