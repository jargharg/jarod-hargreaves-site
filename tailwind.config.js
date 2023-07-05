module.exports = {
  content: [
    './error.vue',
    './components/**/*.{js,vue,ts}',
    './slices/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
  ],

  theme: {
    container: false,

    fontSize: {
      xs: '0.75rem', // 12px
      'sm-mobile': '0.875rem', // 14px
      sm: '1rem', // 16px
      'base-mobile': '1rem', // 16px
      base: '1.25rem', // 20px
      md: '1.5rem', // 24px
      lg: '1.75rem', // 28px
      xl: '2.5rem', // 40px
      '2xl': '3rem', // 48px
      '3xl': '5rem', // 80px
    },

    extend: {
      fontFamily: {
        mono: ['mono45-headline', 'monospace'],
        body: ['coordinates', 'monospace'],
      },

      screens: {
        sm: '450px',
        '2xl': '1440px',
      },

      colors: {
        'brand-outline': '#949390',
        'brand-text': '#f0fff9',
        'brand-background': '#141011',
        'brand-green': '#84c873',
        'brand-red': '#d94841',
        'brand-blue': '#8dc3cf',
        'brand-yellow': '#e6eb72',
        'brand-glow': '#aaaaaa',
      },
    },
  },
}
