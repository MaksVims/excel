import {defaultTitle} from '@/constans';

export function createHeader(state) {
  const title = state.title || defaultTitle
  return `  <input 
            type="text" 
            class="input" 
            value="${title}" 
            data-type="input"
            />
            <div>
                <div class="button">
                    <span class="material-icons">delete</span>
                </div>
                <div class="button">
                    <span class="material-icons">exit_to_app</span>
                </div>
            </div>`
}
