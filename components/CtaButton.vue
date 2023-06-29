<template>
  <component
    :is="componentType"
    v-if="$slots.default"
    class="cta-button"
    :class="classModifiers"
    v-bind="boundAttrs"
    @click="$emit('click')"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'CtaButton',

  props: {
    noPadding: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['click'],

  setup (props, { attrs }) {
    const componentType = computed(() => {
      if (attrs.to) {
        return resolveComponent('NuxtLink')
      }

      if (attrs.href) {
        return 'a'
      }

      if (attrs.dummy) {
        return 'div'
      }

      return 'button'
    })

    const boundAttrs = computed(() => {
      const boundAttrs = { ...(attrs ?? {}) }

      if (attrs.href) {
        boundAttrs.target = '_blank'
      }

      return boundAttrs
    })

    const classModifiers = computed(() => {
      return [{
        'p-4': !props.noPadding,
      }]
    })

    return { boundAttrs, componentType, classModifiers }
  },
}
</script>

<style lang="scss" scoped>
.cta-button {
  @apply relative flex items-center justify-center;
  @apply font-mono tracking-wider;
  @apply border-b last-of-type:border-0 border-brand-outline outline-none;

  &:not(:disabled) {
    @apply hover:after:opacity-50;
  }

  &:focus-visible {
    @apply outline outline-brand-text -outline-offset-4 outline-2;
  }

  &::after {
    content: "";
    @apply absolute inset-0 opacity-0 transition-opacity duration-300 z-10 pointer-events-none select-none;
    @apply mix-blend-color-dodge;
    background: radial-gradient(circle, #aaa 40%, transparent 200%);
  }
}
</style>
