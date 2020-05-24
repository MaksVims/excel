import {ExcelComponent} from '@core/ExcelComponent';
import {createHeader} from '@/components/header/header.template';
import {$} from '@core/dom';
import {changeTitle} from '@/redux/actions';

export class Header extends ExcelComponent {
  static className = 'excel__header';
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    });
  }

  onInput(event) {
    console.log(event);
    const $target = $(event.target);
    if ($target.data.type === 'input') {
      this.$dispatch(changeTitle($target.text()))
    }
  }

  toHTML() {
    return createHeader(this.store.getState())
  }
}
