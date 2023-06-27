<template>
  <div>
    <main
      class="h-full min-h-screen bg-brand-background text-brand-outline text-base-mobile lg:text-base font-light font-body"
    >
      <NuxtPage :transition="defaultTransition" />
    </main>

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
