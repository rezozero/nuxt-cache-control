export default defineNuxtConfig({
    ssr: true,
    modules: ['../src/module'],
    cacheControl: {
        noCacheCookies: ['cart', 'session'],
    },
    devtools: { enabled: true },
    compatibilityDate: '2025-07-22',
})
