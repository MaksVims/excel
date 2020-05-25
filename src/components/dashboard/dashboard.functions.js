import {storage} from '@core/utils';
import {defaultTitle} from '@/constans';

function createRecord(key) {
  const model = storage(key);
  const id = key.split(':')[1]
  return ` <li class="dashboard__record">
               <a href="#excel:${id}">${model.title || defaultTitle}</a>
               <strong>${model.date}</strong>
           </li>`
}

function getAllKeysRecords() {
  const keys = []
  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (!key.includes('excel')) {
      continue
    }

    keys.push(key);
  }
  return keys;
}

export function createAllRecords() {
  const keys = getAllKeysRecords();

  if (!keys.length) {
    return `<p>Таблиц пока нет</p>`
  }

  return `<div class="dashboard__list-header">
                <span>Название</span>
                <span>Дата открытия</span>
          </div>

          <ul class="dashboard__list">
             ${keys.map(createRecord).join('')}
          </ul>`
}
