import { deepExtend } from 'Editor/scripts/utilities'
import getters from 'Client/store/getters'
import actions from 'Client/store/actions'
import mutations from 'Client/store/mutations'

export default class Store {
  imageMap = undefined

  constructor({ initialState, imageMap }) {
    this.imageMap = imageMap

    // Set initial state
    this.setState(initialState)

    // Map getters as properties of the Store
    for (let getterName in getters) {
      this[getterName] = new Proxy(getters[getterName], this.getterProxyHandler)
    }

    this.subscribers = []
    this.mutationSubscribers = []
  }
  getterProxyHandler = {
    apply: function (target, thisArg, argumentsList) {
      target = target.bind(thisArg)
      return target(thisArg.state, ...argumentsList)
    }
  }
  setState(newState = {}) {
    this.state = deepExtend({}, newState)
  }
  commit(mutationName, payload) {
    mutations[mutationName](this.state, payload)

    for (let subscriber of this.mutationSubscribers) {
      subscriber({
        type: mutationName,
        payload
      })
    }
  }
  async dispatch(actionName, payload) {
    let result = actions[actionName]({ commit: this.commit.bind(this), state: this.state, store: this }, payload)

    // console.log('Action: ' + actionName)

    for (let subscriber of this.subscribers) {
      subscriber({
        type: actionName,
        payload
      })
    }

    return result
  }
  subscribe(subscriber) {
    this.subscribers.push(subscriber)
  }
  subscribeMutation(subscriber) {
    this.mutationSubscribers.push(subscriber)
  }
}