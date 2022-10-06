import { Extension } from "@tiptap/core"
import Code from "@tiptap/extension-code"
import CodeBlock from "@tiptap/extension-code-block"
import CodeBlockLowLight from "@tiptap/extension-code-block-lowlight"
import { lowlight } from "lowlight"

import css from "highlight.js/lib/languages/css"
import js from "highlight.js/lib/languages/javascript"
import ts from "highlight.js/lib/languages/typescript"
import html from "highlight.js/lib/languages/xml"

// ref: https://tiptap.dev/experiments/commands

lowlight.registerLanguage("html", html)
lowlight.registerLanguage("css", css)
lowlight.registerLanguage("js", js)
lowlight.registerLanguage("ts", ts)

export default Extension.create({
  name: "code",
  addExtensions() {
    return [
      Code,
      CodeBlock,
      CodeBlockLowLight.configure({
        lowlight,
      }),
    ]
  },
})
