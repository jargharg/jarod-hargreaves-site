<template>
  <CtaButton class="sequence__button" no-padding :aria-label="`Play ${store}`" @click="onClick">
    <ul
      class="sequence"
      :class="{
        [`sequence--active bg-brand-${color}`]: isPlaying && pattern[sequenceIndex],
      }"
    >
      <li
        v-for="(isActive, index) in pattern"
        :key="index"
        class="cell"
        :class="{
          'cell--playing': index === sequenceIndex,
          '!opacity-100': !isInitialised,
        }"
      >
        <svg
          viewBox="0 0 10 10"
          class="h-full w-full stroke-current fill-none"
          role="presentation"
        >
          <path
            v-if="isActive"
            vector-effect="non-scaling-stroke"
            d="M0,0 L10,10 M10,0 L0,10"
          />
          <circle
            v-else
            vector-effect="non-scaling-stroke"
            cx="5"
            cy="5"
            r="2"
          />
        </svg>
      </li>
    </ul>
  </CtaButton>
</template>

<script>
import { useKickStore } from '~/stores/kick'
import { useSnareStore } from '~/stores/snare'
import { useToneStore } from '~/stores/tone'

export default {
  props: {
    store: {
      type: String,
      required: true,
    },

    color: {
      type: String,
      default: 'green',
    },
  },

  setup (props) {
    const synthStore =
      props.store === 'kick' ? useKickStore() : useSnareStore()

    const pattern = toRef(synthStore, 'pattern')

    const toneStore = useToneStore()
    const isInitialised = toRef(toneStore, 'isInitialised')
    const isPlaying = toRef(toneStore, 'isPlaying')

    const sequenceIndex = computed(() => {
      return toneStore.position.sequence
    })

    const onClick = () => {
      synthStore.play()
    }

    return {
      isInitialised,
      isPlaying,
      onClick,
      pattern,
      sequenceIndex,
    }
  },
}
</script>

<style lang="scss" scoped>
.sequence {
  @apply grid grid-cols-4 h-full w-full gap-1 p-1 transition-colors duration-300;

  &--active {
    @apply text-brand-background duration-0;
  }

  &__button {
    @apply block transition-colors duration-300;
    @apply active:bg-brand-yellow active:text-brand-background active:duration-0;
  }
}

.cell {
  @apply duration-500 opacity-25 transition-opacity;

  &--playing {
    @apply opacity-100 duration-0;
  }
}
</style>
