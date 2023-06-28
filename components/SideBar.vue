<template>
  <div class="sidebar" :class="{ 'sidebar--active': !isInitialised }">
    <transition name="fade">
      <slot v-if="!isInitialised" />
    </transition>
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
  @apply flex items-center justify-end py-4 xl:py-5 font-mono tracking-widest text-xs xl:text-sm;
  writing-mode: vertical-rl;
  text-orientation: sideways;
  animation: jiggle 1s infinite alternate linear;

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

.fade-leave-active {
  @apply transition-opacity duration-500;
}

.fade-leave-to {
  @apply opacity-0;
}
</style>
