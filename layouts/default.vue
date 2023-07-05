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

      script: [
        {
          hid: 'cloudflare-beacon',
          src: 'https://static.cloudflareinsights.com/beacon.min.js',
          'data-cf-beacon': '{"token": "ce6e19f76a4f4cba9aafac5cfb144b22"}',
          defer: true,
        },
      ],
    }))

    return { defaultTransition }
  },
}
</script>
