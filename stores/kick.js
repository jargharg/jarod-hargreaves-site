import { defineStore } from 'pinia'

import * as Tone from 'tone'
import { useToneStore } from './tone'
import useCommonSynthActions, { mapPatternToBooleans } from '~/helpers/commonSynthActions'

export const useKickStore = defineStore('kick', {
  state: () => {
    return {
      pattern: mapPatternToBooleans('x.x...x.x.x...x.'),
      synth: null,
    }
  },

  actions: {
    ...useCommonSynthActions(),

    create () {
      const toneStore = useToneStore()

      const filter = new Tone.Filter({
        frequency: 0,
        type: 'highpass',
        rolloff: -96,
      })

      this.synth = new Tone.MembraneSynth({
        volume: -10,
        pitchDecay: 0.02,
        octaves: 15,
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

      toneStore.scheduleRepeat((t) => {
        if (this.pattern[toneStore.position.sequence]) {
          this.play(t)
        }
      })
    },

    play (t) {
      if (!this.synth) {
        return
      }

      toRaw(this.synth).triggerAttackRelease('a0', '16n', t)
    },
  },
})
