<template>
  <ContentBlock>
    <div class="grid grid-cols-2">
      <CtaButton href="mailto:jarod.hargreaves@gmail.com" class="email">
        <span class="email__label"> Email </span>
        <span class="email__email"> jarod.hargreaves@gmail.com </span>
      </CtaButton>

      <CtaButton
        href="https://www.linkedin.com/in/jarodhargreaves/"
        class="text-brand-background font-bold bg-brand-blue"
      >
        LinkedIn
      </CtaButton>
    </div>
  </ContentBlock>
</template>

<style lang="scss" scoped>
.email {
  $email: &;
  @apply text-brand-background font-bold bg-brand-green border-r border-brand-outline;

  &__label {
    @apply block;
  }

  &__email {
    @apply hidden;
  }

  @media (hover: hover) {
    &:hover,
    &:focus {
      #{$email}__label {
        @apply hidden;
      }

      #{$email}__email {
        @apply block;
      }
    }
  }
}
</style>
