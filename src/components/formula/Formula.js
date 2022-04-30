import { $ } from '../../core/dom';
import { ExcelComponent } from '../../core/ExcelComponent';

export class Formula extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options
    })
  }

  init() {
    super.init()
    this.$formula = this.$root.find('#formula')

    this.$on('table:select', $cell => {
      this.$formula.text($cell.data.value)
    })

    // this.$on('table:input', $cell => {
    //   this.$formula.text($cell.text())
    // })

    // this.$subscribe(state=>{
    //   this.$formula.text(state.currentText)
    // })

    // this.$subscribe(state => console.log('FormulaState', state))
  }

  static className = 'excel__formula'
  toHTML = () => `
    <div class="info">fx</div>
    <div id="formula" class="input" spellcheck="false" contenteditable>
  `

  storeChanged({ currentText }) {
    this.$formula.text(currentText)
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
  }
  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$emit('formula:done')
    }
  }
}
