import { hexToRgb, getElementRect } from 'Editor/scripts/utilities'

import IMPObject from 'Client/UI/objects/impObject'

export default class Text extends IMPObject {
  constructor(options, store) {
    super(options, store)
  }
  createElement() {
    let element = document.createElement('div')
    element.classList.add('imp-object-text')
    element.innerHTML = this.options.text.text
    return element
  }
  createCSSRules(styles) {
    let css = ''
    let c = hexToRgb(this.options.text.text_color)

    css += 'left: ' + this.options.x + '%;'
    css += 'top: ' + this.options.y + '%;'
    css += 'font-family: ' + this.options.text.font_family + ';'
    css += 'font-size: ' + this.options.text.font_size + 'px;'
    css += 'font-weight: ' + this.options.text.font_weight + ';'
    css += 'color: rgba(' + c.r + ', ' + c.g + ', ' + c.b + ', ' + this.options.text.text_opacity + ');'

    css += `filter: `
    for (let filter of styles.parent_filters) {
      css += `${filter.name}(${filter.value}) `
    }
    css += `;`

    return css
  }
  getWidth() {
    return getElementRect(this.element).width / this.store.getCanvasWrapRect().width * 100
  }
  getHeight() {
    return getElementRect(this.element).height / this.store.getCanvasWrapRect().height * 100
  }
  getRect() {
    return {
      x: this.options.x,
      y: this.options.y,
      width: this.getWidth(),
      height: this.getHeight(),
    }
  }
}