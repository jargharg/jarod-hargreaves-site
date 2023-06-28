<template>
  <div class="name-grid-item" :class="{ 'name-grid-item--key': isKey }">
    <div class="name-grid-item__letter">
      {{ letter }}
    </div>

    <div class="name-grid-item__content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    letter: {
      type: String,
      required: true,
    },

    isKey: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.name-grid-item {
  $root: &;
  @apply transition-colors duration-700 rounded-3xl relative overflow-hidden;

  &__content,
  &__letter {
    @apply absolute inset-0 flex items-center justify-center transition-opacity duration-500;
  }

  &__letter {
    @apply uppercase font-mono;
    font-size: 13.5vw;
  }

  &__content {
    @apply font-body opacity-0;
    width: calc(50vw - theme('spacing.6'));
  }

  &--key {
    @apply text-orange-500 font-bold;
  }

  @screen md {
    &:hover {
      @apply bg-brand-outline text-brand-background;

      #{$root}__letter {
        @apply opacity-0;
      }

      #{$root}__content {
        @apply opacity-100 delay-300;
      }
    }
  }
}
</style>
