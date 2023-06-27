<template>
  <ul class="grid grid-cols-4 h-full w-full gap-px p-1">
    <li
      v-for="(_, index) in Array(sequenceLength).fill()"
      :key="index"
      class="cell"
      :class="{ 'cell--active': index === activeIndex }"
      :style="
        isInitialised
          ? {}
          : { opacity: sequenceLength / (index + 1) / sequenceLength }
      "
    />
  </ul>
</template>

<script>
import { useToneStore, sequenceLength } from '~/stores/tone'

export default {
  setup () {
    const toneStore = useToneStore()
    const isInitialised = toRef(toneStore, 'isInitialised')

    const activeIndex = computed(() => {
      return toneStore.position.sequence
    })

    return { activeIndex, isInitialised, sequenceLength }
  },
}
</script>

<style lang="scss" scoped>
.cell {
  @apply rounded-full duration-1000 border border-brand-outline opacity-0 transition-opacity;

  &--active {
    @apply opacity-100 duration-75;
  }
}
</style>
