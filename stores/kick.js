import { defineStore } from 'pinia'

import * as Tone from 'tone'
import { useToneStore } from './tone'

export const useKickStore = defineStore('kick', {
  state: () => {
    return {
      synth: null,
      volume: -6,
    }
  },

  actions: {
    create () {
      const toneStore = useToneStore()

      const filter = new Tone.Filter({
        frequency: 0,
        type: 'highpass',
        rolloff: -96,
      })

      this.synth = new Tone.MembraneSynth({
        volume: this.volume,
        pitchDecay: 0.02,
        octaves: 10,
        oscillator: {
          type: 'sawtooth',
        },
        envelope: {
          attack: 0.001,
          decay: 0.4,
          sustain: 0.2,
          release: 0.5,
          attackCurve: 'exponential',
        },
      })

      toRaw(this.synth).chain(filter, toRaw(toneStore.masterOut))
    },

    play (t) {
      toRaw(this.synth).triggerAttackRelease('a0', '16n', t)
    },

    setVolume (volume) {
      this.volume = volume

      if (this.synth) {
        toRaw(this.synth).set({ volume })
      }
    },
  },
})
