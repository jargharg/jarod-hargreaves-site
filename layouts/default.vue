<template>
  <div>
    <main
      class="h-full min-h-[100dvh] bg-brand-background text-brand-text text-base-mobile lg:text-base font-light font-body"
    >
      <NuxtPage :transition="defaultTransition" />
    </main>

    <NoiseOverlay />
  </div>
</template>

<script>
import defaultTransition from '~/composables/defaultTransition'

export default {
  setup () {
    useHead(() => ({
      htmlAttrs: { lang: 'en' },
    }))

    return { defaultTransition }
  },
}
</script>
