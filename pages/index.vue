<template>
  <article class="synth">
    <div class="control">
      <PlayButton />
    </div>

    <KickControl />

    <div class="control">
      <SequenceIndicator />
    </div>

    <div />

    <div class="synth__center">
      <NameSequencer class="row-span-2 md:row-span-1 md:col-span-2" />

      <BioBlock class="md:border-r" />

      <ProjectsBlock />
    </div>

    <div />

    <div class="control">
      <SequenceIndicator />
    </div>

    <div class="flex gap-px">
      <VolumeControl class="hidden md:block" />
      <BpmControl />
    </div>

    <div class="control">
      <StopButton />
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
        toneStore.toggleAudio()
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
.synth {
  @apply h-screen w-full grid overflow-hidden;
  --sequencer-border-width: theme("spacing.10");

  @screen md {
    --sequencer-border-width: theme("spacing.16");
  }

  grid-template:
    ". . ." var(--sequencer-border-width)
    ". center ." auto
    ". . ." var(--sequencer-border-width)
    / var(--sequencer-border-width) auto var(--sequencer-border-width);

  &__center {
    @apply w-full min-h-full border border-brand-outline relative grid md:grid-cols-2 auto-rows-fr overflow-scroll;
    grid-area: center;
  }
}

.control {
  @apply aspect-square w-full ring-1 ring-brand-outline;
}
</style>
