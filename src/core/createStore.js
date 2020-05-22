export function CreateStore(rootReducer, initialState = {}) {
  let state = rootReducer(initialState, {type: '__INIT__'});
  let listeners = [];

  return {
    subscribe(callback) {
      listeners.push(callback);
      return {
        unsubscribe() {
          listeners = listeners.filter(l => l !== callback)
        }
      }
    },

    dispatch(action) {
      state = rootReducer(state, action);
      listeners.forEach(listener => listener(state));
    },

    getState() {
      return state;
    }
  }
}

// export class CreateStore {
//   constructor(rootReducer, initialState) {
//     this.rootReducer = rootReducer;
//     this.state = this.rootReducer(initialState, {type: '__INIT__'});
//     this.listeners = [];
//   }
//
//   subscribe(callback) {
//     this.listeners.push(callback);
//
//     return () => {
//       this.listeners = this.listeners.filter(l => l !== callback);
//     }
//   }
//
//   dispatch(action) {
//     this.state = this.rootReducer(this.state, action);
//     this.listeners.forEach(listener => listener(this.state));
//   }
//
//   getState() {
//     return this.state;
//   }
// }
