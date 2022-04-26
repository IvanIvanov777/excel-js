import { DomListener } from './DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribers = []

    this.prepare()
  }

  // vuejs style
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  prepare() { }

  toHTML() {
    return ``
  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.unsubscribers.forEach(unsub => unsub())
    this.removeDOMListeners()
  }
}
