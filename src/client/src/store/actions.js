import * as consts from 'Client/consts'

let storedPageloadAnimation = ''

export default {
  init: ({ commit, state, store }) => {
    return new Promise(async (resolve) => {
      storedPageloadAnimation = store.state.objectConfig.pageload_animation
    })
  },
  beforeResize: ({ commit, state, store }) => {},
  resize: ({ commit, state, store }) => {},
  zoomIn: ({ commit, state, store }, { coords, animate = true, targetZoom }) => {
    return new Promise(async (resolve) => {
      await store.getZoomController().zoomIn({ coords, animate, targetZoom })
      resolve()
    })
  },
  zoomOut: ({ commit, state, store }, { coords, animate = true }) => {
    return new Promise(async (resolve) => {
      await store.getZoomController().zoomOut({ coords, animate })
      resolve()
    })
  },
  failedToZoom: ({ commit, state, store }) => {},
  goFullscreen: ({ commit, state, store }) => {
    return new Promise((resolve) => {
      store.getFullscreenController().goFullscreen()
      resolve()
    })
  },
  closeFullscreen: ({ commit, state, store }) => {
    return new Promise((resolve) => {
      store.getFullscreenController().closeFullscreen()
      resolve()
    })
  },
  panTo: ({ commit, state, store }, { x, y }) => {},
  startPan: ({ commit, state, store }, { x, y }) => {},
  pan: ({ commit, state, store }, { x, y }) => {},
  panOnNavigator: ({ commit, state, store }, { x, y }) => {},
  startPinch: ({ commit, state, store }, { event }) => {},
  pinch: ({ commit, state, store }, { event }) => {},
  zoomAtRect: ({ commit, state, store }, { zoom, pan: { x, y } }) => {},
  highlightObject: ({ commit, state, store }, { objectId, showTooltip = true, hideAllTooltips = true }) => {
    return new Promise(async (resolve) => {
      if (store.getArtboardIdForObject({ id: objectId }) !== store.getArtboard().id) return
      await store.getObjectController().highlightObject(objectId)
      if (hideAllTooltips) await store.getTooltipController().hideAllTooltips()
      if (showTooltip) await store.getTooltipController().showTooltip(objectId)
      resolve()
    })
  },
  unhighlightObject: ({ commit, state, store }, { objectId }) => {
    return new Promise(async (resolve) => {
      await store.getObjectController().unhighlightObject(objectId)
      await store.getTooltipController().hideTooltip(objectId)

      resolve()
    })
  },
  unhighlightAllObjects: ({ commit, state, store }) => {
    return new Promise(async (resolve) => {
      await store.getObjectController().unhighlightAllObjects()
      await store.getTooltipController().hideAllTooltips()
      resolve()
    })
  },
  focusObject: ({ commit, state, store }, { objectId, showTooltip = false }) => {
    return new Promise((resolve) => {
      if (state.zooming.enable_zooming) {
        let coordsAndZoom = store.getObjectController().getFocusObjectCoordsAndZoom(objectId)
        store.getZoomController().setTargetZoom({ zoom: coordsAndZoom.zoom, redraw: false })
        store.getZoomController().setTargetPan({ x: coordsAndZoom.pan.x, y: coordsAndZoom.pan.y })
        store.getMenuController().hideMobileMenu()

        requestAnimationFrame(async () => {
          if (showTooltip) {
            await store.getTooltipController().hideAllTooltips()
            await store.getTooltipController().showTooltip(objectId)
          }
          resolve()
        })
      } else {
        resolve()
      }
    })
  },
  clickObject: ({ commit, state, store }, { objectId }) => {
    return new Promise((resolve) => {
      store.getObjectController().performClickAction(objectId)
      resolve()
    })
  },
  updateTooltipPositions: ({ commit, state, store }) => {},
  closeFullscreenTooltip: ({ commit, state, store }) => {},
  zoomUpdate: ({ commit, state, store }) => {
    return new Promise((resolve) => {
      store.getZoomController().targetZoom
      ImageMapPro.trigger({
        type: consts.HOOK_ZOOM_PAN_UPDATE,
        payload: {
          map: state.general.name,
          zoom: store.getZoomController().currentZoom,
          pan: { x: store.getZoomController().actualPanX, y: store.getZoomController().actualPanY },
        },
      })
    })
  },
  changeArtboard: async ({ commit, state, store }, { artboardId, zoomOut = false }) => {
    return new Promise(async (resolve) => {
      if (store.getArtboard().id !== artboardId) {
        await store.getTooltipController().hideAllTooltips()
        store.getArtboardController().changeArtboard(artboardId)
        await store.getImageMap().updateImage()
        await store.getImageMap().setBackground()
        store.getObjectController().createObjects()
        store.getObjectController().insertObjects()
        store.getNavigatorController().createUI()

        // Prevent bug
        await store.getTooltipController().openedTooltips.clear()
        // ---

        if (zoomOut) store.getZoomController().resetZoom(true)
        await store.getTooltipController().createTooltips()
        await store.getMenuController().updateItems()

        // Get the title of the artboard
        const artboardTitle = store.getArtboard().title || artboardId

        ImageMapPro.trigger({
          type: consts.HOOK_ARTBOARD_CHANGE,
          payload: {
            map: state.general.name,
            artboard: artboardTitle,
          },
        })

        resolve()
      } else {
        resolve()
      }
    })
  },
  updateSearch: ({ commit, state, store }, { searchString }) => {},
  clearSearch: ({ commit, state, store }) => {},
  openMenu: ({ commit, state, store }) => {},
  closeMenu: ({ commit, state, store }) => {},
  toggleGroup: ({ commit, state, store }, { groupId }) => {
    return new Promise(async (resolve) => {
      await store.getMenuController().menu.list.toggleGroup(groupId)
      resolve()
    })
  },
  toggleArtboard: ({ commit, state, store }, { artboardId }) => {
    return new Promise(async (resolve) => {
      await store.getMenuController().menu.list.toggleArtboard(artboardId)
      resolve()
    })
  },
  showTooltip: ({ commit, state, store }, { objectId }) => {
    return new Promise(async (resolve) => {
      await store.getTooltipController().showTooltip(objectId)
      resolve()
    })
  },
  hideTooltip: ({ commit, state, store }, { objectId }) => {
    return new Promise(async (resolve) => {
      await store.getTooltipController().hideTooltip(objectId)
      resolve()
    })
  },
  hideAllTooltips: ({ commit, state, store }) => {
    return new Promise(async (resolve) => {
      await store.getTooltipController().hideAllTooltips()
      resolve()
    })
  },
  flashObjects: ({ commit, state, store }, { objectIds }) => {
    return new Promise(async (resolve) => {
      store.state.objectConfig.pageload_animation = 'flash'
      let text = `.imp-object.imp-object-pageload-animation {
        transition-duration: 350ms;
      }`
      store.getObjectController().stylesheet.innerHTML += text
      store.getObjectController().animateObjects()
      resolve()
    })
  },
  disablePageloadAnimation: ({ commit, state, store }) => {
    return new Promise(async (resolve) => {
      if (!storedPageloadAnimation) storedPageloadAnimation = store.state.objectConfig.pageload_animation
      store.state.objectConfig.pageload_animation = 'none'
      resolve()
    })
  },
  enablePageloadAnimation: ({ commit, state, store }) => {
    return new Promise(async (resolve) => {
      if (storedPageloadAnimation) store.state.objectConfig.pageload_animation = storedPageloadAnimation
      resolve()
    })
  },
}
