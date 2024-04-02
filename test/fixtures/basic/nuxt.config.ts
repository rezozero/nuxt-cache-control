import MyModule from '../../../src/module'

export default defineNuxtConfig({
    modules: [
        MyModule
    ],
    cacheControl: {
        noCacheCookies: ['cart', 'session']
    }
})
