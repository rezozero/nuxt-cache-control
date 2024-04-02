import { addImports, createResolver, defineNuxtModule } from '@nuxt/kit'
import { defu } from 'defu'

// Module options TypeScript interface definition
export interface ModuleOptions {
    noCacheCookies?: string[]
}

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: 'nuxt-cache-control',
        configKey: 'cacheControl',
        // Compatibility constraints
        compatibility: {
            // Semver version of supported nuxt versions
            nuxt: '^3.10.0',
        },
    },
    setup(options, nuxt) {
        const { resolve } = createResolver(import.meta.url)
        nuxt.options.runtimeConfig.cacheControl = defu(nuxt.options.runtimeConfig.cacheControl || {}, options)

        addImports({
            name: 'useCacheControl', // name of the composable to be used
            as: 'useCacheControl',
            from: resolve('runtime/composables/use-cache-control'), // path of composable
        })

        nuxt.hook('nitro:config', (nitro) => {
            // ensure `nitro.plugins` is initialized
            nitro.plugins = nitro.plugins || []

            // add your custom plugin
            nitro.plugins.push(resolve('runtime/server/plugins/cache-control'))
        })
    },
})
