import sleep from '~/helpers/sleep'
import { DURATION_IN_MS } from '~/composables/defaultTransition'

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path !== from.path && process.client) {
    await nextTick()
    await sleep(DURATION_IN_MS)
    window.scrollTo({ top: 0 })
  }
})
