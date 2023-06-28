<template>
  <ContentBlock>
    <ul class="grid grid-cols-2">
      <li
        v-for="({ link, label }, index) in links"
        :key="index"
        :class="{ 'border-r border-brand-outline': index % 2 === 0 }"
      >
        <CtaButton
          :href="link"
          target="_blank"
          class="block w-full text-brand-background font-bold"
          :class="{
            'bg-brand-green': index % 2 === 0,
            'bg-brand-blue': index % 2 === 1,
          }"
        >
          {{ label }}
        </CtaButton>
      </li>
    </ul>
  </ContentBlock>
</template>

<script>
export default {
  setup () {
    const links = [
      {
        label: 'Email',
        link: 'mailto:jarod.hargreaves@gmail.com',
      },
      {
        label: 'LinkedIn',
        link: 'https://www.linkedin.com/in/jarodhargreaves/',
      },
    ]
    return { links }
  },
}
</script>
