import {$} from '@core/dom';

export function resizeHandler(event, $root) {
  const $resizer = $(event.target);
  const type = $resizer.data.resize;
  const $parent = $resizer.closest('[data-type="resizable"');
  const coords = $parent.getCoords();
  const sideProp = type === 'col' ? 'bottom' : 'right';

  $resizer.css({[sideProp]: '-2500px'})
  let value;

  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.pageX - coords.right;
      value = coords.width + delta;
      $resizer.css({right: -delta + 'px'})
    } else {
      const delta = e.pageY - coords.bottom;
      value = coords.height + delta;
      $resizer.css({bottom: -delta + 'px'})
    }
  }

  document.onmouseup = () => {
    if (type === 'col') {
      $parent.css({width: value + 'px'})
      $root.findAll(`[data-col="${$parent.data.col}"]`)
          .forEach(elem => elem.style.width = value + 'px');
    } else {
      $parent.css({height: value + 'px'})
    }
    document.onmousemove = null;
    document.onmouseup = null;

    $resizer.css({
      right: 0,
      bottom: 0,
    })
  };
}
