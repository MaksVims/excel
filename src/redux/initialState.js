import {storage} from '@core/utils';
import {defaultStyles} from '@/constans';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  title: 'Новая таблица',
  changeStyles: defaultStyles,
}

export const initialState = storage('excel-state') ?
  storage('excel-state') :
  defaultState
