<template>
  <div class="projects">
    <h2 class="projects__heading">
      Projects
    </h2>

    <div class="projects__links">
      <a
        v-for="({ link, label }, index) in links"
        :key="index"
        :href="link"
        target="_blank"
        class="projects__link"
      >
        {{ label }}
      </a>
    </div>
  </div>
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
        label: 'Phil Hargreaves Photography',
        link: 'https://philhargreaves.photography/',
      },
    ]

    return { links }
  },
}
</script>

<style lang="scss" scoped>
.projects {
  @apply flex flex-col border-t border-brand-background bg-brand-green text-brand-background;

  &__heading {
    @apply tracking-widest font-mono text-xl text-center p-2 border-b border-brand-background bg-brand-outline;
  }

  &__links {
    @apply h-full w-full flex flex-col items-stretch;
  }

  &__link {
    @apply relative flex-1 flex items-center justify-center p-4 font-mono tracking-wider;
    @apply border-b last-of-type:border-0 border-brand-background;
    @apply hover:after:opacity-50;

    &::after {
      content: "";
      @apply absolute inset-0 opacity-0 transition-opacity duration-300 z-10;
      @apply mix-blend-color-dodge;
      background: radial-gradient(circle, #aaa 40%, transparent 200%);
    }
  }
}
</style>
