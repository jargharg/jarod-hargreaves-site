// https://nuxt.com/docs/api/configuration/nuxt-config

const EXCLUDED_SITEMAP_ROUTES = ['/preview/', '/404/', '/slice-simulator/']

export default defineNuxtConfig({
  hooks: {
    'nitro:config' (nitroConfig) {
      if (nitroConfig.dev) { return }
      nitroConfig.prerender.routes.push('/')
      nitroConfig.prerender.routes.push('/robots.txt')
    },
  },

  nitro: {
    preset: 'cloudflare_pages',
    prerender: {
      crawlLinks: false,
    },
  },

  modern: process.env.NODE_ENV !== 'development' ? 'client' : false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: 'en',
    },

    title: 'Jarod Hargreaves | Creative Web Developer',

    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'lang',
        name: 'lang',
        content: 'en',
      },
      {
        hid: 'language',
        name: 'language',
        content: 'English',
      },
      {
        hid: 'description',
        name: 'description',
        content: '',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: '',
      },
      {
        hid: 'og:site_name',
        name: 'og:site_name',
        content: 'Jarod Hargreaves | Creative Web Developer',
      },
      {
        hid: 'og:locale',
        name: 'og:locale',
        content: 'en_gb',
      },
      {
        hid: 'og:see_also:instagram',
        name: 'og:see_also',
        content: 'https://www.instagram.com/jargharg',
      },
      {
        hid: 'og:see_also:linkedin',
        name: 'og:see_also',
        content: 'https://www.linkedin.com/in/jarodhargreaves/',
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary',
      },
      {
        hid: 'msapplication-TileColor',
        name: 'msapplication-TileColor',
        content: '##242021',
      },
      {
        hid: 'theme-color',
        name: 'theme-color',
        content: '##242021',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      {
        rel: 'manifest',
        href: '/site.webmanifest',
      },
    ],
  },

  css: [
    '~/assets/main.scss',
  ],

  components: true,

  modules: [
    '@nuxtjs/robots',
    ['@funken-studio/sitemap-nuxt-3', { generateOnBuild: true }],
    ['@pinia/nuxt', { disableVuex: true }],
  ],

  build: {
    transpile: ['nuxt-sm', 'sm-commons', 'gsap', 'pinia'],
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      isDevMode: process.env.NODE_ENV === 'development',
      siteUrl: process.env.SITE_URL || 'http://localhost:3000',
      googleAnalyticsMeasurementIdGA4: process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID_GA4 || null,
      googleAnalyticsMeasurementIdUA: process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID_UA || null,
    },
  },

  detectBrowserLanguage: {
    useCookie: false,
  },

  tailwindcss: {
    viewer: false,
  },

  sitemap: {
    hostname: process.env.SITE_URL,
    trailingSlash: true,
    filter: ({ routes }) => {
      console.log(routes)

      return routes.filter(({ url }) => !EXCLUDED_SITEMAP_ROUTES.find(excludedRoute => url.includes(excludedRoute)))
    },
  },
})
