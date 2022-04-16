import { ExcelComponent } from '../../core/ExcelComponent';

export class Formula extends ExcelComponent {
  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click']
    })
  }

  static className = 'excel__formula'
  toHTML = () => `
    <div class="info">fx</div>
    <div class="input" spellcheck="false" contenteditable>

  `

  onInput(event) {
    console.log(this.$root);
    // console.log(event.target.textContent);
    console.log('Formula', event.target.textContent.trim());
  }

  onClick() { }
}
