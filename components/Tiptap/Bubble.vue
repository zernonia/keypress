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
    <div v-if="nodeType === 'text'">
      <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
        bold
      </button>
      <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
        italic
      </button>
      <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
        strike
      </button>
      <button
        @click="editor.chain().focus().toggleUnderline().run()"
        :class="{ 'is-active': editor.isActive('underline') }"
      >
        underline
      </button>
    </div>

    <div v-if="nodeType === 'image'">
      <button @click="editor.commands.openModal('image')">Edit</button>
    </div>
    <div v-if="nodeType === 'iframe'">
      <button @click="editor.commands.openModal('iframe')">Edit</button>
      <button>Focus</button>
    </div>
  </BubbleMenu>
</template>
