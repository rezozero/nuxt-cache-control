export default defineNuxtConfig({
    ssr: true,
    modules: ['../src/module'],
    cacheControl: {
        noCacheCookies: ['cart', 'session'],
    },
    devtools: { enabled: true },
})
