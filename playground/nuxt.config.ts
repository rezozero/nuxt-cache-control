export default defineNuxtConfig({
  modules: ['../src/module', '@nuxt/eslint'],
  ssr: true,
  devtools: { enabled: true },
  compatibilityDate: '2025-07-22',
  cacheControl: {
    noCacheCookies: ['cart', 'session'],
  },
})
