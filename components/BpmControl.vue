<template>
  <div class="relative w-full h-full">
    <label
      for="bpm"
      class="pointer-events-none absolute inset-0 flex items-center justify-center text-brand-outline uppercase font-mono tracking-widest text-sm mix-blend-difference"
    >
      Speed ({{ bpm }} BPM)
    </label>

    <input
      id="bpm"
      type="range"
      name="bpm"
      min="60"
      max="200"
      step="1"
      orient="vertical"
      class="bpm-control"
      :value="bpm"
      @input="onInputBpm"
    >
  </div>
</template>

<script>
import { useToneStore } from '~/stores/tone'

export default {
  setup () {
    const toneStore = useToneStore()
    const bpm = toRef(toneStore, 'bpm')

    const onInputBpm = (event) => {
      toneStore.setBpm(event.target.value)
    }

    return { onInputBpm, bpm }
  },
}
</script>

<style lang="scss" scoped>
.bpm-control {
  @apply appearance-none w-full h-full bg-transparent overflow-hidden outline-none cursor-pointer border-r border-brand-outline;

  &::-webkit-slider-thumb {
    @apply h-20 w-px bg-brand-outline appearance-none mt-0;
    box-shadow: 9999px 0 0 9999px theme("colors.brand-outline / 0.1");
  }

  &::-moz-range-thumb {
    @apply h-20 w-px bg-brand-outline appearance-none mt-0;
    box-shadow: 9999px 0 0 9999px theme("colors.brand-outline / 0.1");
  }
}
</style>
