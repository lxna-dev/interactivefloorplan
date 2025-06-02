import { htmlToElement } from 'Editor/scripts/utilities'
import * as icons from 'Client/UI/icons'

export default class ItemArtboard {
  element = document.createElement('div')
  options = undefined

  constructor({ options, imageMapId }) {
    this.options = options
    this.element.classList.add('imp-object-list-item-artboard')
    this.element.dataset.listItemId = this.options.id
    this.element.dataset.imageMapId = imageMapId

    let span = document.createElement('span')
    span.innerHTML = this.options.title

    let arrow = htmlToElement(icons.arrowDown)

    this.element.appendChild(span)
    this.element.appendChild(arrow)
  }
  expand() {
    this.element.classList.remove('imp-collapsed-artboard-item')
  }
  collapse() {
    this.element.classList.add('imp-collapsed-artboard-item')
  }
}