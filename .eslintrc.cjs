module.exports = {
    root: true,
    extends: [
        "@nuxt/eslint-config",
        // @see https://github.com/prettier/eslint-plugin-prettier#recommended-configuration
        "plugin:prettier/recommended",
    ],
    overrides: [
        {
            // stories files can have any name
            files: ['**/*.stories.vue'],
            rules: {'vue/multi-word-component-names': 'off'},
        },
    ],
}
