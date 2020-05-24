export function parse(str = '') {
  str = String(str);
  if (str.startsWith('=')) {
    try {
      return eval(str.slice(1));
    } catch (e) {
      return str;
    }
  }
  return str;
}
