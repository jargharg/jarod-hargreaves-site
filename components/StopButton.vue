<template>
  <button class="h-full w-full p-2" @click="onClickStop">
    <svg viewBox="0 0 10 10" fill="currentColor" class="h-full w-full">
      <g v-if="isPlaying">
        <path d="M1,1 h8 v8 h-8 Z" />
      </g>
      <g v-else>
        <path d="M1.5,0.5 L9.5,5 L1.5,9.5 Z" />
      </g>
    </svg>
  </button>
</template>

<script>
import { useToneStore } from '~/stores/tone'

export default {
  setup () {
    const toneStore = useToneStore()
    const isPlaying = toRef(toneStore, 'isPlaying')

    const onClickStop = () => {
      if (isPlaying.value) {
        toneStore.stopAudio()
      } else {
        toneStore.toggleAudio()
      }
    }

    return { isPlaying, onClickStop }
  },
}
</script>

<style>
</style>
