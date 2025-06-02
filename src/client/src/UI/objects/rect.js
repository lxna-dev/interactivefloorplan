import * as editorConsts from 'Editor/scripts/consts'
import IMPObject from 'Client/UI/objects/impObject'
import { hexToRgb } from 'Editor/scripts/utilities'

export default class Rect extends IMPObject {
  constructor(options, store) {
    super(options, store)
  }
  createElement() {
    let element = document.createElement('div')
    element.classList.add('imp-object-rect')

    return element
  }
  createCSSRules(styles) {
    let css = ''

    // If the object is an Oval, apply 50% 50% border radius
    let borderRadius = styles.border_radius + 'px'
    if (this.options.type === editorConsts.OBJECT_OVAL) {
      borderRadius = '50% 50%'
    }

    let color_bg = hexToRgb(styles.background_color) || { r: 0, b: 0, g: 0 }
    let color_border = hexToRgb(styles.border_color) || { r: 0, b: 0, g: 0 }

    css += 'left: ' + this.options.x + '%;'
    css += 'top: ' + this.options.y + '%;'
    css += 'width: ' + this.options.width + '%;'
    css += 'height: ' + this.options.height + '%;'

    if (styles.background_type === 'color') {
      css += 'background: rgba(' + color_bg.r + ', ' + color_bg.g + ', ' + color_bg.b + ', ' + styles.background_opacity + ');'
    }

    css += 'opacity: ' + styles.opacity + ';'
    css += 'border-width: ' + styles.border_width + 'px;'
    css += 'border-style: ' + styles.border_style + ';'
    css += 'border-color: rgba(' + color_border.r + ', ' + color_border.g + ', ' + color_border.b + ', ' + styles.border_opacity + ');'
    css += 'border-radius: ' + borderRadius + ';'

    css += `filter: `
    for (let filter of styles.parent_filters) {
      css += `${filter.name}(${filter.value}) `
    }
    css += `;`

    return css
  }
}