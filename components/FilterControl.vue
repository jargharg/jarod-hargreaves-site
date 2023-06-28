<template>
  <SliderControl
    uuid="filter"
    name="filter"
    :value="filterValue"
    max="1000"
    min="70"
    step="1"
    @on-input="onInput"
  >
    <div>Filter</div>
  </SliderControl>
</template>

<script>
import { useToneStore } from '~/stores/tone'

export default {
  setup () {
    const toneStore = useToneStore()
    const filterValue = toRef(toneStore, 'filter')

    const onInput = (value) => {
      toneStore.setFilter(value)
    }

    return { filterValue, onInput }
  },
}
</script>
