const CODES = {
  'A': 65,
  'Z': 90,
}

function createRow(content, row = '') {
  return `
    <div class="row">
       <div class="row-info">${row}</div>
       <div class="row-data">
           ${content}
       </div>
    </div>
  `
}

function createCol(col) {
  return `<div class="column">${col}</div>`
}

function createCell() {
  return `<div class="cell"></div>`
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
      .map(createCol)
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
