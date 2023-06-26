<template>
  <button
    class="absolute bottom-6 left-1/2 -translate-x-1/2 text-white rounded-full border-2 border-white h-32 w-32 p-8"
    @click="onClickToggle"
  >
    <svg viewBox="0 0 10 10" fill="currentColor" class="h-full w-full">
      <g v-if="isPlaying">
        <path d="M1,0 h3 v10 h-3 Z" />
        <path d="M6,0 h3 v10 h-3 Z" />
      </g>
      <g v-else>
        <path d="M2,0 L10,5 L2,10 Z" />
      </g>
    </svg>
  </button>
</template>

<script>
import { useToneStore } from '~/stores/tone'

export default {
  setup () {
    const toneStore = useToneStore()
    const onClickToggle = toneStore.toggleAudio
    const isPlaying = toRef(toneStore, 'isPlaying')

    const toggleOnPressSpace = (event) => {
      if (event.code === 'Space') {
        onClickToggle()
      }
    }

    onMounted(() => {
      addEventListener('keydown', toggleOnPressSpace)
    })

    onUnmounted(() => {
      removeEventListener('keydown', toggleOnPressSpace)
    })

    return { isPlaying, onClickToggle }
  },
}
</script>

<style>
</style>
