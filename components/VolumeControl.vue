<template>
  <SliderControl
    uuid="volume"
    name="volume"
    min="-32"
    max="0"
    step="0.2"
    :value="volume"
    @on-input="onInput"
  >
    <div>Volume</div>
  </SliderControl>
</template>

<script>
import { useToneStore } from '~/stores/tone'

export default {
  setup () {
    const toneStore = useToneStore()
    const volume = toRef(toneStore, 'volume')

    const onInput = (value) => {
      toneStore.setVolume(value)
    }

    return { onInput, volume }
  },
}
</script>
