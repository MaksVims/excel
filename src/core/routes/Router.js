import {$} from '@core/dom';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Router selector not defined');
    }
    this.$app = $(selector);
    this.routes = routes;
    this.page = null;

    this.changePage = this.changePage.bind(this);
    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePage)
    this.changePage()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePage);
  }

  changePage() {
    if (this.page) {
      this.page.destroy();
    }
    this.$app.clear();

    const Page = ActiveRoute.path.includes('excel') ?
      this.routes.excel : this.routes.dashboard

    this.page = new Page(ActiveRoute.param);
    this.$app.append(this.page.getRoot());
    this.page.afterRender()
  }
}
