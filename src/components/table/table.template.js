const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getHeight(state, index) {
  return state[index] || DEFAULT_HEIGHT + 'px'
}

function getWidth(state, index) {
  return state[index] || DEFAULT_WIDTH + 'px'
}

function toCell(state, row){
  return function(_, col) {
    const id = `${row}:${col}`
    const data = state.dataState[id]
    return `
        <div class="cell" contenteditable="true" 
            data-row="${row}" 
            data-col="${col}"
            data-type="cell"
            data-id="${id}"
            style="width: ${getWidth(state.colState, col)}">
            ${data || ''}</div>
    `
  }
}

function createCol({el, index, width}){
  return `
    <div class="column" data-type="resizable" data-col="${index}" style="width:${width}">
        ${el}
        <div class="col-resize" data-resize="col"></div>    
    </div>
  `
}

function createRow(ind, content, state){
  const resize = ind ? `<div class="row-resize" data-resize="row">` : ''
  const height = getHeight(state, index)
  return `
    <div class="row" data-type="resizable" 
      data-row="${ind}" style="height: ${height}">
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

function widthFrom(state){
  return function(col, index){
    return {
      col, index, width: getWidth(state.colState, index)
    }
  }
}

export function createTable(rows = 15, state = {}){
  
  const cols = CODES.Z - CODES.A + 1
  const allRows = []
  const allCols = new Array(cols).fill('')
    .map(toChar)
    .map(widthFrom(state))
    .map(createCol)
    .join('')
  allRows.push(createRow(null, allCols, {}))

  for (let i=0; i<rows; i++){
    const cells = new Array(cols).fill('')
      .map(toCell(state, i))
      .join('')

    allRows.push(createRow(i + 1, cells, state.rowState))
  }

  return allRows.join('')
}