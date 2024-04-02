# Nuxt Cache-Control

[![npm version][npm-version-src]][npm-version-href]
[![Nuxt][nuxt-src]][nuxt-href]

Declare fine-grained cache control headers for your Nuxt application in each page.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)

## Features

- **Fine-grained cache control**: Set cache control headers for each page with `useCacheControl` composable.
- **Prevents caching when response status is not 200**
- **Prevents public responses when some cookies attached**: configure some cookies names for which cache-control will be private.

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add @rezo-zero/nuxt-cache-control
```

### Configure module

```ts
// nuxt.config.ts
export default defineNuxtConfig({
    modules: [
        '@rezo-zero/nuxt-cache-control'
    ],
    cacheControl: {
        noCacheCookies: ['cart', 'session', 'auth']
    }
})
```

That's it! You can now use Nuxt Cache Control in your Nuxt app with `useCacheControl` composable.

```vue
<script setup>
/*
 * Define SSR cache control header for this page
 */
useCacheControl({
    public: true,
    // 1 hour
    maxAge: 60 * 60,
    // 30 minutes
    sMaxAge: 60 * 30,
    // SWR for 2 minutes
    staleWhileRevalidate: 60 * 2,
})
</script>
```

Cache control composable accepts the following options:

```ts
export interface CacheControlOptions {
    maxAge?: number // in seconds
    sMaxAge?: number // in seconds
    staleWhileRevalidate?: number | true // in seconds, or true, which means infinite staleWhileRevalidate
    public: boolean
}
```


## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  pnpm install
  
  # Generate type stubs
  pnpm dev:prepare
  
  # Develop with the playground
  pnpm dev
  
  # Build the playground
  pnpm dev:build
  
  # Run ESLint
  pnpm lint
  
  # Run Vitest
  pnpm test
  pnpm test:watch
  
  # Release new version
  pnpm release
  ```

</details>


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@rezo-zero/nuxt-cache-control/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/@rezo-zero/nuxt-cache-control

[npm-downloads-src]: https://img.shields.io/npm/dm/@rezo-zero/nuxt-cache-control.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/@rezo-zero/nuxt-cache-control

[license-src]: https://img.shields.io/npm/l/@rezo-zero/nuxt-cache-control.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/@rezo-zero/nuxt-cache-control

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
