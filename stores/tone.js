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
      isPlaying: false,
      isInitialised: false,
      position: { sequence: -1 },
      masterOut: null,
      volume: { value: 1 },
    }
  },

  getters: {
    bpm () {
      return Tone.Transport.bpm.value
    },
  },

  actions: {
    scheduleRepeat (cb) {
      return Tone.Transport.scheduleRepeat(cb, '16n')
    },

    setBpm (targetBpm) {
      Tone.Transport.bpm.value = targetBpm
    },

    setupTone () {
      this.scheduleRepeat(() => {
        this.position = getPosition()
      })

      this.volume = new Tone.Volume(0)
      toRaw(this.volume).debug = true
      console.log(toRaw(this.volume))

      this.reverb = new Tone.Reverb({ wet: 0.3, decay: 0.4, preDelay: 0.2 })
      this.masterOut = toRaw(this.reverb).chain(toRaw(this.volume)).toDestination()
    },

    setVolume (targetVolume) {
      if (!this.volume) {
        return
      }
      console.log('setting', targetVolume)
      console.log(this.volume)

      this.volume.volume.value = targetVolume
      console.log(toRaw(this.volume))
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
