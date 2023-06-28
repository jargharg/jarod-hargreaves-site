<template>
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

    <SignpostBar class="rotate-180" />

    <div class="controls__center" />

    <SideBar>
      <span>
        <span class="not-sr-only">((((</span>
        Sound on
        <span class="not-sr-only">))))</span>
      </span>
    </SideBar>

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
</template>

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
</style>
