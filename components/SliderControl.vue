<template>
  <div class="slider-control">
    <label v-if="$slots.default" :for="uuid" class="slider-control__label">
      <slot />
    </label>

    <input
      :id="uuid"
      type="range"
      v-bind="{ max, min, name, step, value }"
      orient="vertical"
      class="slider-control__input"
      @input="$emit('on-input', +$event.target.value)"
    >
  </div>
</template>

<script>
export default {
  props: {
    uuid: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    value: {
      type: Number,
      default: 0,
    },

    max: {
      type: String,
      default: '100',
    },

    min: {
      type: String,
      default: '0',
    },

    step: {
      type: String,
      default: '1',
    },
  },

  emits: ['on-input'],
}
</script>

<style lang="scss" scoped>
.slider-control {
  @apply relative w-full h-full;
  background-image: radial-gradient(
    circle at 50% 50%,
    theme("colors.brand-outline" / 0.5) 1px,
    transparent 0
  );
  background-size: 0.85rem 0.85rem;

  @screen xl {
    background-size: 1.2rem 1.2rem;
  }

  &::after {
    content: "";
    @apply absolute inset-0 opacity-0 transition-opacity duration-300 z-10 mix-blend-color-dodge pointer-events-none;
    background: radial-gradient(circle, #666 40%, transparent 200%);
  }

  &:hover {
    @apply after:opacity-100;
  }

  &__input {
    @apply appearance-none w-full h-full bg-transparent overflow-hidden outline-none cursor-pointer border-r border-brand-outline;

    &::-webkit-slider-thumb {
      @apply h-20 w-px bg-brand-outline appearance-none mt-0;
      box-shadow: -9999px 0 0 9999px theme("colors.brand-background");
    }

    &::-moz-range-thumb {
      @apply h-20 w-px bg-brand-outline appearance-none mt-0;
      box-shadow: -9999px 0 0 9999px theme("colors.brand-background");
    }

    &:focus-visible {
      @apply outline outline-brand-text -outline-offset-4 outline-2;
    }
  }

  &__label {
    @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none;
    @apply bg-brand-background text-brand-text font-mono tracking-widest text-xs xl:text-sm;
    @apply pointer-events-none select-none;
  }
}
</style>
