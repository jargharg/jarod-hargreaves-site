import { defineStore } from 'pinia'

export const useA11yStore = defineStore('a11y', {
  state: () => {
    return {
      reducedMotion: false,
    }
  },
  actions: {
    setAndWatchA11yPreferences () {
      const mediaQueries = {
        reducedMotion: window.matchMedia('(prefers-reduced-motion: no-preference)'),
      }

      const setPreferencesInState = () => {
        this.reducedMotion = !mediaQueries.reducedMotion.matches
      }

      Object.values(mediaQueries).forEach((query) => {
        if (query.addEventListener) {
          query.addEventListener('change', setPreferencesInState)
        }
      })

      setPreferencesInState()
    },
  },
})
