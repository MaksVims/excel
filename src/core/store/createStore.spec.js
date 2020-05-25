import {createStore} from './createStore';


const initialState = {
  count: 0
}
const reducer = (state = initialState, action) => {
  if (action.type === 'ADD') {
    return {...state, count: state.count + 1};
  }
  return state;
}

describe('createStore:', () => {
  let store;
  let handler;
  let changedState;

  beforeEach(() => {
    // eslint-disable-next-line new-cap
    store = createStore(reducer, initialState);
    handler = jest.fn();
    changedState = {count: 1}
  })

  test('should return store object', () => {
    expect(store).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.subscribe).toBeDefined();
    expect(store.getState).not.toBeUndefined()
  })

  test('should return object as a state', () => {
    expect(store.getState()).toBeInstanceOf(Object)
  })

  test('should return initialState', () => {
    expect(store.getState()).toEqual(initialState)
  })

  test('should change state defined action', () => {
    store.dispatch({type: 'ADD'})
    expect(store.getState()).toEqual(changedState)
  })

  test('should not change state undefined action', () => {
    store.dispatch({type: 'ADDING'})
    expect(store.getState()).toEqual(initialState)
  })

  test('subscribe call -- ok', () => {
    store.subscribe(handler)
    store.dispatch({type: 'ADD'})
    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(store.getState());
  })

  test('should not call sub if unsubscribe', () => {
    const sub = store.subscribe(handler)
    sub.unsubscribe()

    store.dispatch({type: 'ADD'})
    expect(handler).not.toHaveBeenCalled();
  })

  test('dispatch in async way', () => {
    return new Promise(resolve => {
      setTimeout(() => {
        store.dispatch({type: 'ADD'})
      }, 500)

      setTimeout(() => {
        expect(store.getState().count).toBe(1);
        resolve();
      }, 1000)
    })
  })
})
