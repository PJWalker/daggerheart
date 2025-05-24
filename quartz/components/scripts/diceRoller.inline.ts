import { DiceRoll } from "@dice-roller/rpg-dice-roller"

const TEMPLATE = `<span class="formula"></span><span class="result"></span>`

class DiceRoller extends HTMLElement {
  roller?: DiceRoll
  formula?: string
  static observedAttributes = ["formula"]
  shadow?: ShadowRoot
  constructor() {
    super()
  }
  connectedCallback() {
    this.formula = this.getAttribute("formula")!.trim() as string
    this.shadow = this.attachShadow({ mode: "open" })
    this.shadow.innerHTML = TEMPLATE
    this.roller = new DiceRoll(this.formula);
    const formulaSpan = this.shadow.querySelector(".formula") as HTMLElement
    const rollSpan = this.shadow.querySelector(".result") as HTMLSpanElement
    formulaSpan.innerHTML = this.formula
    this.onclick = () => {
      this.roller.roll()
      rollSpan.innerHTML = `: <span class="number">${this.roller.total}</span> ↺`
    }
  }
  attributeChangedCallback(_:any, __:any, newValue:string) {
    this.formula = newValue.trim()
    this.roller = new DiceRoll(this.formula)
    const formulaSpan = this.shadow.querySelector(".formula") as HTMLElement
    formulaSpan.innerHTML = this.formula
  }
}
customElements.define("dice-roller", DiceRoller)
