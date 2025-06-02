import { htmlToElement } from 'Editor/scripts/utilities'
import * as icons from 'Client/UI/icons'

export default class Search {
  element = undefined
  input = undefined

  constructor() {
    this.element = htmlToElement(this.html())
    this.input = this.element.querySelector('input')
  }
  html() {
    let html = `
      <div class="imp-search-box">
        <div class="imp-search-box-input-wrap">
          <input type="text" placeholder="Search...">
          ${icons.search.replace('imp-icon', 'imp-icon imp-search')}
          ${icons.close.replace('imp-icon', 'imp-icon imp-clear-search')}
        </div>
      </div>`
    return html
  }
  redraw() {
    if (this.input.value) {
      this.element.classList.add('imp-searching')
    } else {
      this.element.classList.remove('imp-searching')
    }
  }
  clear() {
    this.input.value = ''
  }
}