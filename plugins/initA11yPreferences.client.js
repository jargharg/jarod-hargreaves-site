import { useA11yStore } from '~/stores/a11y'

export default defineNuxtPlugin(() => {
  const a11yStore = useA11yStore()
  a11yStore.setAndWatchA11yPreferences()
})
