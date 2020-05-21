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

  text(text) {
    if (typeof text === 'string') {
      this.$el.textContent = text.trim();
      return this;
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim();
    }
    return this.$el.textContent.trim();
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

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(':');
      return {
        row: +parsed[0],
        col: +parsed[1]
      }
    }
    return this.data.id;
  }

  get data() {
    return this.$el.dataset;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  on(type, callback) {
    this.$el.addEventListener(type, callback);
  }

  off(type, callback) {
    this.$el.removeEventListener(type, callback);
  }

  css(styles = {}) {
    Object.entries(styles)
        .forEach(([prop, value]) => this.$el.style[prop] = value);
  }

  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }

  focus() {
    this.$el.focus();
    return this;
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
