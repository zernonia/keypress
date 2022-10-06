import { Extension } from "@tiptap/core"
import Suggestion from "@tiptap/suggestion"

// ref: https://tiptap.dev/experiments/commands
export default Extension.create({
  name: "commands",

  addOptions() {
    return {
      suggestion: {
        char: "/",
        command: ({ editor, range, props }) => {
          props.command({ editor, range })
        },
      },
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        startOfLine: true,
        ...this.options.suggestion,
      }),
    ]
  },
})
