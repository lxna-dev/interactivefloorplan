import * as consts from 'Client/consts'

// Deprecated jQuery API
window.ImageMapPro.subscribe(action => {
  try {
    var jq = window.jQuery || window.$ || $ || jQuery
  } catch (e) {

  }

  if (jq) {
    if (action.type == consts.HOOK_MAP_INIT) {
      jq.imageMapProInitialized?.call(this, action.payload.map)
    }
    if (action.type == consts.HOOK_OBJECT_HIGHLIGHT) {
      jq.imageMapProEventHighlightedShape?.call(this, action.payload.map, action.payload.object)
    }
    if (action.type == consts.HOOK_OBJECT_UNHIGHLIGHT) {
      jq.imageMapProEventUnhighlightedShape?.call(this, action.payload.map, action.payload.object)
    }
    if (action.type == consts.HOOK_OBJECT_CLICK) {
      jq.imageMapProEventClickedShape?.call(this, action.payload.map, action.payload.object)
    }
    if (action.type == consts.HOOK_TOOLTIP_SHOW) {
      jq.imageMapProEventOpenedTooltip?.call(this, action.payload.map, action.payload.object)
    }
    if (action.type == consts.HOOK_TOOLTIP_HIDE) {
      jq.imageMapProEventClosedTooltip?.call(this, action.payload.map, action.payload.object)
    }
    if (action.type == consts.HOOK_ARTBOARD_CHANGE) {
      jq.imageMapProEventSwitchedFloor?.call(this, action.payload.map, action.payload.layer)
    }
  }
})