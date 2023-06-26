import { defineStore } from 'pinia'

import { Filter, StereoWidener, NoiseSynth, MembraneSynth } from 'tone'
import { useToneStore } from './tone'

export const useSnareStore = defineStore('snare', {
  state: () => ({ synth: null }),

  actions: {
    create () {
      const toneStore = useToneStore()

      const filter = new Filter({ frequency: 8000 })
      const stereoWidener = new StereoWidener(1)

      this.noise = new NoiseSynth({
        volume: -20,
        noise: {
          type: 'white',
          playbackRate: 3,
        },
        envelope: {
          attack: 0.001,
          decay: 0.2,
          sustain: 0.15,
          release: 1.5,
        },
      })

      this.top = new MembraneSynth({
        volume: -20,
        pitchDecay: 0.02,
        octaves: 2,
        oscillator: {
          type: 'sine',
        },
        envelope: {
          attack: 0.001,
          decay: 0.4,
          sustain: 0.3,
          release: 1.4,
          attackCurve: 'exponential',
        },
      })

      toRaw(this.noise).chain(filter, stereoWidener, toRaw(toneStore.masterOut))
      toRaw(this.top).chain(toRaw(toneStore.masterOut))
    },

    play (t) {
      toRaw(this.noise).triggerAttackRelease('16n', t)
      toRaw(this.top).triggerAttackRelease('a2', '16n', t)
    },
  },
})
