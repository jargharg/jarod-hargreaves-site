import { defineStore } from 'pinia'

import * as Tone from 'tone'
import { useToneStore } from './tone'
import useCommonSynthActions from '~/helpers/commonSynthActions'

export const usePadStore = defineStore('pad', {
  state: () => {
    return {
      synth: null,
      chords: [
        ['e4', 'g4', 'b4'],
        ['d4', 'f#4', 'b4'],
        ['d4', 'f#4', 'a4'],
        ['c4', 'e4', 'a4', 'c5'],
      ],
      chordIndex: 0,
    }
  },

  actions: {
    ...useCommonSynthActions(),

    create () {
      const toneStore = useToneStore()

      this.synth = new Tone.PolySynth(Tone.FMSynth, {
        volume: 0,
        oscillator: {
          type: 'fattriangle4',
          spread: 60,
          count: 4,
        },
        envelope: {
          attack: 0.396,
          decay: 0.08,
          sustain: 0.95,
          attackCurve: 'linear',
          releaseCurve: 'sine',
          release: 0.734,
        },
        modulationIndex: 10,
        modulationEnvelope: {
          attack: '1m',
          decay: '1m',
          sustain: 0.7,
          attackCurve: 'sine',
          releaseCurve: 'linear',
          release: 1,
        },
      })

      const reverb = new Tone.Reverb({ wet: 1, decay: 1, preDelay: 0 })
      const tremolo = new Tone.Tremolo(20, 1)
      const lowPass = new Tone.Filter(1800, 'lowpass')

      toRaw(this.synth).chain(reverb, tremolo, lowPass, toRaw(toneStore.masterOut))

      Tone.Transport.scheduleRepeat((t) => {
        toRaw(this.synth).triggerAttackRelease(this.chords[this.chordIndex], '2m', t)

        this.chordIndex =
          this.chordIndex >= this.chords.length - 1 ? 0 : this.chordIndex + 1
      }, '2m')
    },
  },
})
