import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root');
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDomListeners() {
    this.listeners.forEach(type => {
      const method = getMethodName(type);
      if (!this[method]) {
        throw new Error(
            `Method ${method} not implemented ${this.name} component`)
      } else {
        this[method] = this[method].bind(this)
        this.$root.on([type], this[method]);
      }
    })
  }

  removeDomListeners() {
    this.listeners.forEach(type => {
      const method = getMethodName(type);
      this.$root.off([type], this[method]);
    })
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}

