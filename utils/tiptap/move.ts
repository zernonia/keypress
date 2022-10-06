import { CommandProps, Editor, Extension } from "@tiptap/core"
import { findParentNodeOfType } from "prosemirror-utils"
import { EditorState, NodeSelection, Selection, TextSelection } from "prosemirror-state"
import { Fragment, NodeType, Slice } from "prosemirror-model"
import { ReplaceStep } from "prosemirror-transform"

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    move: {
      moveParent: (direction: "up" | "down") => ReturnType
    }
  }
}

// ref: https://github.com/bangle-io/bangle.dev/blob/960fb4706a953ef910a9ddf2d80a7f10bdd2921b/core/core-commands.js#L101

function arrayify(x: any) {
  if (x == null) {
    throw new Error("undefined value passed")
  }
  return Array.isArray(x) ? x : [x]
}
function mapChildren(node: any, callback: any) {
  const array = []
  for (let i = 0; i < node.childCount; i++) {
    array.push(callback(node.child(i), i, node instanceof Fragment ? node : node.content))
  }

  return array
}

const moveNode = (type: NodeType, dir: "up" | "down") => {
  const isDown = dir === "down"
  return (state: EditorState, dispatch: any) => {
    // @ts-ignore  (node) only exist in custom element. eg: image, iframe
    const { $from, node } = state.selection

    const currentResolved = findParentNodeOfType(type)(state.selection) ?? {
      depth: 1,
      node,
      pos: 34,
      start: 34,
    }

    if (!currentResolved.node) {
      return false
    }

    const { node: currentNode } = currentResolved
    const parentDepth = currentResolved.depth - 1
    const parent = $from.node(parentDepth)
    const parentPos = $from.start(parentDepth)

    if (currentNode.type !== type) {
      return false
    }

    const arr = mapChildren(parent, (node) => node)

    let index = arr.indexOf(currentNode)

    let swapWith = isDown ? index + 1 : index - 1

    // If swap is out of bound
    if (swapWith >= arr.length || swapWith < 0) {
      return false
    }

    const swapWithNodeSize = arr[swapWith].nodeSize
    ;[arr[index], arr[swapWith]] = [arr[swapWith], arr[index]]

    let tr = state.tr
    let replaceStart = parentPos
    let replaceEnd = $from.end(parentDepth)

    const slice = new Slice(Fragment.fromArray(arr), 0, 0) // the zeros  lol -- are not depth they are something that represents the opening closing
    // .toString on slice gives you an idea. for this case we want them balanced
    tr = tr.step(new ReplaceStep(replaceStart, replaceEnd, slice, false))

    tr = tr.setSelection(
      Selection.near(tr.doc.resolve(isDown ? $from.pos + swapWithNodeSize : $from.pos - swapWithNodeSize))
    )
    if (dispatch) {
      dispatch(tr.scrollIntoView())
    }
    return true
  }
}

export default Extension.create({
  name: "move",

  addCommands() {
    return {
      moveParent:
        (direction: "up" | "down") =>
        ({ editor, state, dispatch, ...a }) => {
          // @ts-ignore  (node) only exist in custom element. eg: image, iframe
          const type = editor.state.selection.node?.type ?? editor.state.selection.$head.parent.type
          return moveNode(type, direction)(state, dispatch)
        },
    }
  },

  addKeyboardShortcuts() {
    return {
      "Alt-ArrowUp": () => this.editor.commands.moveParent("up"),
      "Alt-ArrowDown": () => this.editor.commands.moveParent("down"),
    }
  },
})
