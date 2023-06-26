import * as Tone from 'tone'

export class Hat {
  constructor () {
    const highPass = new Tone.Filter(1000, 'highpass')

    const autoFilter = new Tone.AutoFilter('1n').start()

    this.synth = new Tone.NoiseSynth({
      envelope: {
        attack: 0.001,
        decay: 0.1,
        sustain: 0,
        release: 0,
      },
    })
      .connect(autoFilter)
      .connect(highPass)
      .toDestination()

    this.synth.volume.value = -30
  }

  play (t) {
    this.synth.triggerAttackRelease('32n', t)
  }
}
