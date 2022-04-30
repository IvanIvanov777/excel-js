// import { ExcelComponent } from '../../core/ExcelComponent';
import { createToolbar } from './toolbar.template';
import { $ } from '../../core/dom'
import { ExcelStateComponent } from '../../core/ExcelStateComponent';
import { defaultStyles } from '../../constants';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    })
  }

  prepare() {
    this.initState(defaultStyles)
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles)
    // console.log(changes);
  }

  onClick(e) {
    const $target = $(e.target)
    // console.log('event', $target);
    if ($target.data.type === 'button') {
      console.log($target.data.value)
      const value = JSON.parse($target.data.value)
      this.$emit('toolbar:applyStyle', value)
      // const key = Object.keys(value)[0]
      // this.setState({ [key]: value[key] })
      // // console.log(this.state)
    }
  }
}
