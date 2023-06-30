import { defineStore } from 'pinia'

import * as Tone from 'tone'
import { useToneStore } from './tone'
import useCommonSynthActions, { mapPatternToBooleans } from '~/helpers/commonSynthActions'

export const useKickStore = defineStore('kick', {
  state: () => {
    return {
      pattern: mapPatternToBooleans('x.x...x.x.x...x.'),
      // pattern: mapPatternToBooleans('................'),
      body: null,
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

      this.body = new Tone.MembraneSynth({
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

      this.top = new Tone.NoiseSynth({
        volume: -8,
        noise: {
          type: 'brown',
        },
        envelope: {
          attack: 0.001,
          decay: 0.05,
          sustain: 0.1,
          release: 0,
        },
      })

      toRaw(this.body).chain(filter, toRaw(toneStore.masterOut))
      toRaw(this.top).chain(filter, toRaw(toneStore.masterOut))

      toneStore.scheduleRepeat((t) => {
        if (this.pattern[toneStore.position.sequence]) {
          this.play(t)
        }
      })
    },

    play (t) {
      if (!this.body || !this.top) {
        return
      }

      toRaw(this.body).triggerAttackRelease('a0', '16n', t)
      toRaw(this.top).triggerAttackRelease('16n', t)
    },
  },
})
