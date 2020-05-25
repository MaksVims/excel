import {storage, storageName} from '@core/utils';
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

export function getInitialState(params) {
  return storage(storageName(params)) ?
    storage(storageName(params)) : JSON.parse(JSON.stringify(initialState))
}
