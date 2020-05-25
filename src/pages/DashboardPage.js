import {Page} from '@core/Page';
import {$} from '@core/dom';
import {createAllRecords} from '@/components/dashboard/dashboard.functions';

export class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString();
    return $.create('div', 'dashboard').html(
        `<section class="dashboard__header">
            <h1>Excel Dashboard</h1>
        </section>

        <section class="dashboard__new">
            <div class="dashboard__view">
                <a href="#excel/${now}" class="dashboard__create">
                    Новая <br> Таблица
                </a>
            </div>
        </section>

        <section class="dashboard__table dashboard__view">
            ${createAllRecords()}
        </section>`
    )
  }
}
