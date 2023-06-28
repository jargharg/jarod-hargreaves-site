<template>
  <button
    class="h-full w-full p-2 transport-button outline-none"
    :class="{ 'bg-brand-red': !isStopped, 'bg-brand-green': isStopped }"
    :aria-label="isStopped ? 'Play' : 'Stop'"
    @click="onClickStop"
  >
    <svg
      role="presentation"
      viewBox="0 0 10 10"
      stroke="currentColor"
      stroke-width="1px"
      class="h-full w-full overflow-visible fill-brand-background"
    >
      <g v-if="isStopped">
        <path
          d="M1.5,0.5 L9.5,5 L1.5,9.5 Z"
          vector-effect="non-scaling-stroke"
        />
      </g>
      <g v-else>
        <path d="M1,1 h8 v8 h-8 Z" vector-effect="non-scaling-stroke" />
      </g>
    </svg>
  </button>
</template>

<script>
import { useToneStore } from '~/stores/tone'

export default {
  setup () {
    const toneStore = useToneStore()
    const isStopped = toRef(toneStore, 'isStopped')

    const onClickStop = () => {
      if (isStopped.value) {
        toneStore.toggleAudio()
      } else {
        toneStore.stopAudio()
      }
    }

    return { isStopped, onClickStop }
  },
}
</script>
