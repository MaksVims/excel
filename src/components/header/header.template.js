import {defaultTitle} from '@/constans';

export function createHeader(state) {
  const title = state.title || defaultTitle
  return `  
      <input 
         type="text" 
          class="input" 
          value="${title}" 
          data-type="input"
      />
      <div>
        <div class="button" data-type="delete">
            <span class="material-icons" data-type="delete">delete</span>
        </div>
        <div class="button" data-type="exit">
             <span class="material-icons" data-type="exit">exit_to_app</span>
        </div>
      </div>`
}
