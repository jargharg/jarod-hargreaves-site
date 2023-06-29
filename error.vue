<template>
  <div>
    <div
      class="h-screen bg-brand-background text-brand-text text-base-mobile lg:text-base p-10 xl:p-16"
    >
      <div
        class="h-full p-10 border border-brand-outline flex flex-col items-center justify-center font-light font-body tracking-tighter"
      >
        <h1
          class="text-3xl font-mono font-bold tracking-widest text-brand-green"
        >
          404
        </h1>

        <p class="mb-4 max-w-xs text-center text-base">
          Oh no, you've gone down the WRONG ROAD.
        </p>

        <CtaButton class="!border border-brand-outline" to="/">
          Back to safety
        </CtaButton>
      </div>
    </div>

    <NoiseOverlay />
  </div>
</template>

<script>
import defaultTransition from '~/composables/defaultTransition'
import { useA11yStore } from '~/stores/a11y'

export default {
  setup () {
    const route = useRoute()

    const a11yStore = useA11yStore()
    const reducedMotion = computed(() => a11yStore.reducedMotion)

    const isCookiePolicyRoute = () => route.fullPath.includes('cookie-policy')
    const isCookieButtonHidden = computed(() => !isCookiePolicyRoute())

    useHead(() => ({
      htmlAttrs: { lang: 'en' },
    }))

    return { defaultTransition, isCookieButtonHidden, reducedMotion }
  },
}
</script>
