<script lang="ts" setup>
import { useEditor, EditorContent } from "@tiptap/vue-3"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Image from "@tiptap/extension-image"
import Focus from "@tiptap/extension-focus"

import Commands from "~~/utils/tiptap/commands"
import suggestion from "~~/utils/tiptap/suggestion"
import HardBreak from "~~/utils/tiptap/hardbreak"
import Code from "~~/utils/tiptap/code"
import Link from "~~/utils/tiptap/link"
import Placeholder from "~~/utils/tiptap/placeholder"
import Upload from "~~/utils/tiptap/upload"
import Iframe from "~~/utils/tiptap/iframe"
import Move from "~~/utils/tiptap/move"

const props = defineProps<{
  modelValue: string
  editable?: boolean
}>()
const emit = defineEmits(["update:modelValue"])

const editor = useEditor({
  content: props.modelValue ?? "",
  extensions: [
    Link,
    StarterKit,
    Image,
    Underline,
    Focus,
    Upload,
    HardBreak,
    Code,
    Placeholder,
    Iframe,
    Move,
    Commands.configure({
      suggestion,
    }),
  ],
  editable: props.editable ?? false,
  onUpdate(props) {
    emit("update:modelValue", props.editor.getHTML())
  },
})

watch(
  () => props.modelValue,
  (newValue) => {
    const isSame = editor.value.getHTML() === newValue
    if (isSame) return

    editor.value.commands.setContent(newValue, false)
  }
)
</script>

<template>
  <div>
    <TiptapBubble :editor="editor"></TiptapBubble>
    <EditorContent class="content" :editor="editor" />
  </div>
</template>

<style lang="postcss">
.ProseMirror {
  @apply p-2 focus:outline-none;
}

.ProseMirror .is-empty::before {
  content: attr(data-placeholder);
  float: left;
  pointer-events: none;
  height: 0;
  @apply text-gray-300;
}

@keyframes highlight {
  0% {
    @apply bg-light-700;
  }
  100% {
    @apply bg-transparent;
  }
}

.has-focus {
  animation: highlight 0.75s ease-out;
  @apply rounded;
}
</style>
