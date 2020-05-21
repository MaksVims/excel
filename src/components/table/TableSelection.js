export class TableSelection {
  static ACTIVE_CLASS = 'selected'

  constructor() {
    this.group = [];
    this.$current = null;
  }

  select($cell) {
    this.clear();
    this.group.push($cell);
    $cell.focus().addClass(TableSelection.ACTIVE_CLASS);
    this.$current = $cell;
  }

  clear() {
    this.group.forEach($cell => $cell.removeClass(TableSelection.ACTIVE_CLASS))
    this.group = [];
  }

  selectGroup($group) {
    this.clear();
    this.group = $group;
    $group.forEach($cell => $cell.addClass(TableSelection.ACTIVE_CLASS))
  }
}
