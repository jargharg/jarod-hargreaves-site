<template>
  <client-only>
    <div class="noise-overlay" />
  </client-only>
</template>

<style scoped lang="scss">
.noise-overlay {
  @apply fixed left-0 top-0 pointer-events-none select-none mix-blend-hard-light z-50 opacity-75;
  @apply motion-reduce:hidden;
  animation: rotate steps(1) infinite 0.35s;
  background: url("/noise.png");
  width: 100vmax;
  height: 100vmax;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  25% {
    transform: rotate(0.25turn);
  }

  50% {
    transform: rotate(0.5turn);
  }

  75% {
    transform: rotate(0.75turn);
  }
}
</style>
