import {$} from '../dom';
import {ActiveRoute} from './ActiveRoute';
import {Loader} from '@/components/Loader/Loader';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Router selector not defined');
    }
    this.$app = $(selector);
    this.routes = routes;
    this.page = null;
    this.loader = new Loader();

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

  async changePage() {
    if (this.page) {
      this.page.destroy();
    }
    this.$app.clear().append(this.loader);

    const Page = ActiveRoute.path.includes('excel') ?
      this.routes.excel : this.routes.dashboard

    this.page = new Page(ActiveRoute.param);
    const root = await this.page.getRoot()
    this.$app.clear().append(root);
    this.page.afterRender()
  }
}
