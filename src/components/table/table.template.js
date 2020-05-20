const CODES = {
  'A': 65,
  'Z': 90,
}

function createRow(content, row = '') {
  const resize = row ? `<div class="row-resize" data-resize="row"></div>` : ''
  return `
    <div class="row" data-type="resizable">
       <div class="row-info" ">${row}
        ${resize}
       </div>
       <div class="row-data">
           ${content}
       </div>
    </div>
  `
}

function createColumn(col, idx) {
  return `<div class="column" data-type="resizable" data-col="${idx}">
           ${col}
           <div class="col-resize" data-resize="col"></div>
         </div>`
}

function createCell(_, col) {
  return `<div class="cell" data-col=${col}></div>`
}

function toChar(_, idx) {
  return String.fromCharCode(CODES.A + idx)
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(createColumn)
      .join('')

  const cells = new Array(colsCount)
      .fill('')
      .map(createCell)
      .join('')

  rows.push(createRow(cols))
  for (let row = 1; row <= rowsCount; row++) {
    rows.push(createRow(cells, row))
  }

  return rows.join('');
}
