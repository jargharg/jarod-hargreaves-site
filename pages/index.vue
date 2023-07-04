<template>
  <article>
    <div ref="elMask" class="mask" />

    <SequencerControls ref="elControls" />

    <div ref="elMain" class="main h-full min-h-[100dvh]">
      <h1 class="sr-only">
        Jarod Hargreaves
      </h1>

      <div class="ring-1 ring-brand-outline">
        <NameSequencer class="main__sequencer" />

        <div ref="elDetails" class="main__details">
          <AboutBlock class="main__details__about" />
          <ProjectsBlock class="main__details__projects" />
          <ContactBlock class="main__details__contact" />
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import gsap from 'gsap'
import { useToneStore } from '~/stores/tone'
import { addSeoToHead } from '~/composables/addSeoToHead'

export default {
  setup () {
    const toneStore = useToneStore()

    const elControls = ref(null)
    const elDetails = ref(null)
    const elMain = ref(null)
    const elMask = ref(null)

    const toggleOnPressSpace = (event) => {
      const isTransportButtonFocused = Array.from(
        event.target.classList,
      ).includes('transport-button')

      if (isTransportButtonFocused) {
        return
      }

      if (event.code === 'Space') {
        event.preventDefault()
        toneStore.toggleAudio()
      }

      if (event.code === 'Escape') {
        toneStore.stopAudio()
      }
    }

    onMounted(() => {
      addEventListener('keydown', toggleOnPressSpace)
      const cells = elMain.value.querySelectorAll('.sequencer__cell')
      const details = elDetails.value.children
      const mask = elMask.value
      const main = elMain.value
      const controls = elControls.value.$el

      gsap
        .timeline({ defaults: { ease: 'none' } })
        .set(mask, { autoAlpha: 0, zIndex: -1 })
        .from([main, controls], { opacity: 0, duration: 0.3 })
        .from(
          [cells],
          {
            opacity: 0,
            duration: 1,
            stagger: 0.03,
          },
          '<',
        )
        .from(details, {
          opacity: 0,
          duration: 1,
          stagger: 0.2,
        }, '-=0.9')
        .set([cells, details, main, controls], { clearProps: true })
    })

    onUnmounted(() => {
      removeEventListener('keydown', toggleOnPressSpace)
    })

    const title = 'Jarod Hargreaves | Creative Web Developer'
    const summary = 'Creative Web Developer based in Manchester, UK'
    const primaryImage = {
      meta: { url: '/meta.png', dimensions: { height: 2400, width: 1254 } },
    }

    const route = useRoute()
    const config = useRuntimeConfig()

    addSeoToHead({
      data: { title, summary, primaryImage },
      overrideFullTitle: true,
      route,
      config,
    })

    return { elControls, elDetails, elMain, elMask }
  },
}
</script>

<style lang="scss" scoped>
.mask {
  @apply fixed inset-0 bg-brand-background z-40 pointer-events-none select-none;
}

.main {
  @apply w-full relative overflow-scroll p-10 xl:p-14;

  &__sequencer {
    height: calc(100dvh - 139px);

    @screen xl {
      height: calc(100dvh - 189px);
    }
  }

  &__details {
    @apply grid;
    grid-template:
      "about"
      "contact"
      "projects";

    @screen md {
      grid-template:
        "about projects"
        "contact contact" /1fr 1fr;
    }

    &__about {
      @apply md:border-r border-brand-outline;
      grid-area: about;
    }

    &__projects {
      grid-area: projects;
    }

    &__contact {
      grid-area: contact;
    }
  }
}
</style>
