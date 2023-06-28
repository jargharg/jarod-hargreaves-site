<template>
  <article>
    <div class="controls">
      <div class="controls__control">
        <PlayButton />
      </div>

      <div class="flex gap-px bg-brand-background">
        <KickControl class="hidden md:block" />
        <FilterControl />
      </div>

      <div class="controls__control">
        <SequenceIndicator store="snare" color="green" />
      </div>

      <div />

      <div class="controls__center" />

      <div />

      <div class="controls__control">
        <SequenceIndicator store="kick" color="blue" />
      </div>

      <div class="flex gap-px bg-brand-background">
        <VolumeControl class="hidden md:block" />
        <BpmControl />
      </div>

      <div class="controls__control">
        <StopButton />
      </div>
    </div>

    <div class="main">
      <div class="ring-1 ring-brand-outline">
        <NameSequencer class="main__sequencer" />

        <div class="flex-1 grid md:grid-cols-2 w-full">
          <BioBlock class="md:border-r" />
          <ProjectsBlock />
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { useToneStore } from '~/stores/tone'

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
.controls {
  @apply fixed inset-0 h-screen w-full grid overflow-hidden z-20 pointer-events-none;
  --sequencer-border-width: theme("spacing.10");

  @screen xl {
    --sequencer-border-width: theme("spacing.14");
  }

  grid-template:
    ". . ." var(--sequencer-border-width)
    ". center ." auto
    ". . ." var(--sequencer-border-width)
    / var(--sequencer-border-width) auto var(--sequencer-border-width);

  > * {
    @apply pointer-events-auto bg-brand-background;
  }

  &__center {
    grid-area: center;
    @apply pointer-events-none border border-brand-outline bg-transparent;
  }

  &__control {
    @apply aspect-square w-full ring-1 ring-brand-outline z-10;
  }
}

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
