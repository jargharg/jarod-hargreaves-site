<template>
  <button
    class="h-full w-full p-2"
    :class="{ 'bg-brand-red': isPlaying, 'bg-brand-green': !isPlaying }"
    @click="onClickStop"
  >
    <svg
      viewBox="0 0 10 10"
      stroke="currentColor"
      stroke-width="1px"
      class="h-full w-full overflow-visible fill-brand-background"
    >
      <g v-if="isPlaying">
        <path d="M1,1 h8 v8 h-8 Z" vector-effect="non-scaling-stroke" />
      </g>
      <g v-else>
        <path
          d="M1.5,0.5 L9.5,5 L1.5,9.5 Z"
          vector-effect="non-scaling-stroke"
        />
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
