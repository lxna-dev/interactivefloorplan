let queue = []

export function queueAction(action) {
  let l = queue.length

  queue.unshift(action)

  if (l === 0) {
    runAction()
  }
}

async function runAction() {
  await queue[queue.length - 1].action()
  queue.pop()

  if (queue.length > 0) {
    batch()
    runAction()
  }
}

function batch() {
  if (queue.length > 2) {
    let batchedQueue = {}
    for (let action of queue) {
      batchedQueue[action.name] = action
    }

    queue = []
    for (let actionName in batchedQueue) {
      queue.push(batchedQueue[actionName])
    }
  }
}