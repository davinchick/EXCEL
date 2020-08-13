import { range } from "../../core/utils"

export function shouldResize(e) {
  return e.target.dataset.resize
}

export function isCell(event){
  return event.target.dataset.type === 'cell'
}

export function matrix(clicked, current){
  const cols = range(current.col, clicked.col)
  const rows = range(current.row, clicked.row)

  const ids = cols.reduce((acc, el) => {
    rows.forEach(elem => acc.push(`${el}:${elem}`))
    return acc
  }, [])
  return ids
}

export function nextSelector(key, {col, row}){
  const MIN_VAL = 0
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      col++
      break
    case 'ArrowLeft':
      col = col -1 < MIN_VAL ? MIN_VAL : col -1
      break
    case 'ArrowUp':
      row = row -1 < MIN_VAL ? MIN_VAL : row -1
      break
  }
  return `[data-id=${row}:${col}"]`
}