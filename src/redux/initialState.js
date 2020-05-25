import {clone} from '@core/utils';
import {defaultStyles} from '@/constans';

const initialState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  title: '',
  changeStyles: defaultStyles,
  date: new Date().toLocaleString(),
}

export function normalizeState(state) {
  return {
    ...clone(initialState),
    ...state,
  }
}
