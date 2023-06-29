<template>
  <ContentBlock heading="About">
    <div class="about">
      <p>
        Creative web developer based in Manchester, UK. I make responsive,
        perfomant, accessible, <em>fun</em> websites and apps.
      </p>

      <p>
        Big on JavaScript (ESNext, Nuxt, Vue, Angular, React), CSS, semantic and
        a11y-focussed HTML, web animations (GSAP / CSS / Lottie), and sound
        design.
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
        Currently looking for new work &mdash;
        <em>could it be with you?</em>
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
}
</style>
