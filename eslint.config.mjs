import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: {
    tooling: true,
    stylistic: true,
  },
  dirs: {
    src: [
      './playground',
    ],
  },
}).append({
  files: ['**/*.ts', '**/*.js', '**/*.mjs', '**/*.jsx', '**/*.tsx', '**/*.vue'],
  rules: {
    'vue/multi-word-component-names': 'off',
    '@stylistic/max-len': ['warn', {
      code: 120,
    }],
  },
})
