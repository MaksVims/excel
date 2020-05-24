import {createToolbar} from '@/components/toolbar/toolbar.template';
import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {$} from '@core/dom';
import {defaultStyles} from '@/constans';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar';
  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options
    });
  }

  prepare() {
    this.initState(defaultStyles);
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.type) {
      const value = JSON.parse($target.data.value);
      const key = Object.keys(value)[0];
      this.setState({[key]: value[key]})
      this.$emit('toolbar:applyStyle', value)
    }
  }
}
