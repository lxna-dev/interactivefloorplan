import { queueAction } from 'Client/scripts/actionQueue'
import { ready, getObjectIndexWithTitle, getImageMapWithName } from 'Editor/scripts/utilities'

ready(() => {
  ImageMapPro.subscribe(action => {
    if (action.type == 'mapInit') {
      // Highlight
      document.querySelectorAll('[data-imp-highlight-object-on-mouseover]').forEach(el => {
        el.addEventListener('mouseover', handleHighlightObjectOnMouseover)
      })
      document.querySelectorAll('[data-imp-highlight-object-on-mouseover]').forEach(el => {
        el.addEventListener('mouseout', handleHighlightObjectOnMouseover_Out)
      })
      document.querySelectorAll('[data-imp-unhighlight-object-on-mouseover]').forEach(el => {
        el.addEventListener('mouseover', handleUnhighlightObjectOnMouseover)
      })
      document.querySelectorAll('[data-imp-highlight-object-on-click]').forEach(el => {
        el.addEventListener('click', handleHighlightObjectOnClick)
      })
      document.querySelectorAll('[data-imp-unhighlight-object-on-click]').forEach(el => {
        el.addEventListener('click', handleUnhighlightObjectOnClick)
      })

      // Tooltip
      document.querySelectorAll('[data-imp-show-tooltip-on-mouseover]').forEach(el => {
        el.addEventListener('mouseover', handleShowTooltipOnMouseover)
      })
      document.querySelectorAll('[data-imp-show-tooltip-on-mouseover]').forEach(el => {
        el.addEventListener('mouseout', handleShowTooltipOnMouseover_Out)
      })
      document.querySelectorAll('[data-imp-show-tooltip-on-click]').forEach(el => {
        el.addEventListener('click', handleShowTooltipOnClick)
      })
      document.querySelectorAll('[data-imp-hide-tooltip-on-mouseover]').forEach(el => {
        el.addEventListener('mouseover', handleHideTooltipOnMouseover)
      })
      document.querySelectorAll('[data-imp-hide-tooltip-on-click]').forEach(el => {
        el.addEventListener('click', handleHideTooltipOnClick)
      })

      // Trigger
      document.querySelectorAll('[data-imp-trigger-object-on-mouseover]').forEach(el => {
        el.addEventListener('mouseover', handleTriggerObjectOnMouseover)
      })
      document.querySelectorAll('[data-imp-trigger-object-on-mouseover]').forEach(el => {
        el.addEventListener('mouseout', handleTriggerObjectOnMouseover_Out)
      })
      document.querySelectorAll('[data-imp-trigger-object-on-click]').forEach(el => {
        el.addEventListener('click', handleTriggerObjectOnClick)
      })
      document.querySelectorAll('[data-imp-untrigger-object-on-mouseover]').forEach(el => {
        el.addEventListener('mouseover', handleUntriggerObjectOnMouseover)
      })
      document.querySelectorAll('[data-imp-untrigger-object-on-click]').forEach(el => {
        el.addEventListener('click', handleUntriggerObjectOnClick)
      })

      // Focus
      document.querySelectorAll('[data-imp-focus-object-on-mouseover]').forEach(el => {
        el.addEventListener('mouseover', handleFocusObjectOnMouseover)
      })
      document.querySelectorAll('[data-imp-focus-object-on-click]').forEach(el => {
        el.addEventListener('click', handleFocusObjectOnClick)
      })

      // Layers
      document.querySelectorAll('[data-imp-change-artboard]').forEach(el => {
        el.addEventListener('click', handleChangeArtboard)
      })

      // Deprecated ======================================================

      // data-imp-highlight-shape-on-mouseover
      // data-imp-highlight-shape-on-click
      // data-imp-unhighlight-shape-on-mouseover
      // data-imp-unhighlight-shape-on-click

      // data-imp-open-tooltip-on-mouseover
      // data-imp-open-tooltip-on-click
      // data-imp-close-tooltip-on-mouseover
      // data-imp-close-tooltip-on-click

      // data-imp-trigger-shape-on-mouseover
      // data-imp-trigger-shape-on-click
      // data-imp-untrigger-shape-on-mouseover
      // data-imp-untrigger-shape-on-click

      // data-imp-focus-shape-on-click
      // data-imp-focus-shape-on-mouseover

      // data-imp-go-to-floor

      // Highlight
      document.querySelectorAll('[data-imp-highlight-shape-on-mouseover]').forEach(el => {
        el.dataset.impHighlightObjectOnMouseover = el.dataset.impHighlightShapeOnMouseover
        el.addEventListener('mouseover', handleHighlightObjectOnMouseover)
      })
      document.querySelectorAll('[data-imp-highlight-shape-on-mouseover]').forEach(el => {
        el.addEventListener('mouseout', handleHighlightObjectOnMouseover_Out)
      })
      document.querySelectorAll('[data-imp-unhighlight-shape-on-mouseover]').forEach(el => {
        el.dataset.impUnhighlightObjectOnMouseover = el.dataset.impUnhighlightShapeOnMouseover
        el.addEventListener('mouseover', handleUnhighlightObjectOnMouseover)
      })
      document.querySelectorAll('[data-imp-highlight-shape-on-click]').forEach(el => {
        el.dataset.impHighlightObjectOnClick = el.dataset.impHighlightShapeOnClick
        el.addEventListener('click', handleHighlightObjectOnClick)
      })
      document.querySelectorAll('[data-imp-unhighlight-shape-on-click]').forEach(el => {
        el.dataset.impUnhighlightObjectOnClick = el.dataset.impUnhighlightShapeOnClick
        el.addEventListener('click', handleUnhighlightObjectOnClick)
      })

      // Tooltip
      document.querySelectorAll('[data-imp-open-tooltip-on-mouseover]').forEach(el => {
        el.dataset.impShowTooltipOnMouseover = el.dataset.impOpenTooltipOnMouseover
        el.addEventListener('mouseover', handleShowTooltipOnMouseover)
      })
      document.querySelectorAll('[data-imp-open-tooltip-on-mouseover]').forEach(el => {
        el.addEventListener('mouseout', handleShowTooltipOnMouseover_Out)
      })
      document.querySelectorAll('[data-imp-open-tooltip-on-click]').forEach(el => {
        el.dataset.impShowTooltipOnClick = el.dataset.impOpenTooltipOnClick
        el.addEventListener('click', handleShowTooltipOnClick)
      })
      document.querySelectorAll('[data-imp-close-tooltip-on-mouseover]').forEach(el => {
        el.dataset.impHideTooltipOnMouseover = el.dataset.impCloseTooltipOnMouseover
        el.addEventListener('mouseover', handleHideTooltipOnMouseover)
      })
      document.querySelectorAll('[data-imp-close-tooltip-on-click]').forEach(el => {
        el.dataset.impHideTooltipOnClick = el.dataset.impCloseTooltipOnClick
        el.addEventListener('click', handleHideTooltipOnClick)
      })

      // Trigger
      document.querySelectorAll('[data-imp-trigger-shape-on-mouseover]').forEach(el => {
        el.dataset.impTriggerObjectOnMouseover = el.dataset.impTriggerShapeOnMouseover
        el.addEventListener('mouseover', handleTriggerObjectOnMouseover)
      })
      document.querySelectorAll('[data-imp-trigger-shape-on-mouseover]').forEach(el => {
        el.addEventListener('mouseout', handleTriggerObjectOnMouseover_Out)
      })
      document.querySelectorAll('[data-imp-trigger-shape-on-click]').forEach(el => {
        el.dataset.impTriggerObjectOnClick = el.dataset.impTriggerShapeOnClick
        el.addEventListener('click', handleTriggerObjectOnClick)
      })
      document.querySelectorAll('[data-imp-untrigger-shape-on-mouseover]').forEach(el => {
        el.dataset.impUntriggerObjectOnMouseover = el.dataset.impUntriggerShapeOnMouseover
        el.addEventListener('mouseover', handleUntriggerObjectOnMouseover)
      })
      document.querySelectorAll('[data-imp-untrigger-shape-on-click]').forEach(el => {
        el.dataset.impUntriggerObjectOnClick = el.dataset.impUntriggerShapeOnClick
        el.addEventListener('click', handleUntriggerObjectOnClick)
      })

      // Focus
      document.querySelectorAll('[data-imp-focus-shape-on-mouseover]').forEach(el => {
        el.dataset.impFocusObjectOnMouseover = el.dataset.impFocusShapeOnMouseover
        el.addEventListener('mouseover', handleFocusObjectOnMouseover)
      })
      document.querySelectorAll('[data-imp-focus-shape-on-click]').forEach(el => {
        el.dataset.impFocusObjectOnClick = el.dataset.impFocusShapeOnClick
        el.addEventListener('click', handleFocusObjectOnClick)
      })

      // Layers
      document.querySelectorAll('[data-imp-go-to-floor]').forEach(el => {
        el.dataset.impChangeArtboard = el.dataset.impGoToFloor
        el.addEventListener('click', handleChangeArtboard)
      })
    }
  })
})

// Highlight
async function handleHighlightObjectOnMouseover(e) {
  let objectTitle = this.dataset.impHighlightObjectOnMouseover
  let imageMapName = this.dataset.impImageMapName

  let map = ImageMapPro.instances[imageMapName] || ImageMapPro.instances[Object.keys(ImageMapPro.instances)[0]]
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
async function handleHighlightObjectOnMouseover_Out() {
  let imageMapName = this.dataset.impImageMapName

  let map = ImageMapPro.instances[imageMapName] || ImageMapPro.instances[Object.keys(ImageMapPro.instances)[0]]
  if (!map) return false

  queueAction({
    name: 'unhighlightAllObjects',
    action: async () => {
      return new Promise(async resolve => {
        await map.store.dispatch('unhighlightAllObjects')
        resolve()
      })
    }
  })
}
async function handleUnhighlightObjectOnMouseover(e) {
  let objectTitle = this.dataset.impUnhighlightObjectOnMouseover
  let imageMapName = this.dataset.impImageMapName

  let map = ImageMapPro.instances[imageMapName] || ImageMapPro.instances[Object.keys(ImageMapPro.instances)[0]]
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
        await map.store.dispatch('unhighlightObject', { objectId: obj.id })
        resolve()
      })
    }
  })
}
async function handleHighlightObjectOnClick(e) {
  let objectTitle = this.dataset.impHighlightObjectOnClick
  let imageMapName = this.dataset.impImageMapName

  let map = ImageMapPro.instances[imageMapName] || ImageMapPro.instances[Object.keys(ImageMapPro.instances)[0]]
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
async function handleUnhighlightObjectOnClick(e) {
  let objectTitle = this.dataset.impUnhighlightObjectOnClick
  let imageMapName = this.dataset.impImageMapName

  let map = ImageMapPro.instances[imageMapName] || ImageMapPro.instances[Object.keys(ImageMapPro.instances)[0]]
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

// Tooltip
async function handleShowTooltipOnMouseover(e) {
  let objectTitle = this.dataset.impShowTooltipOnMouseover
  let imageMapName = this.dataset.impImageMapName

  let map = ImageMapPro.instances[imageMapName] || ImageMapPro.instances[Object.keys(ImageMapPro.instances)[0]]
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
        await map.store.dispatch('showTooltip', { objectId: obj.id })
        resolve()
      })
    }
  })
}
async function handleShowTooltipOnMouseover_Out() {
  let imageMapName = this.dataset.impShowTooltipOnMouseover

  let map = ImageMapPro.instances[imageMapName] || ImageMapPro.instances[Object.keys(ImageMapPro.instances)[0]]
  if (!map) return false

  queueAction({
    name: 'hideAllTooltips',
    action: async () => {
      return new Promise(async resolve => {
        await map.store.dispatch('hideAllTooltips')
        resolve()
      })
    }
  })
}
async function handleHideTooltipOnMouseover(e) {
  let objectTitle = this.dataset.impHideTooltipOnMouseover
  let imageMapName = this.dataset.impImageMapName

  let map = ImageMapPro.instances[imageMapName] || ImageMapPro.instances[Object.keys(ImageMapPro.instances)[0]]
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
async function handleShowTooltipOnClick(e) {
  let objectTitle = this.dataset.impShowTooltipOnClick
  let imageMapName = this.dataset.impImageMapName

  let map = ImageMapPro.instances[imageMapName] || ImageMapPro.instances[Object.keys(ImageMapPro.instances)[0]]
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
        await map.store.dispatch('showTooltip', { objectId: obj.id, showTooltip: false, hideAllTooltips: false })
        resolve()
      })
    }
  })
}
async function handleHideTooltipOnClick(e) {
  let objectTitle = this.dataset.impHideTooltipOnClick
  let imageMapName = this.dataset.impImageMapName

  let map = ImageMapPro.instances[imageMapName] || ImageMapPro.instances[Object.keys(ImageMapPro.instances)[0]]
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

// Trigger
async function handleTriggerObjectOnMouseover(e) {
  let objectTitle = this.dataset.impTriggerObjectOnMouseover
  let imageMapName = this.dataset.impImageMapName

  let map = ImageMapPro.instances[imageMapName] || ImageMapPro.instances[Object.keys(ImageMapPro.instances)[0]]
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
        await map.store.dispatch('highlightObject', { objectId: obj.id, showTooltip: true, hideAllTooltips: false })
        resolve()
      })
    }
  })
}
async function handleTriggerObjectOnMouseover_Out() {
  let imageMapName = this.dataset.impImageMapName

  let map = ImageMapPro.instances[imageMapName] || ImageMapPro.instances[Object.keys(ImageMapPro.instances)[0]]
  if (!map) return false

  queueAction({
    name: 'unhighlightAllObjects',
    action: async () => {
      return new Promise(async resolve => {
        await map.store.dispatch('unhighlightAllObjects')
        resolve()
      })
    }
  })
}
async function handleUntriggerObjectOnMouseover(e) {
  let objectTitle = this.dataset.impUntriggerObjectOnMouseover
  let imageMapName = this.dataset.impImageMapName

  let map = ImageMapPro.instances[imageMapName] || ImageMapPro.instances[Object.keys(ImageMapPro.instances)[0]]
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
        await map.store.dispatch('unhighlightObject', { objectId: obj.id })
        resolve()
      })
    }
  })
}
async function handleTriggerObjectOnClick(e) {
  let objectTitle = this.dataset.impTriggerObjectOnClick
  let imageMapName = this.dataset.impImageMapName

  let map = ImageMapPro.instances[imageMapName] || ImageMapPro.instances[Object.keys(ImageMapPro.instances)[0]]
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
        await map.store.dispatch('highlightObject', { objectId: obj.id, showTooltip: true, hideAllTooltips: false })
        resolve()
      })
    }
  })
}
async function handleUntriggerObjectOnClick(e) {
  let objectTitle = this.dataset.impUntriggerObjectOnClick
  let imageMapName = this.dataset.impImageMapName

  let map = ImageMapPro.instances[imageMapName] || ImageMapPro.instances[Object.keys(ImageMapPro.instances)[0]]
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

// Focus
async function handleFocusObjectOnMouseover(e) {
  let objectTitle = this.dataset.impFocusObjectOnMouseover
  let imageMapName = this.dataset.impImageMapName

  let map = ImageMapPro.instances[imageMapName] || ImageMapPro.instances[Object.keys(ImageMapPro.instances)[0]]
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
async function handleFocusObjectOnClick(e) {
  let objectTitle = this.dataset.impFocusObjectOnClick
  let imageMapName = this.dataset.impImageMapName

  let map = ImageMapPro.instances[imageMapName] || ImageMapPro.instances[Object.keys(ImageMapPro.instances)[0]]
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

// Layers
async function handleChangeArtboard(e) {
  let artboardTitle = this.dataset.impChangeArtboard
  let imageMapName = this.dataset.impImageMapName

  let map = ImageMapPro.instances[imageMapName] || ImageMapPro.instances[Object.keys(ImageMapPro.instances)[0]]
  if (!map) return false

  let artboard = map.store.getArtboardByTitle({ title: artboardTitle })
  if (!artboard) return false

  await map.store.dispatch('changeArtboard', { artboardId: artboard.id, zoomOut: true })
}