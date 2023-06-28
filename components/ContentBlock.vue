<template>
  <div ref="elBlock" class="flex flex-col border-t border-brand-outline">
    <CtaButton
      v-if="heading"
      class="!py-2 bg-brand-outline bg-opacity-10 !border-b border-brand-outline"
      @click="onClickHeading"
    >
      <h2 class="tracking-widest font-mono text-lg xl:text-xl text-center">
        {{ heading }}
      </h2>
    </CtaButton>

    <div class="flex-1">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    heading: {
      type: String,
      default: null,
    },
  },

  setup () {
    const elBlock = ref(null)

    const onClickHeading = () => {
      elBlock.value.scrollIntoView({ behavior: 'smooth' })
    }

    return { elBlock, onClickHeading }
  },
}
</script>
