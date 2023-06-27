import { defineStore } from 'pinia'

import * as Tone from 'tone'

export const sequenceLength = 16

export function getPosition () {
  const [bar, beat, sixteenths] = Tone.Transport.position.split(':')
  const splitSixteenths = +sixteenths.split('.')[0]
  const sequence = +beat * 4 + splitSixteenths

  return { bar: +bar, beat: +beat, sixteenths: splitSixteenths, sequence }
}

export const useToneStore = defineStore('tone', {
  state: () => {
    return {
      bpm: 145,
      isPlaying: false,
      isInitialised: false,
      position: { sequence: -1 },
      masterOut: null,
      volume: -6,
      volumeNode: null,
    }
  },

  actions: {
    scheduleRepeat (cb) {
      return Tone.Transport.scheduleRepeat(cb, '16n')
    },

    setBpm (targetBpm) {
      this.bpm = targetBpm

      if (!this.isInitialised) {
        return
      }

      Tone.Transport.bpm.value = targetBpm
    },

    setupTone () {
      Tone.Transport.bpm.value = 145

      this.scheduleRepeat(() => {
        this.position = getPosition()
      })

      this.volumeNode = new Tone.Volume(this.volume).toDestination()
      toRaw(this.volumeNode).debug = true

      const reverb = new Tone.Reverb({ wet: 0.3, decay: 0.4, preDelay: 0 })
      const comp = new Tone.Compressor(-96, 20)
      const gain = new Tone.Gain(20)
      this.masterOut = reverb
        .connect(comp)
        .connect(gain)
        .connect(toRaw(this.volumeNode))
    },

    setVolume (volume) {
      this.volume = volume

      if (!this.volumeNode) {
        return
      }

      toRaw(this.volumeNode).volume.value = volume
    },

    async toggleAudio () {
      if (!this.isInitialised) {
        await Tone.start()
        this.setupTone()
        this.isInitialised = true
      }

      if (Tone.Transport.state !== 'started') {
        Tone.Transport.start('+0.1')
        this.isPlaying = true
      } else {
        Tone.Transport.pause()
        this.isPlaying = false
      }
    },

    stopAudio () {
      Tone.Transport.stop()
      this.isPlaying = false
    },

  },
})
