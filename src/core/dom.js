class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string' ?
      document.querySelector(selector) : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  append(node) {
    node = node instanceof Dom ? node.$el : node
    if (Element.prototype.append) this.$el.append(node);
    else this.$el.appendChild(node);
    return this;
  }

  on(type, callback) {
    this.$el.addEventListener(type, callback);
  }

  off(type, callback) {
    this.$el.removeEventListener(type, callback);
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) el.classList.add(classes);
  return $(el);
}
