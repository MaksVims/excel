import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
// eslint-disable-next-line max-len
import {isCell, shouldResize, nextSelector} from '@/components/table/table.functions';
import {resizeHandler} from '@/components/table/table.resize';
import {TableSelection} from '@/components/table/TableSelection';
import {matrix} from '@/components/table/table.functions';
import {$} from '@core/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
  }

  toHTML() {
    return createTable(20)
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    this.selectCell(this.$root.find(`[data-id="0:0"]`));

    this.$on('formula:input', data => {
      this.selection.$current.text(data);
    })

    this.$on('formula:enter', () => {
      this.selection.$current.focus();
    })
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:changeSelect', $cell)
  }

  onInput(event) {
    this.$emit('table:input', $(event.target))
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.$current)
            .map(id => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'Enter',
      'Tab'
    ];
    const {key} = event;
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.$current.id(true);
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next);
    }
  }
}

