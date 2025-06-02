import * as icons from 'Client/UI/icons'
import { htmlToElement } from 'Editor/scripts/utilities'

export default class ArtboardMenu {
  element = undefined
  store = undefined

  constructor(store) {
    this.store = store
    this.element = htmlToElement(this.html())
  }
  html() {
    let html = ``

    html += '<div class="imp-ui-layers-menu-wrap" data-element-name="layersSelect">'
    html += icons.arrowDown
    html += '   <select class="imp-ui-element imp-ui-layers-select">'

    for (let artboard of this.store.getArtboards()) {
      html += `<option value="${artboard.id}">${artboard.title}</option>`
    }

    html += '   </select>'
    html += '</div>'

    return html
  }
  selectArtboard(value) {
    this.element.querySelector('select').value = value
  }
}