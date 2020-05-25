import * as types from '@/redux/types';

export function rootReducer(state, action) {
  let field;
  let prevState;

  switch (action.type) {
    case types.TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState';
      return {...state, [field]: getActionField(state, action, field)}
    case types.CHANGE_TEXT:
      field = 'dataState';
      return {
        ...state,
        currentText: action.data.value,
        dataState: getActionField(state, action, field)
      };
    case types.CHANGE_STYLES:
      return {...state, changeStyles: action.data}
    case types.APPLY_STYLE:
      field = 'stylesState';
      prevState = state[field] || {};
      action.data.ids.forEach(id => {
        prevState[id] = {...prevState[id], ...action.data.value}
      })
      return {
        ...state,
        [field]: prevState,
        changeStyles: {...state.changeStyles, ...action.data.value}}
    case types.CHANGE_TITLE:
      return {...state, title: action.data}
    case types.UPDATED_DATE:
      return {...state, date: action.data}
    default:
      return state;
  }
}

function getActionField(state, action, field) {
  const prevState = state[field] || {};
  prevState[action.data.id] = action.data.value;
  return prevState;
}
