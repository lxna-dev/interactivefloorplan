// Support for jQuery API
if (typeof $ !== 'undefined') {
  $.imageMapProHighlightShape = window.ImageMapPro.highlightObject
  $.imageMapProUnhighlightShape = window.ImageMapPro.unhighlightObject
  $.imageMapProFocusShape = window.ImageMapPro.focusObject
  $.imageMapProOpenTooltip = window.ImageMapPro.showTooltip
  $.imageMapProHideTooltip = window.ImageMapPro.hideTooltip
  $.imageMapProReInitMap = window.ImageMapPro.reInitMap
  $.imageMapProIsMobile = window.ImageMapPro.isMobile
  $.imageMapProGoToFloor = window.ImageMapPro.changeArtboard
  $.imageMapProZoomIn = window.ImageMapPro.zoomIn
  $.imageMapProZoomOut = window.ImageMapPro.zoomOut
}