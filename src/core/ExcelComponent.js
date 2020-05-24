import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.store = options.store;
    this.unsubscribers = [];
    this.subscribe = options.subscribe || [];

    this.prepare();
  }

  $on(event, callback) {
    const unsub = this.emitter.subscribe(event, callback);
    this.unsubscribers.push(unsub);
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  storeChanged() {}

  prepare() {}

  toHTML() {
    return ``
  }

  init() {
    this.initDomListeners();
  }

  destroy() {
    this.removeDomListeners();
    this.unsubscribers.forEach(unsub => unsub());
  }
}
