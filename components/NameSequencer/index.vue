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
              'sequencer__cell--playing': cellIndex === sequencePosition,
              'sequencer__cell--key': rowKey === 'kick',
            }"
            @mouseenter="onMouseOverCell(rowKey, cellIndex)"
            @mousedown="cell.active = !cell.active"
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

export default {
  setup () {
    const toneStore = useToneStore()

    const createRows = () => {
      const createCells = (letters) => {
        return letters.map((letter) => {
          return {
            label: letter,
            active: false,
          }
        })
      }

      const rows = reactive({
        snare: createCells('Jarod.Hargreaves'.split('')),
        kick: createCells('Creative.Web.Dev'.split('')),
      })

      const kick = [1, 3, 7, 9, 11, 15]
      kick.forEach(index => (rows.kick[index - 1].active = true))

      const snare = [5, 13]
      snare.forEach(index => (rows.snare[index - 1].active = true))

      return rows
    }

    const rows = createRows()

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
        rows[rowKey][cellIndex].active = !rows[rowKey][cellIndex].active
      }
    }

    watch(
      () => toneStore.isInitialised,
      () => {
        try {
          toneStore.setBpm(145)

          const kick = useKickStore()
          kick.create()

          const snare = useSnareStore()
          snare.create()

          toneStore.scheduleRepeat((t) => {
            if (rows.kick[sequencePosition.value].active) {
              kick.play(t)
            }
            if (rows.snare[sequencePosition.value].active) {
              snare.play(t)
            }
          })
        } catch (e) {
          console.error(e)
        }
      },
      { once: true },
    )

    return { onMouseOverCell, rows, sequencePosition }
  },
}
</script>

<style lang="scss" scoped>
.sequencer {
  @apply h-full w-full flex flex-col items-center justify-center;

  &__inner {
    @apply relative w-full h-full flex flex-col gap-px;
  }

  &__row {
    @apply flex-1 grid gap-px w-full grid-cols-4 md:grid-cols-8;
    @screen lg {
      grid-template-columns: repeat(16, 1fr);
    }
  }

  &__cell {
    $cell: &;
    @apply font-mono text-brand-white leading-none py-5;
    @apply flex flex-col items-center justify-center w-full h-full;
    @apply outline-none focus:outline-none select-none;
    @apply bg-opacity-90 transition-colors duration-75;
    font-size: max(40px, 9.1vw);

    &--playing {
      @apply bg-amber-500 bg-opacity-100;

      &#{$cell}--active {
        @apply bg-amber-300;
      }
    }

    &--active {
      @apply bg-red-500;
    }

    &--key {
      @apply bg-blue-400 bg-opacity-10;

      &#{$cell}--playing {
        @apply bg-amber-500 bg-opacity-100;
      }

      &#{$cell}--active {
        @apply bg-opacity-100;
      }
    }
  }
}
</style>
