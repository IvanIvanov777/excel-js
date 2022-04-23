import { $ } from '../../core/dom'

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const typeResize = $resizer.data.resize
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const sideProp = typeResize === 'col' ? 'bottom' : 'right'
  $resizer.css({ opacity: 1, [sideProp]: '-5000px' })
  let value

  document.onmousemove = e => {
    if (typeResize === 'col') {
      const delta = e.pageX - coords.right
      value = coords.width + delta
      $resizer.css({ right: -delta + 'px' })
    } else {
      const delta = e.pageY - coords.bottom
      value = coords.height + delta
      $resizer.css({ bottom: -delta + 'px' })
    }
    document.onmouseup = e => {
      document.onmousemove = null
      document.onmouseup = null
      $resizer.css({ opacity: 0, bottom: 0, right: 0 })
      if (typeResize === 'col') {
        $parent.css({ width: value + 'px' })
        $root.findAll(`[data-col="${$parent.data.col}"]`)
          .forEach(item => {
            item.style.width = value + 'px'
          })
      } else {
        $parent.css({ height: value + 'px' })
      }
    }
  }
}
