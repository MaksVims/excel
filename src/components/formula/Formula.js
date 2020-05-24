import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom'

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options
    });
  }

  init() {
    super.init();
    const $formula = this.$root.find('[data-id="formula"]');

    this.$on('table:changeSelect', $cell => {
      $formula.text($cell.data.value);
    })
    // this.$on('table:input', $cell => {
    //   $formula.text($cell.text());
    // })
  }

  storeChanged({currentText}) {
    const $formula = this.$root.find('[data-id="formula"]');
    $formula.text(currentText);
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text());
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('formula:enter');
    }
  }

  toHTML() {
    return `<div class="info">fx</div>
            <div 
                data-id="formula" 
                class="input" 
                contenteditable 
                spellcheck="false"
            ></div>`
  }
}
