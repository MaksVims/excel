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

function createCell(row) {
  return function(_, col) {
    return `
        <div  
          class="cell"  
          data-col=${col} 
          data-id=${row}:${col} 
          data-type="cell"
          contenteditable>11
        </div>`
  }
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


  rows.push(createRow(cols))
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(createCell(row))
        .join('')
    rows.push(createRow(cells, row + 1))
  }

  return rows.join('');
}
