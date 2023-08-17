<template>
  <ContentBlock heading="About">
    <div class="about">
      <p>
        Freelance creative web developer based in Manchester, UK. I make
        inclusive, accessible, responsive, performant, <em>fun</em> websites and
        apps.
      </p>

      <p>
        Big on JavaScript (ESNext, Nuxt, Vue, Angular, React), CSS, semantic and
        a11y-focussed HTML, web animations (GSAP / CSS / Lottie), and the odd
        bit of sound design.
      </p>

      <p>
        Past workplace highlights include
        <a
          href="https://www.studiotreble.com/"
          target="_blank"
          class="underline hover:no-underline underline-offset-2"
        >Studio Treble</a>,
        <a
          href="https://www.moneysupermarket.com/"
          target="_blank"
          class="underline hover:no-underline underline-offset-2"
        >MoneySuperMarket</a>, and
        <a
          href="https://www.itsoneiota.com/"
          target="_blank"
          class="underline hover:no-underline underline-offset-2"
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
