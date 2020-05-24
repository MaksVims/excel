function toButton(button) {
  const meta =
          `data-type ="button"
          data-value='${JSON.stringify(button.value)}'
          `;
  return `<div 
          class="button 
          ${button.active ? 'active' : ''}
          ${meta}
          ">
             <span class="material-icons" ${meta}>${button.name}</span>
          </div>`
}

export function createToolbar(s) {
  const buttons = [
    {
      name: 'format_align_left',
      active: s['textAlign'] === 'left',
      value: {textAlign: 'left'}
    },
    {
      name: 'format_align_center',
      active: s['textAlign'] === 'center',
      value: {textAlign: 'center'}
    },
    {
      name: 'format_align_right',
      active: s['textAlign'] === 'right',
      value: {textAlign: 'right'}
    },
    {
      name: 'format_bold',
      active: s['fontWeight'] === 'bold',
      value: {fontWeight: s['fontWeight'] === 'bold' ? 'normal' : 'bold'}
    },
    {
      name: 'format_italic',
      active: s['fontStyle'] === 'italic',
      value: {fontStyle: s['fontStyle'] === 'italic' ? 'normal' : 'italic'}
    },
    {
      name: 'format_underline',
      active: s['textDecoration'] === 'underline',
      value: {
        textDecoration: s['textDecoration'] === 'underline' ?
          'normal' : 'underline'
      }
    }
  ]
  return buttons.map(toButton).join('');
}
