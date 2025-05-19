import { Nodes } from "mdast"
import { QuartzTransformerPlugin } from "../types"
import { CONTINUE, visit } from "unist-util-visit"

const remarkDiceRolls = () => {
  return (tree: Nodes) => {
    visit(tree, (node) => {
      if (node.type !== "inlineCode") {
        return CONTINUE
      } else {
        if (node.value.startsWith("dice:")) {
          Object.assign(node, {
            type: "html",
            value: `<dice-roller formula="${node.value.slice(5)}"></dice-roller>`,
          })
        }
      }
    })
  }
}

export const DiceRolls: QuartzTransformerPlugin = () => {
  return {
    name: "DiceRolls",
    markdownPlugins() {
      return [remarkDiceRolls]
    },
  }
}
