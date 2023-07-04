<template>
  <div class="sidebar" :class="{ 'sidebar--active': !isInitialised }">
    <client-only>
      <transition name="fade" mode="out-in">
        <slot v-if="!isInitialised" />
        <slot v-else name="afterInit" />
      </transition>

      <template #placeholder>
        <slot />
      </template>
    </client-only>
  </div>
</template>

<script>
import { useToneStore } from '~/stores/tone'

export default {
  setup () {
    const toneStore = useToneStore()
    const isInitialised = toRef(toneStore, 'isInitialised')

    return { isInitialised }
  },
}
</script>

<style lang="scss" scoped>
.sidebar {
  @apply flex items-center justify-end py-4 xl:py-5 font-mono tracking-widest text-xs xl:text-sm select-none;
  writing-mode: vertical-rl;
  text-orientation: sideways;

  &--active {
    animation: jiggle 1s infinite alternate linear;
  }

  button {
    @apply tracking-widest;
  }
}

@keyframes jiggle {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0.5;
  }
}

.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-500;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>
