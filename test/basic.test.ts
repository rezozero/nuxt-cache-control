import {describe, it, expect} from 'vitest'
import {fileURLToPath} from 'node:url'
import {setup, $fetch, fetch} from '@nuxt/test-utils/e2e'

describe('ssr', async () => {
    await setup({
        rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
    })

    it('renders the index page', async () => {
        // Get response to a server-rendered page with `$fetch`.
        const html = await $fetch('/')
        expect(html).toContain('<div>basic</div>')
    })

    it('renders the private page', async () => {
        // Get response to a server-rendered page with `$fetch`.
        const html = await $fetch('/private')
        expect(html).toContain('<div>private</div>')
    })

    it('renders the only-server cache page', async () => {
        // Get response to a server-rendered page with `$fetch`.
        const html = await $fetch('/only-server')
        expect(html).toContain('<div>only-server</div>')
    })

    it('renders the infinite-swr cache page', async () => {
        // Get response to a server-rendered page with `$fetch`.
        const html = await $fetch('/infinite-swr')
        expect(html).toContain('<div>infinite-swr</div>')
    })

    it('has cache-control header', async () => {
        // Get response to a server-rendered page with `$fetch`.
        const response = await fetch('/')
        expect(response.headers.keys()).toContain('cache-control')
        expect(response.headers.get('cache-control')).toContain('max-age=3600')
        expect(response.headers.get('cache-control')).toContain('s-maxage=1800')
        expect(response.headers.get('cache-control')).toContain('stale-while-revalidate=120')
        expect(response.headers.get('cache-control')).toContain('public')
    })

    it('has server-only cache-control header', async () => {
        // Get response to a server-rendered page with `$fetch`.
        const response = await fetch('/only-server')
        expect(response.headers.keys()).toContain('cache-control')
        expect(response.headers.get('cache-control')).not.toContain('max-age')
        expect(response.headers.get('cache-control')).toContain('s-maxage=1800')
        expect(response.headers.get('cache-control')).toContain('stale-while-revalidate=120')
        expect(response.headers.get('cache-control')).toContain('public')
    })

    it('has infinite swr cache-control header', async () => {
        // Get response to a server-rendered page with `$fetch`.
        const response = await fetch('/infinite-swr')
        expect(response.headers.keys()).toContain('cache-control')
        expect(response.headers.get('cache-control')).not.toContain('max-age')
        expect(response.headers.get('cache-control')).toContain('s-maxage=1800')
        expect(response.headers.get('cache-control')).toContain('stale-while-revalidate')
        expect(response.headers.get('cache-control')).not.toContain('stale-while-revalidate=')
        expect(response.headers.get('cache-control')).toContain('public')
    })

    it('has private cache-control header with cart cookie', async () => {
        // Get response to a server-rendered page with `$fetch`.
        const response = await fetch('/', {
            headers: {
                cookie: 'cart=1',
            },
        })
        expect(response.headers.keys()).toContain('cache-control')
        expect(response.headers.get('cache-control')).toContain('no-store')
        expect(response.headers.get('cache-control')).toContain('private')
    })

    it('has private cache-control header', async () => {
        // Get response to a server-rendered page with `$fetch`.
        const response = await fetch('/private')
        expect(response.headers.keys()).toContain('cache-control')
        expect(response.headers.get('cache-control')).toContain('no-store')
        expect(response.headers.get('cache-control')).toContain('private')
    })
})
