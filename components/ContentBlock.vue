<template>
  <div ref="elBlock" class="flex flex-col border-t border-brand-outline">
    <button class="p-2 border-b border-brand-outline" @click="onClickHeading">
      <h2 class="tracking-widest font-mono text-lg xl:text-xl text-center">
        {{ heading }}
      </h2>
    </button>

    <slot />
  </div>
</template>

<script>
export default {
  props: {
    heading: {
      type: String,
      required: true,
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
