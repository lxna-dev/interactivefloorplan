import * as icons from 'Client/UI/icons'

export default class Button {
  element = document.createElement('div')

  constructor() {
    this.element.classList.add('imp-menu-close-button')
    this.element.classList.add('imp-ui-element')
    this.element.innerHTML = icons.close
  }
}