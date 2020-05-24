// Pure functions

export function capitalize(str) {
  if (typeof str !== 'string') return '';
  return str[0].toUpperCase() + str.slice(1);
}

export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end]
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, idx) => start + idx)
}

export function storage(key, payload = null) {
  if (!payload) {
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(payload))
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
}

export function camelToDashCase(str) {
  return str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);
}

export function toInlineStyles(styles) {
  return Object.keys(styles)
      .map(key => `${camelToDashCase(key)}: ${styles[key]}`)
      .join(';')
}

// export function getFormatFromCss(prop) {
//   const keys = ['background', 'font', 'text'];
//   const key = keys.filter(k => prop.startsWith(k))[0] || null;
//   return key ? `${key}-${prop.slice(key.length).toLowerCase()}` : key
// }
