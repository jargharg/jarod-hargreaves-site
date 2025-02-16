<template>
  <ContentBlock heading="About">
    <div class="about">
      <p>
        Creative web developer based in Manchester, UK. I make inclusive, accessible, responsive, performant,
        <em>fun</em> websites and apps.
      </p>

      <p>
        Handy with JavaScript (ESNext, Nuxt, Vue, Angular, React), CSS, semantic and accessible HTML, web animations
        (GSAP / CSS / SVG), Shopify, and the odd bit of sound design.
      </p>

      <p>
        Past workplace highlights include
        <a
          href="https://persona.studio/"
          target="_blank"
          class="underline hover:decoration-transparent underline-offset-2 transition-colors"
        >Persona Studio</a>,
        <a
          href="https://www.studiotreble.com/"
          target="_blank"
          class="underline hover:decoration-transparent underline-offset-2 transition-colors"
        >Studio Treble</a>,
        <a
          href="https://www.moneysupermarket.com/"
          target="_blank"
          class="underline hover:decoration-transparent underline-offset-2 transition-colors"
        >MoneySuperMarket</a>, and
        <a
          href="https://www.itsoneiota.com/"
          target="_blank"
          class="underline hover:decoration-transparent underline-offset-2 transition-colors"
        >One iota</a>.
      </p>

      <p>
        <em>Fancy working with me?</em>
        Get in touch &darr;
      </p>
    </div>
  </ContentBlock>
</template>

<style lang="scss" scoped>
.about {
  @apply p-3 lg:p-5 text-sm tracking-tighter;

  p:not(:last-child) {
    @apply mb-2;
  }

  a {
    &:focus-visible {
      @apply outline outline-brand-text outline-offset-4 outline-2;
    }
  }
}
</style>
