import {$} from '@core/dom'
import {Emitter} from '@core/Emmiter';
import {StoreSubscriber} from '@core/StoreSubscriber';
import {preventDefault} from '@core/utils';

export class Excel {
  constructor(options) {
    this.components = options.components || [];
    this.store = options.store;
    this.subscriber = new StoreSubscriber(this.store);
    this.emitter = new Emitter();
  }

  getRoot() {
    const $root = $.create('div', 'excel');
    const componentOptions = {
      emitter: this.emitter,
      store: this.store,
    }
    this.components = this.components.map(Component => {
      const $el = $.create('section', Component.className);
      const component = new Component($el, componentOptions);
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    })
    return $root;
  }

  init() {
    if (process.env.NODE_ENV === 'production' ) {
      document.addEventListener('contextmenu', preventDefault)
    }
    this.subscriber.subscribersComponents(this.components)
    this.components.forEach(component => component.init());
  }

  destroy() {
    this.components.forEach(component => component.destroy());
    this.subscriber.unsubscribeFromStore();
    document.removeEventListener('contextmenu', preventDefault)
  }
}

