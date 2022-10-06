<script lang="ts" setup>
import { useEditor, EditorContent } from "@tiptap/vue-3"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Image from "@tiptap/extension-image"

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
}>()
const emit = defineEmits(["update:modelValue"])

const editor = useEditor({
  content: props.modelValue ?? "",
  extensions: [
    Link,
    StarterKit,
    Image,
    Underline,
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
  @apply p-2;
}

.prose pre {
  background: #0d0d0d;
  color: #fff;
  font-family: "JetBrainsMono", monospace;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
}
.ProseMirror .is-empty::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}

.hljs-comment,
.hljs-quote {
  color: #616161;
}

.hljs-variable,
.hljs-template-variable,
.hljs-attribute,
.hljs-tag,
.hljs-name,
.hljs-regexp,
.hljs-link,
.hljs-name,
.hljs-selector-id,
.hljs-selector-class {
  color: #f98181;
}

.hljs-number,
.hljs-meta,
.hljs-built_in,
.hljs-builtin-name,
.hljs-literal,
.hljs-type,
.hljs-params {
  color: #fbbc88;
}

.hljs-string,
.hljs-symbol,
.hljs-bullet {
  color: #b9f18d;
}

.hljs-title,
.hljs-section {
  color: #faf594;
}

.hljs-keyword,
.hljs-selector-tag {
  color: #70cff8;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: 700;
}
</style>
