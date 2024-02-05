import {
    getDirname,
    path
} from "@vuepress/utils";
const __dirname = getDirname(
    import.meta.url)

export default {
    "@theme-hope/modules/blog/components/BlogHome": path.resolve(
        __dirname,
        "../components/BlogHome.vue"
    ),
    "@theme-hope/components/NormalPage": path.resolve(
        __dirname,
        "../components/NormalPage.vue"
    ),
}