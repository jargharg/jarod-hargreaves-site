import { defineStore } from 'pinia'

import { Filter, StereoWidener, NoiseSynth, MembraneSynth, Volume } from 'tone'
import { useToneStore } from './tone'
import useCommonSynthActions, { mapPatternToBooleans } from '~/helpers/commonSynthActions'

export const useSnareStore = defineStore('snare', {
  state: () => {
    return {
      top: null,
      pattern: mapPatternToBooleans('....x.......x...'),
      body: null,
      volume: 0,
      volumeNode: null,
    }
  },

  actions: {
    ...useCommonSynthActions(),

    create () {
      const toneStore = useToneStore()

      const filter = new Filter({ frequency: 12000, type: 'lowpass' })
      const stereoWidener = new StereoWidener(1)

      this.top = new NoiseSynth({
        noise: {
          type: 'pink',
          playbackRate: 30,
        },
        envelope: {
          attack: 0.001,
          decay: 0.2,
          sustain: 0.15,
          release: 0.8,
        },
      })

      this.body = new MembraneSynth({
        volume: -16,
        pitchDecay: 0.04,
        octaves: 2.5,
        oscillator: {
          type: 'sine',
        },
        envelope: {
          attack: 0.001,
          decay: 0.4,
          sustain: 0.2,
          release: 1,
          attackCurve: 'exponential',
        },
      })

      this.volumeNode = new Volume(this.volume).connect(toRaw(toneStore.masterOut))

      toRaw(this.top).chain(stereoWidener, toRaw(this.volumeNode))
      toRaw(this.body).chain(filter, toRaw(this.volumeNode))

      toneStore.scheduleRepeat((t) => {
        if (this.pattern[toneStore.position.sequence]) {
          this.play(t)
        }
      })
    },

    play (t) {
      toRaw(this.top).triggerAttackRelease('16n', t)
      toRaw(this.body).triggerAttackRelease('a2', '16n', t)
    },
  },
})
