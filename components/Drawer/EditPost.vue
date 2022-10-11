<script setup lang="ts">
import { PropType } from "vue"

const props = defineProps({
  show: Boolean,
})
const emits = defineEmits(["update:show"])
const image = ref("")
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
        <label for="url">Cover image: </label>
        <Upload class="mt-4" v-model="image"></Upload>
      </div>

      <div class="mt-8">
        <label for="url">Tags: </label>
        <input class="mt-2" type="url" name="url" id="alt-name" placeholder="https://keypress.blog/og.png" />
      </div>

      <!-- <div class="mt-4">
        <Button class="btn-primary" @click="save">Save ⌘S</Button>
      </div> -->
    </div>
  </Drawer>
</template>
