import { htmlToElement, deepExtend } from 'Editor/scripts/utilities'
import FullscreenButton from 'Client/UI/fullscreenButton'

export default class FullscreenController {
  store = undefined
  button = undefined
  isFullscreen = undefined
  closeFullscreenCallback = undefined

  constructor(store, isFullscreen, closeFullscreenCallback) {
    this.store = store

    // Fullscreen enabled?
    if (!this.store.state.fullscreen.enable_fullscreen_mode) return

    this.isFullscreen = isFullscreen
    this.closeFullscreenCallback = closeFullscreenCallback

    // Start in fullscreen mode enabled?
    if (this.store.state.fullscreen.start_in_fullscreen_mode && !this.isFullscreen) {
      this.goFullscreen()
    }

    this.createButton()
  }
  createButton() {
    this.button = new FullscreenButton({
      mapID: this.store.getID(),
      isFullscreen: this.isFullscreen,
    })
  }
  insertUI() {
    if (!this.store.state.fullscreen.enable_fullscreen_mode) return

    if (this.store.state.object_list.enable_object_list &&
      this.store.state.object_list.menu_style === 'on-top' &&
      this.store.state.object_list.menu_position === 'right') {
      this.store.getUIWrap().querySelector('.imp-ui-bottom-left').appendChild(this.button.element)
    } else {
      this.store.getUIWrap().querySelector('.imp-ui-bottom-right').appendChild(this.button.element)
    }
  }
  goFullscreen() {
    // Create new fullscreen config
    let fullscreenConfig = deepExtend({}, this.store.state)

    // Modify settings
    fullscreenConfig.general.name += ' [fullscreen]'
    fullscreenConfig.id += ' [fullscreen]'

    // Create fullscreen container
    document.querySelector('#imp-fullscreen-container')?.remove()
    document.body.appendChild(htmlToElement(`<div id="imp-fullscreen-container"><div id="imp-fullscreen-image-map"></div>`))

    // Set body class
    document.body.classList.add('imp-fullscreen-mode')

    // Init new image map
    this.store.getEventController().removeEvents()
    ImageMapPro.init('#imp-fullscreen-image-map', fullscreenConfig, {
      isFullscreen: true,
      closeFullscreenCallback: () => {
        this.store.getEventController().createEvents()
      },
      artboardId: this.store.getArtboard().id
    })
  }
  closeFullscreen() {
    if (!this.store.getIsFullscreen()) return

    // Disable events of the fullscreen map
    this.store.getEventController().removeEvents()
    // Delete menu and tooltip container
    this.store.getMenuController().removeMenu()
    this.store.getTooltipController().container.remove()

    // Delete fullscreen container
    document.body.classList.remove('imp-fullscreen-mode')
    document.querySelector('#imp-fullscreen-container')?.remove()

    // This callback was created in goFullscreen()
    this.closeFullscreenCallback()
  }
}