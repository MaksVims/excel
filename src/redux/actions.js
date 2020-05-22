import * as types from '@/redux/types';

export function tableResize(data) {
  return {
    type: types.TABLE_RESIZE,
    data,
  }
}

export function changeText(data) {
  return {
    type: types.CHANGE_TEXT,
    data,
  }
}
