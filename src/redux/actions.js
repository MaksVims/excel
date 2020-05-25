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

export function changeStyles(data) {
  return {
    type: types.CHANGE_STYLES,
    data,
  }
}

export function applyStyle(data) {
  return {
    type: types.APPLY_STYLE,
    data,
  }
}

export function changeTitle(data) {
  return {
    type: types.CHANGE_TITLE,
    data,
  }
}

export function updatedDate(data) {
  return {
    type: types.UPDATED_DATE,
    data,
  }
}


