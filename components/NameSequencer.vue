<template>
  <div class="sequencer">
    <div class="sequencer__inner">
      <ul
        v-for="(row, rowKey) in rows"
        :key="`row${rowKey}`"
        class="sequencer__row"
      >
        <li
          v-for="(cell, cellIndex) in row"
          :key="`row${rowKey}-cell${cellIndex}`"
        >
          <button
            class="sequencer__cell"
            :class="{
              'sequencer__cell--active': cell.active,
              'sequencer__cell--key': rowKey === 'snare',
              'sequencer__cell--playing': cellIndex === sequencePosition,
            }"
            @mouseenter="onMouseOverCell(rowKey, cellIndex)"
            @mousedown="onMouseDownCell(rowKey, cellIndex)"
          >
            {{ cell.label }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useToneStore } from '@/stores/tone'
import { useKickStore } from '@/stores/kick'
import { useSnareStore } from '@/stores/snare'
// import { usePadStore } from '@/stores/pad'

export default {
  setup () {
    const toneStore = useToneStore()
    const kick = useKickStore()
    const snare = useSnareStore()
    // const pad = usePadStore()

    const createCells = (letters) => {
      return letters.map((letter) => {
        return {
          label: letter,
          active: false,
        }
      })
    }

    const setActiveCellsFromStore = (store, row) => {
      store.pattern.forEach(
        (isActive, index) => (row[index].active = isActive),
      )
    }

    const rows = reactive({
      snare: createCells('Jarod.Hargreaves'.split('')),
      kick: createCells('Creative.Web.Dev'.split('')),
    })

    const sequencePosition = computed(() => toneStore.position?.sequence)

    let isMouseDown = false

    const setMouseDownTrue = () => {
      isMouseDown = true
    }

    const setMouseDownFalse = () => {
      isMouseDown = false
    }

    onMounted(() => {
      document.addEventListener('mousedown', setMouseDownTrue)
      document.addEventListener('mouseup', setMouseDownFalse)
    })

    onUnmounted(() => {
      document.removeEventListener('mousedown', setMouseDownTrue)
      document.removeEventListener('mouseup', setMouseDownFalse)
    })

    const onMouseOverCell = (rowKey, cellIndex) => {
      if (isMouseDown) {
        const store = rowKey === 'kick' ? kick : snare
        store.togglePatternStep(cellIndex)
      }
    }

    const onMouseDownCell = (rowKey, cellIndex) => {
      const store = rowKey === 'kick' ? kick : snare
      store.togglePatternStep(cellIndex)
    }

    watch(
      () => toneStore.isInitialised,
      () => {
        kick.create()
        snare.create()
        // pad.create()
      },
      { once: true },
    )

    watch(
      () => kick.pattern,
      () => {
        setActiveCellsFromStore(kick, rows.kick)
      },
      { immediate: true },
    )

    watch(
      () => snare.pattern,
      () => {
        setActiveCellsFromStore(snare, rows.snare)
      },
      { immediate: true },
    )

    return { onMouseDownCell, onMouseOverCell, rows, sequencePosition }
  },
}
</script>

<style lang="scss" scoped>
.sequencer {
  @apply flex flex-col items-center justify-center;

  &__inner {
    @apply relative w-full h-full flex flex-col gap-px bg-brand-outline;
  }

  &__row {
    @apply flex-1 grid gap-px w-full bg-brand-background grid-cols-4 md:grid-cols-8;

    @screen lg {
      grid-template-columns: repeat(16, 1fr);
    }
  }

  &__cell {
    $cell: &;
    @apply relative flex flex-col items-center justify-center w-full h-full;
    @apply font-mono font-bold leading-none text-brand-blue text-opacity-75;
    @apply outline-none select-none;
    @apply transition-colors duration-300;

    -webkit-text-stroke: 1px theme("colors.brand-text");
    font-size: max(theme("fontSize.2xl"), 7vw);

    &:focus-visible {
      @apply outline outline-brand-text -outline-offset-4 outline-2;
    }

    &:hover::after {
      @apply opacity-50;
    }

    &::before,
    &::after {
      content: "";
      @apply absolute inset-0 opacity-0 transition-opacity duration-300 z-10;
    }

    &::after {
      @apply mix-blend-color-dodge;
      background: radial-gradient(circle, #aaa 20%, transparent 200%);
    }

    &::before {
      box-shadow: 0 0 10px 5px #fff3;
    }

    &--active {
      @apply text-brand-blue text-opacity-75;
      @apply bg-brand-blue bg-opacity-50;
      @apply after:opacity-10;
      @apply outline-1 -outline-offset-4;
      outline-color: theme("colors.brand-text" / 0.75);
    }

    &--key {
      @apply text-brand-green text-opacity-75;
      &#{$cell}--active {
        @apply bg-brand-green bg-opacity-50;
      }
    }

    &--playing {
      @apply duration-0;
      @apply after:opacity-100 after:duration-0;

      &#{$cell}--active {
        @apply text-brand-background duration-0;
        @apply before:opacity-100 before:duration-0;
      }
    }
  }
}
</style>
