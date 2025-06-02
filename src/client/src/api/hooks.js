import { uuidv4 } from 'Editor/scripts/utilities'

/*
Actions:
  mapInit
  objectHighlight
  objectUnhighlight
  objectClick
  tooltipShow
  tooltipHide
  changeArtboard
*/

let subscribers = {}

window.ImageMapPro.subscribe = cb => {
  // Create a unique ID
  let id = uuidv4()
  subscribers[id] = cb
  return id
}
window.ImageMapPro.unsubscribe = id => {
  delete subscribers[id]
}
window.ImageMapPro.trigger = action => {
  for (let id in subscribers) {
    subscribers[id](action)
  }
}

// Example action object
let exampleAction = {
  type: 'actionName',
  payload: {
    map: 'map name',
    object: 'object title'
  }
}

// Example usage
function runExample() {
  ImageMapPro.subscribe(action => {
    console.log(action)
  })
  ImageMapPro.trigger({
    type: 'someAction',
    payload: {
      map: 'the map',
      object: 'the object',
      layer: 'the layer'
    }
  })
}
// runExample()