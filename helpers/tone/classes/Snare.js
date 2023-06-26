import * as Tone from 'tone'

export class Snare {
  constructor () {
    const lowPass = new Tone.Filter({
      frequency: 8000,
    })
    const stereoWidener = new Tone.StereoWidener(1)

    this.noise = new Tone.NoiseSynth({
      volume: -20,
      noise: {
        type: 'white',
        playbackRate: 3,
      },
      envelope: {
        attack: 0.001,
        decay: 0.2,
        sustain: 0.15,
        release: 1.5,
      },
    })

    this.top = new Tone.MembraneSynth({
      volume: -20,
      pitchDecay: 0.02,
      octaves: 2,
      oscillator: {
        type: 'sine',
      },
      envelope: {
        attack: 0.001,
        decay: 0.4,
        sustain: 0.3,
        release: 1.4,
        attackCurve: 'exponential',
      },
    })

    this.noise
      .connect(lowPass)
      .connect(stereoWidener)
      .toDestination()

    this.top
      .connect(lowPass)
      .connect(stereoWidener)
      .toDestination()
  }

  play (t) {
    this.noise.triggerAttackRelease('16n', t)
    this.top.triggerAttackRelease('a2', '16n', t)
  }
}
