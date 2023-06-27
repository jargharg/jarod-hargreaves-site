import { defineStore } from 'pinia'

import { Filter, StereoWidener, NoiseSynth, MembraneSynth, Volume } from 'tone'
import { useToneStore } from './tone'

export const useSnareStore = defineStore('snare', {
  state: () => ({ synth: null }),

  actions: {
    create () {
      const toneStore = useToneStore()

      const filter = new Filter({ frequency: 12000, type: 'lowpass' })
      const stereoWidener = new StereoWidener(1)

      this.noise = new NoiseSynth({
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

      this.volume = new Volume(-12).connect(toRaw(toneStore.masterOut))

      toRaw(this.noise).chain(filter, stereoWidener, toRaw(this.volume))
      toRaw(this.top).chain(toRaw(this.volume))
    },

    play (t) {
      toRaw(this.noise).triggerAttackRelease('16n', t)
      toRaw(this.top).triggerAttackRelease('a2', '16n', t)
    },
  },
})
