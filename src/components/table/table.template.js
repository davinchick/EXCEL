const CODES = {
  A: 65,
  Z: 90
}

function toCell(){
  return `
    <div class="cell" contenteditable="true"></div>
  `
}

function createCol(el){
  return `
    <div class="column">${el}</div>
  `
}

function createRow(ind, content){
  return `
    <div class="row">
        <div class="row-info">${ind ? ind : ''}</div>    
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
      .map(toCell)
      .join('')

    allRows.push(createRow(i + 1, cells))
  }

  return allRows.join('')
}