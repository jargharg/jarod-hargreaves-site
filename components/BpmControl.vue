<template>
  <SliderControl
    uuid="bpm"
    name="bpm"
    :value="bpm"
    max="200"
    min="60"
    step="1"
    @on-input="onInput"
  >
    Speed
  </SliderControl>
</template>

<script>
import { useToneStore } from '~/stores/tone'

export default {
  setup () {
    const toneStore = useToneStore()
    const bpm = toRef(toneStore, 'bpm')

    const onInput = (value) => {
      toneStore.setBpm(value)
    }

    return { onInput, bpm }
  },
}
</script>
