import { Extension } from "@tiptap/core"

export default Extension.create({
  addKeyboardShortcuts() {
    // copied from tiptap
    const defaultHandler = () =>
      this.editor.commands.first(({ commands }) => [
        () => commands.newlineInCode(),
        () => commands.createParagraphNear(),
        () => commands.liftEmptyBlock(),
        () => commands.splitListItem("listItem"),
        () => commands.splitBlock(),
      ])

    const shiftEnter = () => {
      return this.editor.commands.first(({ commands }) => [
        () => commands.newlineInCode(),
        () => commands.createParagraphNear(),
      ])
    }

    const modEnter = () => {
      return this.editor.commands.first(({ commands }) => [
        () => commands.newlineInCode(),

        (a) => {
          commands.selectTextblockEnd()
          return commands.createParagraphNear()
        },
      ])
    }

    return {
      Enter: defaultHandler,
      "Shift-Enter": shiftEnter,
      "Mod-Enter": modEnter,
    }
  },
})
