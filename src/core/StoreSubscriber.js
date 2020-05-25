import {isEqual} from '@core/utils';


export class StoreSubscriber {
  constructor(store) {
    this.store = store;
    this.subs = null;
    this.prevState = {};
  }

  subscribersComponents(components) {
    this.prevState = this.store.getState();
    this.subs = this.store.subscribe(state => {
      Object.keys(state).forEach(key => {
        if (!isEqual(this.prevState[key], state[key])) {
          components.forEach(component => {
            if (component.isWatching(key)) {
              const changes = {[key]: state[key]};
              component.storeChanged(changes);
            }
          })
        }
      })
      this.prevState = this.store.getState();
    })
  }

  unsubscribeFromStore() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
