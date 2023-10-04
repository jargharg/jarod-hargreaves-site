import { defineStore } from 'pinia'

import * as Tone from 'tone'
import { useToneStore } from './tone'
import useCommonSynthActions, { mapPatternToBooleans } from '~/helpers/commonSynthActions'

export const useSnareStore = defineStore('snare', {
  state: () => {
    return {
      top: null,
      pattern: mapPatternToBooleans('....x.......x...'),
      // pattern: mapPatternToBooleans('................'),
      body: null,
      volume: 0,
      volumeNode: null,
    }
  },

  actions: {
    ...useCommonSynthActions(),

    create () {
      const toneStore = useToneStore()

      const filter = new Tone.Filter({ frequency: 12000, type: 'lowpass' })
      const stereoWidener = new Tone.StereoWidener(1)

      this.top = new Tone.NoiseSynth({
        noise: {
          type: 'pink',
          playbackRate: 50,
        },
        envelope: {
          attack: 0.001,
          decay: 0.2,
          sustain: 0.15,
          release: 0.4,
        },
      })

      this.body = new Tone.MembraneSynth({
        volume: -10,
        pitchDecay: 0.04,
        octaves: 2.5,
        oscillator: {
          type: 'sine',
        },
        envelope: {
          attack: 0.001,
          decay: 0.4,
          sustain: 0.1,
          release: 0.2,
          attackCurve: 'exponential',
        },
      })

      this.volumeNode = new Tone.Volume(this.volume).connect(toRaw(toneStore.masterOut))

      toRaw(this.top).chain(stereoWidener, toRaw(this.volumeNode))
      toRaw(this.body).chain(filter, toRaw(this.volumeNode))

      toneStore.scheduleRepeat((t) => {
        if (this.pattern[toneStore.position.sequence]) {
          this.play(t)
        }
      })
    },

    play (t) {
      if (!this.top || !this.body) {
        return
      }

      toRaw(this.top).triggerAttackRelease('16n', t)
      toRaw(this.body).triggerAttackRelease('b2', '16n', t)
    },
  },
})
