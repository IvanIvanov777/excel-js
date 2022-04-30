export class TableSelection {
  static className = 'selected'
  constructor() {
    this.group = []
    this.current = null
  }

  select($el) {
    this.clear()
    $el.focus().addClass(TableSelection.className)
    this.group.push($el)
    this.current = $el
  }

  get selectedIds() {
    return this.group.map($el => $el.id())
  }


  clear() {
    this.group.forEach($el => $el.removeClass(TableSelection.className))
    this.group = []
  }
  selectGroup($els = []) {
    this.clear()
    this.group = $els
    this.group.forEach($el => $el.addClass(TableSelection.className))
  }

  applyStyle(style) {
    this.group.forEach($el => $el.css(style))
  }
}


