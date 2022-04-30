import { DomListener } from './DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.store = options.store
    this.unsubscribers = []
    this.subscribe = options.subscribe || []
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

  $dispatch(action) {
    this.store.dispatch(action)
  }

  // $subscribe(fn) {
  //   this.storeSub = this.store.subscribe(fn)
  // }

  storeChanged() {
    // console.log('TEST');
  }

  isWatching(key) {
    return this.subscribe.includes(key)
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
    // this.storeSub.unsubscribe()
  }
}
