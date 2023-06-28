<template>
  <client-only>
    <div class="noise-overlay" />
  </client-only>
</template>

<style scoped lang="scss">
.noise-overlay {
  @apply fixed left-0 top-0 pointer-events-none select-none mix-blend-hard-light z-50;
  animation: rotate steps(1) infinite 0.35s;
  background: url("https://i.ibb.co/g7RxJDR/noisy-texture-100x100-o7-000000000000001-d10-c-ffffff-t1.png");

  width: max(100vw, 100vh);
  height: max(100vw, 100vh);
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
