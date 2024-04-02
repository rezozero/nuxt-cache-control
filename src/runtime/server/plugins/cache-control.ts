import type { CacheControlOptions } from '~/src/runtime/composables/use-cache-control'
import { getResponseStatus, setResponseHeader, getQuery, parseCookies } from 'h3'

/*
 * This plugin is used to set the cache control headers for the response.
 * It uses the useCacheControl composable to define cache control options.
 * It also checks for cookies and response status to determine if the response should be cached.
 */
export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('render:response', (_response, { event }) => {
        const qs = getQuery(event)

        if (getResponseStatus(event) !== 200) {
            setResponseHeader(event, 'Cache-Control', `private, no-cache, no-store, must-revalidate`)
            return
        }

        /*
         * If the request is a redirect, we don't want to cache it.
         * Or if the request is an error, we don't want to cache it.
         */
        if (qs.url && qs.statusCode) {
            setResponseHeader(event, 'Cache-Control', `private, no-cache, no-store, must-revalidate`)
            return
        }
        const cacheControl =
            event.context.cacheControl ||
            ({
                maxAge: 0,
                public: false,
            } as CacheControlOptions)
        const cookies = parseCookies(event)
        const noCacheCookies = useRuntimeConfig().cacheControl.noCacheCookies || []
        const noCache = noCacheCookies.some((cookie: string) => cookies[cookie])

        /*
         * Use useCacheControl composable to define cache control options
         */
        if (!noCache && cacheControl.public) {
            const cacheControlHeader = [`public`]
            if (cacheControl?.maxAge >= 0) {
                cacheControlHeader.push(`max-age=${cacheControl.maxAge}`)
            }
            if (cacheControl?.sMaxAge >= 0) {
                cacheControlHeader.push(`s-maxage=${cacheControl.sMaxAge}`)
            }
            if (cacheControl?.staleWhileRevalidate === true) {
                // Infinite stale-while-revalidate
                cacheControlHeader.push(`stale-while-revalidate`)
            } else if (cacheControl?.staleWhileRevalidate > 0) {
                cacheControlHeader.push(`stale-while-revalidate=${cacheControl.staleWhileRevalidate}`)
            }
            setResponseHeader(event, 'Cache-Control', cacheControlHeader.join(', '))
        } else {
            setResponseHeader(event, 'Cache-Control', `private, no-cache, no-store, must-revalidate`)
        }
    })
})
