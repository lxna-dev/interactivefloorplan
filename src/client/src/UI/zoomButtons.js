import * as icons from 'Client/UI/icons'
import { htmlToElement } from 'Editor/scripts/utilities'

export default class ZoomButtons {
  id = undefined
  textColor = undefined
  backgroundColor = undefined

  zoomInButton = undefined
  zoomOutButton = undefined

  constructor({ id }) {
    this.id = id
    this.createElements()
  }
  css() {
    return ''
  }
  html() {
    return {
      zoomInButton: `<div data-image-map-id="${this.id}" data-element-name="zoomInButton" class="imp-ui-element imp-ui-zoom-button imp-ui-zoom-button-zoom-in" style="background: ${this.backgroundColor}">${icons.zoomIn.replace('<svg ', `<svg style="fill: ${this.textColor}" `)}</div>`,
      zoomOutButton: `<div data-image-map-id="${this.id}" data-element-name="zoomOutButton" class="imp-ui-element imp-ui-zoom-button imp-ui-zoom-button-zoom-out" style="background: ${this.backgroundColor}">${icons.zoomOut.replace('<svg ', `<svg style="fill: ${this.textColor}" `)}</div>`
    }
  }
  createElements() {
    this.zoomInButton = htmlToElement(this.html().zoomInButton)
    this.zoomOutButton = htmlToElement(this.html().zoomOutButton)
  }
}