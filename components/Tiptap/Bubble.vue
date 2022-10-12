<script setup lang="ts">
// bubble menu: https://tiptap.dev/api/extensions/bubble-menu
import { BubbleMenu } from "@tiptap/vue-3"
import { PropType } from "vue"
import type { Editor } from "@tiptap/core"
import type { NodeSelection } from "prosemirror-state"
import { TextSelection } from "prosemirror-state"

const props = defineProps({
  editor: Object as PropType<Editor>,
})

type NodeType = "image" | "text" | "video" | "iframe"
const nodeType = computed<NodeType | undefined>(() => {
  const selection = props.editor.state.selection as NodeSelection
  const isImage = selection.node?.type.name === "image"
  const isIframe = selection.node?.type.name === "iframe"
  const isText = selection instanceof TextSelection
  if (isImage) return "image"
  if (isIframe) return "iframe"
  if (isText) return "text"
  return undefined
})
</script>

<template>
  <BubbleMenu :editor="editor" :tippy-options="{ duration: 100 }" v-if="editor">
    <div class="p-2 rounded-xl shadow-md bg-white">
      <div v-if="nodeType === 'text'" class="flex items-center space-x-1 text-xl text-gray-400">
        <button
          class="bubble-item"
          @click="editor.chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
        >
          <div class="i-ic-round-format-bold"></div>
        </button>
        <button
          class="bubble-item"
          @click="editor.chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
        >
          <div class="i-ic-round-format-italic"></div>
        </button>
        <button
          class="bubble-item"
          @click="editor.chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
        >
          <div class="i-ic-round-format-strikethrough"></div>
        </button>
        <button
          class="bubble-item"
          @click="editor.chain().focus().toggleUnderline().run()"
          :class="{ 'is-active': editor.isActive('underline') }"
        >
          <div class="i-ic-round-format-underlined"></div>
        </button>
      </div>

      <div v-if="nodeType === 'image'">
        <button class="bubble-item" @click="editor.commands.openModal('image')">Edit</button>
      </div>
      <div v-if="nodeType === 'iframe'">
        <button class="bubble-item" @click="editor.commands.openModal('iframe')">Edit</button>
        <button>Focus</button>
      </div>
    </div>
  </BubbleMenu>
</template>

<style lang="postcss">
.bubble-item {
  @apply focus:bg-light-500 focus:text-dark-300 p-1 rounded-lg transition;
}
.is-active {
  @apply !text-dark-300;
}
</style>
