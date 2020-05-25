import {Page} from '@core/Page';
import {createStore} from '@core/store/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {Table} from '@/components/table/Table';
import {Excel} from '@/components/excel/Excel';
import {Formula} from '@/components/formula/Formula';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Header} from '@/components/header/Header';
import {updatedDate} from '@/redux/actions';
import {StateProcessor} from '@core/store/StateProcessor';
import {LocaleStorageClient} from '@core/store/LocaleStorageClient';


export class ExcelPage extends Page {
  constructor(params) {
    super(params);

    this.subStore = null;
    this.processor = new StateProcessor(
        new LocaleStorageClient(this.params)
    )
  }
  async getRoot() {
    const state = await this.processor.get();
    const store = createStore(rootReducer, state)

    this.subStore = store.subscribe(this.processor.listen)
    store.dispatch(updatedDate(new Date().toLocaleString()))

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }

  destroy() {
    if (this.excel) this.excel.destroy()
    this.subStore.unsubscribe();
  }

  afterRender() {
    this.excel.init()
  }
}
