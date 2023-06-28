<template>
  <ContentBlock heading="Projects">
    <div class="projects__links">
      <CtaButton
        v-for="({ link, label }, index) in links"
        :key="index"
        :href="link"
        class="flex-1"
      >
        {{ label }}
      </CtaButton>
    </div>
  </ContentBlock>
</template>

<script>
export default {
  setup () {
    const links = [
      {
        label: 'Studio Treble',
        link: 'https://www.studiotreble.com/',
      },
      {
        label: 'Purcell',
        link: 'https://www.purcelluk.com/',
      },
      // {
      //   label: 'Walk the Plank',
      //   link: 'https://walktheplank-2023-site.pages.dev/',
      // },
      {
        label: 'Brighter Sound',
        link: 'https://www.brightersound.com/',
      },
      {
        label: 'Autopoetry',
        link: 'https://autopoetry.jarodhargreav.es/',
      },
      // {
      //   label: 'Phil Hargreaves Photography',
      //   link: 'https://philhargreaves.photography/',
      // },
    ]

    return { links }
  },
}
</script>

<style lang="scss" scoped>
.projects {
  &__links {
    @apply h-full w-full flex flex-col items-stretch;
  }
}
</style>
