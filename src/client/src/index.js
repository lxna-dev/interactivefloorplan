import 'ClientAssets/index.css'

import 'Client/globals.js'
import 'Client/api/hooks.js'
import 'Client/api/hooksDeprecated.js'
import 'Client/api/functions.js'
import 'Client/api/functionsDeprecated.js'
import 'Client/api/html.js'
import { ImageMap } from 'Client/imageMap'

let launchParamsDefaults = {
  artboardId: undefined,
  isFullscreen: false,
}

export function init(selector, config, launchParams = launchParamsDefaults) {
  let imageMap = new ImageMap(selector, config, launchParams)
  window.ImageMapPro.instances[config.general?.name || 'Default'] = imageMap
}

window.ImageMapPro.init = init

// [Deprecated] jQuery support
if (typeof $ !== 'undefined') {
  $.fn['imageMapPro'] = function (config) {
    ImageMapPro.init(this[0], config)
  }
}

// Used for debugging on mobile

let debugConsole = undefined
let debugInterval = undefined
let debugTimeout = undefined

window.debug = function (str) {
  if (!debugConsole) {
    debugConsole = document.createElement('div')
    debugConsole.setAttribute('id', 'debug')
    document.querySelector('body').appendChild(debugConsole)
  }

  debugConsole.innerHTML = str

  debugConsole.style.transitionProperty = 'none'
  debugConsole.style.opacity = 1

  clearInterval(debugInterval)
  clearTimeout(debugTimeout)
  debugTimeout = setTimeout(() => {
    debugInterval = setInterval(() => {
      debugConsole.style.opacity = debugConsole.style.opacity * 0.75
      if (debugConsole.style.opacity < 0.1) {
        debugConsole.style.opacity = 0
        clearInterval(debugInterval)
      }
    }, 50)
  }, 1000)
}

window.print = window.debug
// window.print('test123')
