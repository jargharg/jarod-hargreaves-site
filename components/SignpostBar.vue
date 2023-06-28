<template>
  <SideBar class="signpost" :class="{ 'signpost--active': !isInitialised }">
    <button @click.once="onClick">
      <span class="hide-on-mobile">Click or press
        <span class="border border-current py-1">space</span></span>
      <span class="hide-on-desktop">Tap</span> to play &rarr;
    </button>
  </SideBar>
</template>

<script>
import { useToneStore } from '~/stores/tone'

export default {
  setup () {
    const toneStore = useToneStore()
    const isInitialised = toRef(toneStore, 'isInitialised')

    const onClick = () => {
      toneStore.toggleAudio()
    }

    return { isInitialised, onClick }
  },
}
</script>
