const CODES = {
  'A': 65,
  'Z': 90,
}
const DEFAULT_WIDTH_COLUMN = 120
const DEFAULT_HEIGHT_ROW = 40

function createRow(content, row = '', height) {
  const resize = row ? `<div class="row-resize" data-resize="row"></div>` : ''
  return `
    <div 
    class="row" 
    data-type="resizable" 
    data-row="${row}" 
    style="height: ${height}"
    >
         <div class="row-info" ">${row}
          ${resize}
         </div>
         <div class="row-data">
             ${content}
         </div>
    </div>
  `
}

function createColumn({ch, width, col}) {
  return `<div 
            class="column" 
            data-type="resizable" 
            data-col="${col}" 
            style="width:${width}">     
            ${ch}
            <div class="col-resize" data-resize="col"></div>
         </div>`
}

function createCell(row) {
  return function({col, width, state}) {
    const id = `${row}:${col}`;
    const data = state[id] || ''
    return `
        <div  
          class="cell"  
          data-col=${col} 
          data-id=${row}:${col} 
          style="width:${width}"     
          data-type="cell"
          contenteditable>${data}
        </div>`
  }
}

function toChar(_, idx) {
  return String.fromCharCode(CODES.A + idx)
}

function getWidth(state, col) {
  return (state[col] || DEFAULT_WIDTH_COLUMN) + 'px'
}

function getHeight(state, row) {
  return (state[row] || DEFAULT_HEIGHT_ROW) + 'px'
}

function withWidthFrom(state) {
  return function(ch, col) {
    return {
      ch, col, width: getWidth(state.colState, col), state: state.dataState
    }
  }
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(createColumn)
      .join('')

  rows.push(createRow(cols))
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(withWidthFrom(state))
        .map(createCell(row))
        .join('')
    rows.push(createRow(cells, row + 1, getHeight(state.rowState, row + 1)))
  }

  return rows.join('');
}
