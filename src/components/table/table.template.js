const CODES = {
  A: 65,
  Z: 90
}

function toCell(row){
  return function(_, col) {
    return `
        <div class="cell" contenteditable="true" 
            data-row="${row}" 
            data-col="${col}"
            data-type="cell"
            data-id="${row}:${col}"></div>
    `
  }
}

function createCol(el, index){
  return `
    <div class="column" data-type="resizable" data-col="${index}">
        ${el}
        <div class="col-resize" data-resize="col"></div>    
    </div>
  `
}

function createRow(ind, content){
  const resize = ind ? `<div class="row-resize" data-resize="row">` : ''
  return `
    <div class="row" data-type="resizable">
        <div class="row-info">
          ${ind ? ind : ''}
          ${resize}
          <div class="row-resize">
        </div>    
        <div class="row-data">${content}</div>    
    </div>
  `
}

function toChar(_, ind){
  return String.fromCharCode(CODES.A + ind)
}

export function createTable(rows = 15){
  const cols = CODES.Z - CODES.A + 1
  const allRows = []
  const allCols = new Array(cols).fill('')
    .map(toChar)
    .map(createCol)
    .join('')
  allRows.push(createRow(null, allCols))

  for (let i=0; i<rows; i++){
    const cells = new Array(cols).fill('')
      .map(toCell(i))
      .join('')

    allRows.push(createRow(i + 1, cells))
  }

  return allRows.join('')
}