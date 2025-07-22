import { getCurrentInstance, useSSRContext } from 'vue'

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#directives
 */
export interface CacheControlOptions {
  maxAge?: number
  sMaxAge?: number
  staleWhileRevalidate?: number | true
  public: boolean
}

export function useCacheControl(cacheControl: CacheControlOptions): void {
  if (import.meta.client) {
    return
  }

  // Prevent logging warnings when not in vue context.
  if (!getCurrentInstance()) {
    return
  }

  const ssrContext = useSSRContext()
  if (ssrContext && ssrContext.event) {
    // Inject the cache control options into the SSR context
    ssrContext.event.context.cacheControl = cacheControl
  }
}
