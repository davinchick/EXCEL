import { $ } from "../../core/dom"

export function tableResizeHandles($root, e) {
  return new Promise( resolve => {
    
    const $target = $(e.target)
    const $parent = $target.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const type = $target.data.resize
    const side = type === 'col' ? 'bottom' : 'right'
    let value;
    $target.css({
      opacity: 1,
      [side]: '-5000px'
    })

    document.onmousemove = event => {
      if(type === 'col') {
        const delta = e.pageX - coords.right
        value = coords.width + delta
        $target.css({
          right: -delta + 'px',
          bottom: '-5000px'
        })
      } else {
        const delta = event.pageY - coords.bottom
        value = coords.height + delta
        $target.css({
          bottom: -delta + 'px'
        })
      }
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
      if(type === 'col'){
        $parent.css({
          width: value + 'px'
        })
        $root.findAll(`[data-col="${$parent.data.col}"]`)
          .forEach(el => el.style.width = value + 'px')
      } else {
        $parent.css({
          height: value + 'px'
        })
      }

      resolve({
        value,
        type,
        // id: type === 'col' ? $parent.data.col : $parent.data.row
        id: $parent.data[type]
      })

      $target.css({
        opacity: 0,
        bottom: 0,
        right: 0,
      })
    }
  })
}