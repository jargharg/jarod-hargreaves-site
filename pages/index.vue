<template>
  <article class="synth">
    <div class="control">
      <PlayButton />
    </div>

    <div />

    <div class="control">
      <SequenceIndicator />
    </div>

    <div />

    <div class="synth__sequencer">
      <NameSequencer class="h-1/2 w-full" />
    </div>

    <div />
    <!-- <VolumeControl /> -->

    <div class="control">
      <SequenceIndicator />
    </div>

    <div />

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
      if (event.target.tagName.toUpperCase() === 'BUTTON') {
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
  @apply h-screen w-full grid;
  --sequencer-border-width: theme("spacing.10");

  @screen md {
    --sequencer-border-width: theme("spacing.20");
  }

  grid-template:
    ". . ." var(--sequencer-border-width)
    ". sequencer ." auto
    ". . ." var(--sequencer-border-width)
    / var(--sequencer-border-width) auto var(--sequencer-border-width);

  &__sequencer {
    @apply w-full h-full border border-brand-outline relative;
  }
}

.control {
  @apply aspect-square w-full ring-1 ring-brand-outline;
}
</style>
