<script lang="ts" setup>
import { useEditor, EditorContent } from "@tiptap/vue-3"
import Document from "@tiptap/extension-document"
import Text from "@tiptap/extension-text"
import Heading from "@tiptap/extension-heading"
import Placeholder from "@tiptap/extension-placeholder"
import Focus from "@tiptap/extension-focus"

const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits(["update:modelValue"])

const CustomDocument = Document.extend({
  content: "heading",
})
const editor = useEditor({
  content: props.modelValue ?? "",
  extensions: [
    CustomDocument,
    Text,
    Heading,
    Focus,
    Placeholder.configure({
      placeholder: "What’s the title?",
    }),
  ],
  autofocus: true,
  onUpdate(props) {
    emit("update:modelValue", props.editor.getJSON().content?.[0].content?.[0].text)
  },
})

watch(
  () => props.modelValue,
  (newValue) => {
    const title = editor.value.getJSON().content?.[0].content?.[0].text
    const isSame = title === newValue
    if (isSame) return

    editor.value.commands.setContent(newValue, false)
  }
)

whenever(
  editor,
  () => {
    editor.value?.commands.focus()
  },
  { immediate: true }
)
</script>

<template>
  <EditorContent :editor="editor" />
</template>
