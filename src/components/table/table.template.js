import { defaultStyles } from '../../constants'
import { parse } from '../../core/parse'
import { toInlineStyles } from '../../core/utils'

/* eslint-disable space-before-function-paren */
const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}
function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function toCell(state, row) {
  return function (_, col) {
    const id = `${row}:${col}`
    const cellData = state.dataState[id] || ''
    const width = getWidth(state.colState, col)
    // SOLUTION  19
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]
    })
    return `
    <div 
      class="cell" 
      data-col="${col}"
      data-type="cell" 
      data-id="${id}"
      data-value="${cellData || ''}"
      style="${styles}; width:${width}"  
      contenteditable 
    >${parse(cellData)}</div>`
  }
}


function toColumn({ col, index, width }) {
  return `
  <div 
    class="column" 
    data-type="resizable" 
    data-col="${index}"
    style="width:${width}"
  >
    ${col}
    <div class="col-resize" data-resize="col"></div>
  </div>`
}

function createRow(content, index = '', state) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  const height = getHeight(state, index)
  return `
    <div 
      class="row"
      data-type="resizable"
      data-row="${index}"
      style="height:${height}"
    >
      <div class="row-info">
        ${index}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}


function withWidthFrom(state) {
  return function (col, index) {
    return {
      col, index, width: getWidth(state.colState, index)
    }
  }
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const colsHeader = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(withWidthFrom(state))
    .map(toColumn)
    .join('')

  rows.push(createRow(colsHeader, '', {}))


  for (let row = 0; row < rowsCount; row++) {
    const cols = new Array(colsCount)
      .fill('')
      .map(toCell(state, row))
      .join('')

    rows.push(createRow(cols, row + 1, state.rowState))
  }

  return rows.join('')
}
