<template>
  <SliderControl
    uuid="kick"
    name="kick"
    :value="kickValue"
    max="0"
    min="-100"
    step="1"
    @on-input="onInput"
  >
    <div>Kick</div>
  </SliderControl>
</template>

<script>
import { useKickStore } from '~/stores/kick'

export default {
  setup () {
    const kickStore = useKickStore()
    const kickValue = ref(-70)

    const decaySettings = { min: 0.05, max: 7 }
    const releaseSettings = { min: 0.1, max: 10 }

    const onInput = (value) => {
      kickValue.value = value
      const decay =
        (decaySettings.max - decaySettings.min) / (1 - value) +
        decaySettings.min

      const release =
        (releaseSettings.max - releaseSettings.min) / (1 - value) +
        releaseSettings.min

      toRaw(kickStore.body).set({
        envelope: {
          decay,
          release,
        },
      })
    }

    return { kickValue, onInput }
  },
}
</script>
