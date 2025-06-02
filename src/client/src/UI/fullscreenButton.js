import { htmlToElement } from 'Editor/scripts/utilities'
import * as icons from 'Client/UI/icons'

export default class FullscreenButton {
  constructor({ mapID, isFullscreen }) {
    this.mapID = mapID
    this.isFullscreen = isFullscreen

    // Create the HTML element
    this.element = htmlToElement(this.html())
  }
  icon() {
    if (this.isFullscreen) {
      return icons.closeFullscreen
    } else {
      return icons.goFullscreen
    }
  }
  css() {
    return ''
  }
  html() {
    // HTML
    let html = `<div data-image-map-id="${this.mapID}" data-element-name="fullscreenButton" style="${this.css()}" class="imp-ui-element imp-fullscreen-button">${this.icon()}</div>`

    return html
  }
}