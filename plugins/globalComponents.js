import { SizedImage } from '@studiotreble/sized-image'

export default defineNuxtPlugin((nuxtApp) => {
  const components = {
    SizedImage,
  }

  Object.entries(components).forEach(([name, component]) => {
    nuxtApp.vueApp.component(`St${name}`, component)
  })
})
