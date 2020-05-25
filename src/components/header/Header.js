import {ExcelComponent} from '@core/ExcelComponent';
import {createHeader} from '@/components/header/header.template';
import {$} from '@core/dom';
import {changeTitle} from '@/redux/actions';
import {debounce, deleteTable} from '@core/utils';

export class Header extends ExcelComponent {
  static className = 'excel__header';
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.type === 'delete') {
      deleteTable()
      window.location.hash = '';
    } else if ($target.data.type === 'exit') {
      window.location.hash = '';
    }
  }

  onInput(event) {
    const $target = $(event.target);
    if ($target.data.type === 'input') {
      this.$dispatch(changeTitle($target.text()))
    }
  }

  toHTML() {
    return createHeader(this.store.getState())
  }
}
