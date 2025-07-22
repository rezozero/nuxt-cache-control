export default defineNuxtConfig({
  modules: ['../src/module'],
  ssr: true,
  devtools: { enabled: true },
  compatibilityDate: '2025-07-22',
  cacheControl: {
    noCacheCookies: ['cart', 'session'],
  },
})
