<template>
  <div ref="elBlock" class="flex flex-col">
    <CtaButton
      v-if="heading"
      class="!py-2 bg-brand-outline bg-opacity-10 !border-b border-brand-outline"
      :disabled="isDisabled"
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
import ScrollTrigger from 'gsap/ScrollTrigger'
export default {
  props: {
    heading: {
      type: String,
      default: null,
    },
  },

  setup (props) {
    const elBlock = ref(null)
    const isDisabled = ref(false)
    let scrollTrigger

    const onClickHeading = () => {
      elBlock.value.scrollIntoView({ behavior: 'smooth' })
    }

    onMounted(() => {
      if (!props.heading) {
        return
      }

      scrollTrigger = ScrollTrigger.create({
        trigger: elBlock.value,
        start: 'top bottom',
        end: 'bottom bottom',
        onToggle ({ isActive }) {
          isDisabled.value = !isActive
        },
      })
    })

    onUnmounted(() => {
      scrollTrigger?.kill()
    })

    return { elBlock, isDisabled, onClickHeading }
  },
}
</script>
