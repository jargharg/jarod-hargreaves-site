import * as Tone from 'tone'
import { getPosition } from '@/stores/tone'

export class Bleep {
  constructor () {
    const options = {
      harmonicity: 8,
      modulationIndex: 2,
      oscillator: {
        type: 'sine',
      },
      envelope: {
        attack: 0.001,
        decay: 2,
        sustain: 0.1,
        release: 0.1,
      },
      modulation: {
        type: 'square',
      },
      modulationEnvelope: {
        attack: 0.002,
        decay: 0.2,
        sustain: 0,
        release: 0.2,
      },
    }

    const reverb = new Tone.Reverb({
      wet: 0.5,
      decay: 10,
      preDelay: 0,
    }).toDestination()

    this.synth = new Tone.FMSynth(options).connect(reverb)
    this.synth.volume.value = -15

    this.notes = ['a', 'a', 'g', 'g', 'd', 'd', 'c', 'c', 'f', 'f', 'f', 'a', 'a', 'e', 'd', 'd']
  }

  play (t) {
    const { beat, sixteenths } = getPosition()
    const sequencePosition = beat * 4 + sixteenths

    const randomOctave = Math.floor(Math.random() * 3) + 4
    const note = `${this.notes[sequencePosition]}${randomOctave}`

    this.synth.triggerAttackRelease(note, '16n', t)
  }
}
