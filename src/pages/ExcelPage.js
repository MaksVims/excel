import {Page} from '@core/Page';
import {CreateStore} from '@core/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {getInitialState} from '@/redux/initialState';
import {debounce, storage, storageName} from '@core/utils';
import {Table} from '@/components/table/Table';
import {Excel} from '@/components/excel/Excel';
import {Formula} from '@/components/formula/Formula';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Header} from '@/components/header/Header';
import {updatedDate} from '@/redux/actions';


export class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString();
    const store = new CreateStore(rootReducer, getInitialState(params))
    const stateListener = debounce(state => {
      storage(storageName(params), state);
    }, 300)
    store.subscribe(stateListener)
    store.dispatch(updatedDate(new Date().toLocaleString()))

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }

  destroy() {
    this.excel.destroy()
  }

  afterRender() {
    this.excel.init()
  }
}
