import {storage, storageName} from '@core/utils';
import {normalizeState} from '@/redux/initialState';

export class LocaleStorageClient {
  constructor(name) {
    this.name = storageName(name);
  }

  save(state) {
    storage(this.name, state);
    return Promise.resolve()
  }

  get() {
    const state = normalizeState(storage(this.name))
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(state)
      }, 4000)
    })
  }
}
