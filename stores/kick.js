import { defineStore } from 'pinia'

import * as Tone from 'tone'
import { useToneStore } from './tone'

export const useKickStore = defineStore('kick', {
  state: () => {
    return {
      synth: null,
    }
  },

  actions: {
    create () {
      const toneStore = useToneStore()

      const filter = new Tone.Filter({
        frequency: 10000,
      })

      this.synth = new Tone.MembraneSynth({
        volume: -20,
        pitchDecay: 0.02,
        octaves: 10,
        oscillator: {
          type: 'sawtooth',
        },
        envelope: {
          attack: 0.001,
          decay: 0.4,
          sustain: 0.3,
          release: 0.5,
          attackCurve: 'exponential',
        },
      }).toDestination()

      toRaw(this.synth).connect(toRaw(toneStore.masterOut))
    },

    play (t) {
      toRaw(this.synth).triggerAttackRelease('a0', '16n', t)
    },
  },
})
