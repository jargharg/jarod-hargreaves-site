<template>
  <div class="flex flex-col">
    <div class="text-xs font-mono text-center border-b border-brand-outline">
      kick
    </div>

    <div class="kick-control__items flex-1">
      <button
        :class="{ 'kick-control__item--active': activeSetting === 'short' }"
        class="kick-control__item col-span-3"
        @click="onClick('short')"
      >
        Short
      </button>

      <button
        :class="{ 'kick-control__item--active': activeSetting === 'medium' }"
        class="kick-control__item col-span-5"
        @click="onClick('medium')"
      >
        Medium
      </button>

      <button
        :class="{ 'kick-control__item--active': activeSetting === 'long' }"
        class="kick-control__item col-span-8"
        @click="onClick('long')"
      >
        Long
      </button>
    </div>
  </div>
</template>

<script>
import { useKickStore } from '~/stores/kick'

export default {
  setup () {
    const kickStore = useKickStore()
    const kickVolume = toRef(kickStore, 'volume')
    const activeSetting = ref('medium')

    const kickSettings = {
      short: { envelope: { decay: 0.05, release: 0.1 } },
      medium: { envelope: { decay: 0.4, release: 0.5 } },
      long: { envelope: { decay: 2, release: 4 } },
    }

    const onClick = (setting) => {
      activeSetting.value = setting
      toRaw(kickStore.synth).set(kickSettings[setting])
    }

    const onInputVolume = ({ target }) => {
      kickStore.setVolume(target.valueAsNumber)
    }

    return { activeSetting, kickVolume, onClick, onInputVolume }
  },
}
</script>

<style lang="scss" scoped>
.kick-control {
  &__items {
    @apply grid;
    grid-template-columns: repeat(16, 1fr);
  }

  &__item {
    @apply px-5 border-r border-brand-outline font-mono text-xs tracking-wide;

    &--active {
      @apply bg-brand-blue bg-opacity-20;
    }
  }
}
</style>
