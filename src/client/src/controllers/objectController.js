import { htmlToElement, hexToRgb, easeOutBounce } from 'Editor/scripts/utilities'
import * as consts from 'Client/consts'
import * as editorConsts from 'Editor/scripts/consts'

import Spot from 'Client/UI/objects/spot'
import Text from 'Client/UI/objects/text'
import Rect from 'Client/UI/objects/rect'
import Oval from 'Client/UI/objects/oval'
import Poly from 'Client/UI/objects/poly'
import Group from 'Client/UI/objects/group'
import SVGSingle from 'Client/UI/objects/svgSingle'
import SVG from 'Client/UI/objects/svg'

export default class ObjectController {
  constructor(store) {
    this.store = store
    this.store.subscribe(this.handleAction.bind(this))

    this.objects = {}
    this.spots = []
    this.container = document.createElement('div')
    this.imageBackgroundsContainer = document.createElement('div')
    this.stylesheet = document.createElement('style')

    this.highlightedObjects = new Set()
    this.didStopGlowing = false

    this.setupContainers()
    this.createObjects()
    this.insertObjects()
  }
  insertObjects() {
    this.emptyContainers()
    this.fillContainers()
    this.generateStylesheet()
    this.animateObjects(250)
  }
  handleAction(action) {
    if (action.type === 'zoomUpdate' && this.store.state.objectConfig.scale_spots) {
      for (let spot of this.spots) {
        if (spot.options.type === editorConsts.OBJECT_SPOT) {
          spot.element.style.transform = `scale(${1 / this.store.getZoom()})`
        }
      }
    }
  }

  createObjects() {
    this.objects = {}
    this.spots = []
    this.highlightedObjects = new Set()

    for (let object of this.store.getObjects()) {
      switch (object.type) {
        case editorConsts.OBJECT_SPOT:
          this.objects[object.id] = new Spot(object, this.store)
          this.spots.push(this.objects[object.id])
          break
        case editorConsts.OBJECT_TEXT:
          this.objects[object.id] = new Text(object, this.store)
          break
        case editorConsts.OBJECT_RECT:
          this.objects[object.id] = new Rect(object, this.store)
          break
        case editorConsts.OBJECT_OVAL:
          this.objects[object.id] = new Oval(object, this.store)
          break
        case editorConsts.OBJECT_POLY:
          this.objects[object.id] = new Poly(object, this.store)
          break
        case editorConsts.OBJECT_SVG:
          this.objects[object.id] = new SVG(object, this.store)
          break
        case editorConsts.OBJECT_SVG_SINGLE:
          this.objects[object.id] = new SVGSingle(object, this.store)
          break
        case editorConsts.OBJECT_GROUP:
          this.objects[object.id] = new Group(object, this.store)
      }
    }
  }
  setupContainers() {
    this.container.classList.add('imp-objects')

    this.imageBackgroundsContainer.classList.add('imp-image-backgrounds')
    this.imageBackgroundsContainer.setAttribute('id', 'imp-image-backgrounds-' + this.store.getID())
    this.stylesheet.setAttribute('id', `stylesheet-${this.store.getID()}`)

    if (this.store.state.objectConfig.glowing_objects) {
      this.container.classList.add('imp-glowing-objects')
    }
  }
  fillContainers() {
    let keys = Object.keys(this.objects).reverse()

    for (let key of keys) {
      this.container.appendChild(this.objects[key].element)
      this.imageBackgroundsContainer.appendChild(this.objects[key].imageBackgroundElement)
    }
  }
  emptyContainers() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.lastChild)
    }
    while (this.imageBackgroundsContainer.firstChild) {
      this.imageBackgroundsContainer.removeChild(this.imageBackgroundsContainer.lastChild)
    }
  }
  generateStylesheet() {
    let text = ''

    for (let id in this.objects) {
      text += this.objects[id].styles
    }

    if (this.store.state.objectConfig.glowing_objects) {
      let glowColor = hexToRgb(this.store.state.objectConfig.glowing_objects_color) || { r: 255, b: 255, g: 255 }
      text += `@keyframes ObjectGlowAnimation {`
      text += `  0% {`
      text += `    filter: drop-shadow(0 0 20px rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, ${this.store.state.objectConfig.glow_opacity}));`
      text += `  }`
      text += `  50% {`
      text += `    filter: drop-shadow(0 0 20px rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, 0));`
      text += `  }`
      text += `  100% {`
      text += `    filter: drop-shadow(0 0 20px rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, ${this.store.state.objectConfig.glow_opacity}));`
      text += `  }`
      text += `}`
    }

    if (this.store.state.objectConfig.pageload_animation === 'fall-down') {
      text += `.imp-object.imp-object-pageload-animation {
        opacity: 0;
        transition-duration: 500ms;
      }`
    }

    if (this.store.state.objectConfig.pageload_animation === 'fade') {
      text += `.imp-object.imp-object-pageload-animation {
        opacity: 0;
        transition-duration: 500ms;
      }`
    }

    if (this.store.state.objectConfig.pageload_animation === 'grow') {
      text += `.imp-object.imp-object-pageload-animation {
        opacity: 0;
        transform: scale(0);
        transition-duration: 500ms;
      }`
    }

    if (this.store.state.objectConfig.pageload_animation === 'flash') {
      text += `.imp-object.imp-object-pageload-animation {
        transition-duration: 350ms;
      }`
    }

    this.stylesheet.innerHTML = text
  }

  async animateObjects(delay = 0) {
    // Enable pageload animation, in case it was previously disabled
    // This ensures the animations will run again when switching artboards
    await this.store.dispatch('enablePageloadAnimation')

    // If pageload animation is set to 'none', return
    if (this.store.state.objectConfig.pageload_animation === 'none') return

    // Calculate the interval between animations
    let interval = 750 / this.store.getObjects().length
    if (this.store.getObjects().length > 20) {
      interval = 1500 / this.store.getObjects().length
    }

    Object.keys(this.objects).forEach((id) => {
      if (this.objects[id].options.static) return
      this.objects[id].element.classList.add('imp-object-pageload-animation')
    })

    setTimeout(() => {
      const objectsArray = Object.keys(this.objects).map((key) => this.objects[key])
      const sortedObjectsArray = objectsArray.sort((a, b) => {
        return a.options.x < b.options.x ? -1 : 1
      })

      let disablePageloadAnimationDelay = 100
      for (let i = 0; i < sortedObjectsArray.length; i++) {
        const id = sortedObjectsArray[i].options.id
        disablePageloadAnimationDelay += interval
        if (this.objects[id].options.static) continue
        this.animateObject(this.objects[id], interval * i)
      }
      setTimeout(() => {
        this.store.dispatch('disablePageloadAnimation')
      }, disablePageloadAnimationDelay)
    }, delay)
  }
  animateObject(object, delay) {
    if (object.options.type === editorConsts.OBJECT_GROUP && !object.options.single_object) return
    let currentTime = 0

    function animateFallDown() {
      window.requestAnimationFrame(function () {
        currentTime += 0.01666
        let y = easeOutBounce(undefined, currentTime, -200, 200, 2)
        object.element.style.transform = `translateY(${y}px)`
        if (currentTime <= 2) {
          animateFallDown()
        }
      })
    }

    setTimeout(() => {
      if (this.store.state.objectConfig.pageload_animation === 'fade') {
        object.element.style.opacity = object.options.default_style.opacity
        setTimeout(() => {
          object.element.classList.remove('imp-object-pageload-animation')
          object.element.setAttribute('style', '')
        }, 500)
      }

      if (this.store.state.objectConfig.pageload_animation === 'grow') {
        object.element.style.opacity = object.options.default_style.opacity
        object.element.style.transform = 'scale(1)'
        setTimeout(() => {
          object.element.classList.remove('imp-object-pageload-animation')
          object.element.setAttribute('style', '')
        }, 500)
      }

      if (this.store.state.objectConfig.pageload_animation === 'fall-down') {
        object.element.style.opacity = object.options.default_style.opacity
        object.element.style.transitionProperty = 'opacity'
        setTimeout(() => {
          object.element.classList.remove('imp-object-pageload-animation')
          object.element.setAttribute('style', '')
        }, 2000)
        animateFallDown()
      }

      if (this.store.state.objectConfig.pageload_animation === 'flash') {
        this.highlightObject(object.options.id)
        setTimeout(() => {
          this.unhighlightObject(object.options.id)
          setTimeout(() => {
            object.element.classList.remove('imp-object-pageload-animation')
          }, 400)
        }, 350)
      }
    }, delay)
  }

  highlightObject(id) {
    return new Promise((resolve) => {
      if (
        this.store.state.objectConfig.glowing_objects &&
        this.store.state.objectConfig.stop_glowing_on_mouseover &&
        !this.didStopGlowing
      ) {
        this.didStopGlowing = true
        this.container.classList.remove('imp-glowing-objects')
      }

      // If the object isn't in the currently active artboard, return
      if (!this.objects[id]) return

      // If the object is a group and NOT a single object, return
      if (this.objects[id].options.type === editorConsts.OBJECT_GROUP && !this.objects[id].options.single_object) return

      // Apply mouseover styles
      // Get IDs of the objects to highlight
      let ids = this.objects[id].getHighlightIds()

      // Highlight the objects
      // And add the ids to the set of highlighted objects
      ids.forEach((id) => {
        this.objects[id].highlight()
        this.highlightedObjects.add(id)
      })

      // Send API event
      ImageMapPro.trigger({
        type: consts.HOOK_OBJECT_HIGHLIGHT,
        payload: {
          map: this.store.state.general.name,
          object: this.objects[id].options.title,
        },
      })
      requestAnimationFrame(resolve)
    })
  }
  unhighlightObject(id) {
    return new Promise((resolve) => {
      // Apply default styles
      // Get IDs of the objects to highlight
      let ids = this.objects[id].getHighlightIds()

      // Highlight the objects
      // And add the ids to the set of highlighted objects
      ids.forEach((id) => {
        this.objects[id].unhighlight()
        this.highlightedObjects.delete(id)
      })

      ImageMapPro.trigger({
        type: consts.HOOK_OBJECT_UNHIGHLIGHT,
        payload: {
          map: this.store.state.general.name,
          object: this.objects[id].options.title,
        },
      })

      requestAnimationFrame(resolve)
    })
  }
  unhighlightAllObjects() {
    return new Promise((resolve) => {
      for (let id of this.highlightedObjects) {
        this.unhighlightObject(id)
      }

      requestAnimationFrame(resolve)
    })
  }
  getFocusObjectCoordsAndZoom(id) {
    id = this.store.getObject({ id }).parent || id

    if (this.store.getMaxZoom() == 1) {
      return {
        zoom: 1,
        pan: { x: 0, y: 0 },
      }
    }

    // Calculate center of the target object
    let rect = this.objects[id].getRect()
    let centerX = rect.x + rect.width / 2
    let centerY = rect.y + rect.height / 2

    let zoom = rect.width > rect.height ? 50 / rect.width : 50 / rect.height
    if (zoom < 1) zoom = 1
    if (zoom > this.store.getMaxZoom()) zoom = this.store.getMaxZoom()

    // Convert from % to px
    centerX = (centerX / 100) * this.store.getCanvasWrapRect().width * zoom
    centerY = (centerY / 100) * this.store.getCanvasWrapRect().height * zoom

    // Zoom
    return {
      zoom: zoom,
      pan: { x: centerX, y: centerY },
    }
  }
  performClickAction(id) {
    id = this.store.getObject({ id }).parent || id

    if (!this.objects[id]) return

    if (this.objects[id].options.actions.click === 'follow-link') {
      if (!document.querySelector('#imp-temp-link')) {
        document.body.appendChild(htmlToElement('<a href="" id="imp-temp-link" target="_blank"></a>'))
      }
      document.querySelector('#imp-temp-link').setAttribute('href', this.objects[id].options.actions.link)

      if (this.objects[id].options.actions.open_link_in_new_window) {
        document.querySelector('#imp-temp-link').setAttribute('target', '_blank')
      } else {
        document.querySelector('#imp-temp-link').removeAttribute('target')
      }

      document.querySelector('#imp-temp-link').click()
    }

    if (this.objects[id].options.actions.click === 'run-script') {
      eval(this.objects[id].options.actions.script.replace('<br>', ''))
    }

    if (this.objects[id].options.actions.click === 'change-artboard') {
      this.store.dispatch('changeArtboard', { artboardId: this.objects[id].options.actions.artboard, zoomOut: true })
    }

    ImageMapPro.trigger({
      type: consts.HOOK_OBJECT_CLICK,
      payload: {
        map: this.store.state.general.name,
        object: this.objects[id].options.title,
      },
    })
  }
}
