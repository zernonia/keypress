import { Extension } from "@tiptap/core"
import ModalImage from "~~/components/Tiptap/ModalImage.vue"
import ModalIframe from "~~/components/Tiptap/ModalIframe.vue"
import { createApp } from "vue"

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    upload: {
      openModal: (type: "image" | "iframe") => ReturnType
    }
  }
}

export default Extension.create({
  name: "upload",

  addCommands() {
    return {
      openModal:
        (type: "image" | "iframe") =>
        ({ commands, editor }) => {
          let component: typeof ModalImage

          switch (type) {
            case "image": {
              component = ModalImage
              break
            }
            case "iframe": {
              component = ModalIframe
              break
            }
          }
          if (!component) return

          const instance = createApp(component, {
            show: true,
            editor,
          }).mount("#modal")

          return !!instance
        },
    }
  },
})
