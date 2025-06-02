import { getObjectIndexWithTitle, getImageMapWithName, isMobile } from 'Editor/scripts/utilities'
import { queueAction } from 'Client/scripts/actionQueue'

window.ImageMapPro.highlightObject = async function (imageMapName, objectTitle) {
  let map = ImageMapPro.instances[imageMapName]
  if (!map) return false

  let obj = map.store.getObjectByTitle({ title: objectTitle })
  if (!obj) return false

  let artboardId = map.store.getArtboardIdForObject({ id: obj.id })
  if (!artboardId) return false

  await map.store.dispatch('changeArtboard', { artboardId, zoomOut: true })

  queueAction({
    name: 'highlightObject',
    action: async () => {
      return new Promise(async resolve => {
        await map.store.dispatch('highlightObject', { objectId: obj.id, showTooltip: false, hideAllTooltips: false })
        resolve()
      })
    }
  })
}
window.ImageMapPro.unhighlightObject = async function (imageMapName, objectTitle) {
  let map = ImageMapPro.instances[imageMapName]
  if (!map) return false

  let obj = map.store.getObjectByTitle({ title: objectTitle })
  if (!obj) return false

  let artboardId = map.store.getArtboardIdForObject({ id: obj.id })
  if (!artboardId) return false

  await map.store.dispatch('changeArtboard', { artboardId, zoomOut: true })

  queueAction({
    name: 'unhighlightObject',
    action: async () => {
      return new Promise(async resolve => {
        await map.store.dispatch('unhighlightObject', { objectId: obj.id })
        resolve()
      })
    }
  })
}
window.ImageMapPro.focusObject = async function (imageMapName, objectTitle) {
  let map = ImageMapPro.instances[imageMapName]
  if (!map) return false

  let obj = map.store.getObjectByTitle({ title: objectTitle })
  if (!obj) return false

  let artboardId = map.store.getArtboardIdForObject({ id: obj.id })
  if (!artboardId) return false

  await map.store.dispatch('changeArtboard', { artboardId, zoomOut: true })

  queueAction({
    name: 'focusObject',
    action: async () => {
      return new Promise(async resolve => {
        await map.store.dispatch('focusObject', { objectId: obj.id, showTooltip: false })
        resolve()
      })
    }
  })
}
window.ImageMapPro.showTooltip = async function (imageMapName, objectTitle) {
  let map = ImageMapPro.instances[imageMapName]
  if (!map) return false

  let obj = map.store.getObjectByTitle({ title: objectTitle })
  if (!obj) return false

  let artboardId = map.store.getArtboardIdForObject({ id: obj.id })
  if (!artboardId) return false

  await map.store.dispatch('changeArtboard', { artboardId, zoomOut: true })

  queueAction({
    name: 'showTooltip',
    action: async () => {
      return new Promise(async resolve => {
        map.store.getTooltipController().disableStickyTooltips()
        await map.store.dispatch('showTooltip', { objectId: obj.id })
        map.store.getTooltipController().resetStickyTooltips()
        resolve()
      })
    }
  })
}
window.ImageMapPro.hideTooltip = async function (imageMapName, objectTitle) {
  let map = ImageMapPro.instances[imageMapName]
  if (!map) return false

  let obj = map.store.getObjectByTitle({ title: objectTitle })
  if (!obj) return false

  let artboardId = map.store.getArtboardIdForObject({ id: obj.id })
  if (!artboardId) return false

  await map.store.dispatch('changeArtboard', { artboardId, zoomOut: true })

  queueAction({
    name: 'hideTooltip',
    action: async () => {
      return new Promise(async resolve => {
        await map.store.dispatch('hideTooltip', { objectId: obj.id })
        resolve()
      })
    }
  })
}
window.ImageMapPro.reInitMap = function (imageMapName) {
  let map = ImageMapPro.instances[imageMapName]
  if (!map) return false

  map.init()
}
window.ImageMapPro.isMobile = function () {
  return isMobile()
}
window.ImageMapPro.changeArtboard = function (imageMapName, artboardTitle) {
  let map = ImageMapPro.instances[imageMapName]
  if (!map) return false

  let artboard = map.store.getArtboardByTitle({ title: artboardTitle })
  if (!artboard) return false

  queueAction({
    name: 'changeArtboard',
    action: async () => {
      return new Promise(async resolve => {
        await map.store.dispatch('changeArtboard', { artboardId: artboard.id, zoomOut: true })
        resolve()
      })
    }
  })
}
window.ImageMapPro.zoomIn = function (imageMapName) {
  let map = ImageMapPro.instances[imageMapName]
  if (!map) return false

  queueAction({
    name: 'zoomIn',
    action: async () => {
      return new Promise(async resolve => {
        await map.store.dispatch('zoomIn', {})
        resolve()
      })
    }
  })
}
window.ImageMapPro.zoomOut = function (imageMapName) {
  let map = ImageMapPro.instances[imageMapName]
  if (!map) return false

  queueAction({
    name: 'zoomOut',
    action: async () => {
      return new Promise(async resolve => {
        await map.store.dispatch('zoomOut', {})
        resolve()
      })
    }
  })
}
window.ImageMapPro.flashObjects = function (imageMapName) {
  let map = ImageMapPro.instances[imageMapName]
  if (!map) return false

  queueAction({
    name: 'flashObjects',
    action: async () => {
      return new Promise(async resolve => {
        await map.store.dispatch('flashObjects', {})
        resolve()
      })
    }
  })
}
