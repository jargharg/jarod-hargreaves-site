<template>
  <button
    class="h-full w-full p-2 transport-button"
    :class="{ 'bg-brand-yellow': isPlaying, 'bg-brand-green': !isPlaying }"
    @click="onClickToggle"
  >
    <svg
      viewBox="0 0 10 10"
      stroke="currentColor"
      stroke-width="1px"
      class="h-full w-full overflow-visible fill-brand-background"
    >
      <g v-if="isPlaying">
        <path d="M1,1 h3 v8 h-3 Z" vector-effect="non-scaling-stroke" />
        <path d="M6,1 h3 v8 h-3 Z" vector-effect="non-scaling-stroke" />
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
    const onClickToggle = toneStore.toggleAudio
    const isPlaying = toRef(toneStore, 'isPlaying')

    return { isPlaying, onClickToggle }
  },
}
</script>

<style>
</style>
