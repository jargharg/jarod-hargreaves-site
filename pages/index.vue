<template>
  <article>
    <SequencerControls />

    <div class="main">
      <div class="ring-1 ring-brand-outline">
        <NameSequencer class="main__sequencer" />

        <div class="flex-1 grid md:grid-cols-2 w-full">
          <AboutBlock class="md:border-r" />
          <ProjectsBlock />
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { useToneStore } from '~/stores/tone'
import { addSeoToHead } from '~/composables/addSeoToHead'

export default {
  setup () {
    const toneStore = useToneStore()

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
    })

    onUnmounted(() => {
      removeEventListener('keydown', toggleOnPressSpace)
    })
  },
}
</script>

<style lang="scss" scoped>
.main {
  @apply w-full h-full min-h-screen relative overflow-scroll p-10 xl:p-14;

  &__sequencer {
    height: calc(100vh - 140px);

    @screen xl {
      height: calc(100vh - 190px);
    }
  }
}
</style>
