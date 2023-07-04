<template>
  <div class="controls">
    <div class="controls__control">
      <PlayButton />
    </div>

    <div class="flex bg-brand-background">
      <KickControl class="hidden md:block" />
      <FilterControl />
    </div>

    <div class="controls__control">
      <SequenceIndicator store="snare" color="green" />
    </div>

    <SignpostBar class="rotate-180" />

    <div class="controls__center" />

    <SideBar>
      <template #default>
        <span>
          <span class="not-sr-only">((((</span>
          Sound on
          <span class="not-sr-only">))))</span>
        </span>
      </template>

      <template #afterInit>
        <span class="group">
          <a
            target="_blank"
            href="https://github.com/jargharg/jarod-hargreaves-site"
          >
            <span class="opacity-0 group-hover:opacity-100 transition-opacity">
              See it on
            </span>

            <span class="group-hover:underline">
              GitHub
            </span>
          </a>
        </span>
      </template>
    </SideBar>

    <div class="controls__control">
      <SequenceIndicator store="kick" color="blue" />
    </div>

    <div class="flex bg-brand-background">
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
  @apply fixed inset-0 grid z-20 pointer-events-none;
  --sequencer-border-width: theme("spacing.10");

  @screen xl {
    --sequencer-border-width: theme("spacing.14");
  }

  box-shadow: 0 100px 0 100px theme("colors.brand-background");

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
