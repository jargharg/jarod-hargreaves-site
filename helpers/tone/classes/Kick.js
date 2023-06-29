import { MembraneSynth, Filter } from 'tone'
import { useToneStore } from '~/stores/tone'

export class Kick {
  constructor () {
    const toneStore = useToneStore()

    this.synth = new MembraneSynth({
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
    })

    const filter = new Filter({
      frequency: 10000,
    })

    this.synth
      .connect(filter, 'highpass')
      .connect(toneStore.masterOut)
  }

  play (t) {
    this.synth.triggerAttackRelease('a0', '16n', t)
  }
}
