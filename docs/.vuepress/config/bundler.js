import {
    viteBundler
} from '@vuepress/bundler-vite'


export default viteBundler({
    viteOptions: {
        build: {
            emptyOutDir: false,
        }
    },
    vuePluginOptions: {},
})