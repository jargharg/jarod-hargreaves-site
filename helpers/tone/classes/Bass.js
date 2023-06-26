import * as Tone from 'tone'
import { getPosition } from '@/stores/tone'

export class Bass {
  constructor () {
    const options = {
      harmonicity: 8,
      modulationIndex: 4,
      oscillator: {
        type: 'sine',
      },
      envelope: {
        attack: 0.001,
        decay: 5,
        sustain: 0.1,
        release: 0.1,
      },
      modulation: {
        type: 'square',
      },
      modulationEnvelope: {
        attack: 0.002,
        decay: 4,
        sustain: 0.5,
        release: 0.2,
      },
    }

    this.synth = new Tone.FMSynth(options).toDestination()
    this.synth.volume.value = -15

    this.notes = ['a', 'a', 'g', 'g', 'd', 'd', 'c', 'c', 'f', 'f', 'f', 'a', 'a', 'e', 'd', 'd']
  }

  play (t) {
    const { beat, sixteenths } = getPosition()
    const sequencePosition = beat * 4 + sixteenths

    const note = `${this.notes[sequencePosition]}2`

    this.synth.triggerAttackRelease(note, '16n', t)
  }
}
