<template>
  <div class="volume-control">
    <input
      id="volume"
      type="range"
      name="volume"
      min="-96"
      max="0"
      step="0.01"
      orient="vertical"
      class="volume-control__control"
      :value="volume"
      @change="onInputVolume"
    >
  </div>
</template>

<script>
import { useToneStore } from '~/stores/tone'

export default {
  setup () {
    const toneStore = useToneStore()
    const volume = computed(() => toRaw(toneStore.volume).value)

    const onInputVolume = (event) => {
      toneStore.setVolume(event.target.value)
    }

    return { onInputVolume, volume }
  },
}
</script>

<style lang="scss" scoped>
.volume-control {
  @apply p-5;

  &__control {
    @apply h-full w-full;
    -webkit-appearance: slider-vertical;

    /* Special styling for WebKit/Blink */
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      border: 1px solid #000000;
      height: 36px;
      width: 16px;
      border-radius: 3px;
      background: #ffffff;
      cursor: pointer;
      margin-top: -14px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; /* Add cool effects to your sliders! */
    }

    /* All the same stuff for Firefox */
    &::-moz-range-thumb {
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
      border: 1px solid #000000;
      height: 36px;
      width: 16px;
      border-radius: 3px;
      background: #ffffff;
      cursor: pointer;
    }
  }
}
</style>
