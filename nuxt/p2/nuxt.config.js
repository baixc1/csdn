module.exports = {
    plugins: [
        { src: '~/plugins/vue-notifications', ssr: false },
        { src: '~/plugins/vue-inject.js', ssr: true }
    ],
    head: {
        titleTemplate: '%s - Nuxt.js',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ],
    }
}