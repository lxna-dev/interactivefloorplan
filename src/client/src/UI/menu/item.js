import * as icons from 'Client/UI/icons'

export default class Item {
  element = document.createElement('div')
  options = undefined
  depth = 0
  visible = true
  isGroup = false
  iconElement = document.createElement('div')

  constructor({ options, isGroup, depth, imageMapId }) {
    this.options = options
    this.depth = depth
    this.isGroup = isGroup

    this.element.classList.add('imp-object-list-item')
    if (isGroup) this.element.classList.add('imp-object-list-item-group')
    this.element.dataset.listItemId = this.options.id
    this.element.dataset.imageMapId = imageMapId

    if (depth > 0) {
      this.element.style.marginLeft = 25 + (depth - 1) * 22 + 'px'
      this.element.style.borderLeft = '1px solid #eee'
    }

    if (this.isGroup) {
      this.iconElement.classList.add('imp-object-list-item-folder-icon')
      this.element.appendChild(this.iconElement)
    }

    let p = document.createElement('p')
    p.innerHTML = this.options.title
    this.element.appendChild(p)

    this.openFolder()
    this.redraw()
  }
  show() {
    this.visible = true
    this.redraw()
  }
  hide() {
    this.visible = false
    this.redraw()
  }
  openFolder() {
    this.iconElement.innerHTML = icons.caretDown
  }
  closeFolder() {
    this.iconElement.innerHTML = icons.caretRight
  }
  redraw() {
    if (this.visible) this.element.classList.remove('imp-object-list-item-hidden')
    if (!this.visible) this.element.classList.add('imp-object-list-item-hidden')
  }
}