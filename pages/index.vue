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

    <div class="synth__center">
      <NameSequencer class="col-span-2" />

      <div
        class="flex flex-col items-center justify-center border-t border-r border-brand-outline"
      >
        <h2 class="uppercase tracking-widest">
          Projects
        </h2>
        <span class="text-xs"> (todo) </span>
      </div>

      <div
        class="flex flex-col items-center justify-center border-t border-brand-outline"
      >
        <h2 class="uppercase tracking-widest">
          Bio
        </h2>
        <span class="text-xs"> (todo) </span>
      </div>
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
  @apply h-screen w-full grid;
  --sequencer-border-width: theme("spacing.10");

  @screen md {
    --sequencer-border-width: theme("spacing.20");
  }

  grid-template:
    ". . ." var(--sequencer-border-width)
    ". center ." auto
    ". . ." var(--sequencer-border-width)
    / var(--sequencer-border-width) auto var(--sequencer-border-width);

  &__center {
    @apply w-full h-full border border-brand-outline relative grid grid-cols-2 auto-rows-fr;
    grid-area: center;
  }
}

.control {
  @apply aspect-square w-full ring-1 ring-brand-outline;
}
</style>
