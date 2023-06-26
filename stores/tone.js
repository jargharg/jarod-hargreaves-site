import { defineStore } from 'pinia'

import * as Tone from 'tone'

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
      position: 0,
      masterOut: {},
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

      this.masterOut = new Tone.Volume(0).toDestination()
    },

    setVolume (targetVolume) {
      this.masterOut.value = targetVolume
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
  },
})
