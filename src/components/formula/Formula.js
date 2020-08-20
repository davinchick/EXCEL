import { ExcelComponent } from "../../core/ExcelComponent"
import { $ } from "../../core/dom"

export class Formula extends ExcelComponent{
  static className = "excel__formula";

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
        ...options
    });
  }

  toHTML  (){
    return `
        <div class="info">fx</div>
        <div id="formula" class="input" contenteditable="true" spellcheck="false"></div>
    `;
  }

  init(){
    super.init()
    this.formula = this.$root.find('#formula')

    this.$on('tableSelect', $cell => {
      this.formula.text($cell.text())
    })
  }

  storeChanged(changes){
    this.formula.text(changes)
  }

  onInput(e){
    const text = $(e.target)
    this.$emit('formula: input', text.text())
  }

  onKeydown(e){
    const keys = ['Enter', 'Tab']
    if(keys.includes(e.key)){
      e.preventDefault()
      this.$emit('formula:done')
    }
  }
}