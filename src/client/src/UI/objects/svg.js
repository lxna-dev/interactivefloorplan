import IMPObject from 'Client/UI/objects/impObject'

export default class SVG extends IMPObject {
  constructor(options, store) {
    super(options, store)
  }
  createElement() {
    let root = document.createElement('div')
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    let element = document.createElementNS('http://www.w3.org/2000/svg', this.options.svg.tagName)

    for (let prop of this.options.svg.properties) {
      element.setAttribute(prop.name, prop.value)
    }

    svg.classList.add('imp-object-svg-single')
    svg.setAttribute('viewBox', this.options.svg.viewBox)

    svg.appendChild(element)
    root.appendChild(svg)

    return root
  }
  createCSSRules(styles) {
    let css = ``

    css += `left: ${this.options.x}%;`
    css += `top: ${this.options.y}%;`
    css += `width: ${this.options.width}%;`
    css += `height: ${this.options.height}%;`

    css += `opacity: ${styles.opacity};`
    css += `fill: ${styles.background_color};`
    css += `fill-opacity: ${styles.background_opacity};`
    css += `stroke: ${styles.stroke_color};`
    css += `stroke-opacity: ${styles.stroke_opacity};`
    css += `stroke-width: ${styles.stroke_width};`
    css += `stroke-dasharray: ${styles.stroke_dasharray};`
    css += `stroke-linecap: ${styles.stroke_linecap};`

    css += `filter: `
    for (let filter of styles.parent_filters) {
      css += `${filter.name}(${filter.value}) `
    }
    css += `;`

    return css
  }
}
