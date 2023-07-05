<template>
  <div>
    <div
      class="h-[100dvh] bg-brand-background text-brand-text text-base-mobile lg:text-base p-10 xl:p-16"
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
export default {
  setup () {
    useHead(() => ({
      htmlAttrs: { lang: 'en' },
    }))
  },
}
</script>
