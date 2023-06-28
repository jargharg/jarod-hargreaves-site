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
      bpm: 145,
      filter: 70,
      filterNode: null,
      isInitialised: false,
      isPlaying: false,
      isStopped: true,
      masterOut: null,
      position: { sequence: -1 },
      reverb: { wet: 0.4, decay: 0.8 },
      volume: -3,
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
      this.filterNode = new Tone.Filter({ frequency: this.filter, type: 'highpass', rolloff: -96 })
      this.reverbNode = new Tone.Reverb({ wet: this.reverb.wet, decay: this.reverb.decay, preDelay: 0 })
      const comp = new Tone.Compressor(-30, 20)

      this.masterOut = comp
        .chain(toRaw(this.filterNode), toRaw(this.reverbNode), toRaw(this.volumeNode))
    },

    setFilter (filter) {
      this.filter = filter

      if (!this.filterNode) {
        return
      }

      toRaw(this.filterNode).frequency.value = filter
    },

    setReverb ({ wet, decay }) {
      this.reverb = {
        wet: wet ?? this.reverb.wet,
        decay: decay ?? this.reverb.decay,
      }

      if (!this.reverbNode) {
        return
      }

      if (wet) {
        toRaw(this.reverbNode).wet.value = wet
      }

      if (decay) {
        toRaw(this.reverbNode).decay = decay
      }
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

      this.isStopped = false

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
      this.isStopped = true
      this.isPlaying = false
      this.position = getPosition()
    },

  },
})
