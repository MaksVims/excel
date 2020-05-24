export function createHeader(state) {
  return `  <input 
            type="text" 
            class="input" 
            value="${state.title}" 
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
