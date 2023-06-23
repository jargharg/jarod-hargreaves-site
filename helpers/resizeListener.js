const DELAY = 100
const callbacks = {}

export function initResizeListener () {
  let timeout = null

  Object.keys(callbacks).forEach((key) => {
    delete callbacks[key]
  })

  window.addEventListener('resize', () => {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      Object.values(callbacks).forEach(cb => cb())
    }, DELAY)
  })
}

export function addResizeListener (cb) {
  if (!cb) {
    throw new Error('No callback provided')
  }

  const id = crypto?.randomUUID?.() ?? Math.random()
  callbacks[id] = cb
  return id
}

export function removeResizeListener (id) {
  if (id && callbacks[id]) {
    delete callbacks[id]
    return true
  }

  return false
}
