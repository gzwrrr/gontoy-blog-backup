import {
    searchProPlugin
} from "vuepress-plugin-search-pro";
import {
    commentPlugin
} from "vuepress-plugin-comment2";
import {
    registerComponentsPlugin
} from '@vuepress/plugin-register-components'
import {
    containerPlugin
} from '@vuepress/plugin-container'
import {
    feedPlugin
} from "vuepress-plugin-feed2";
import {
    pwaPlugin
} from "vuepress-plugin-pwa2";
import {
    mdEnhancePlugin
} from "vuepress-plugin-md-enhance";
import {
    getDirname,
    path
} from "@vuepress/utils";
const __dirname = getDirname(
    import.meta.url)

export default [
    // mdEnhancePlugin({
    //     stylize: [{
    //         matcher: "/^不$/u",
    //         replacer: ({
    //             tag,
    //             attrs,
    //             content
    //         }) => {
    //             if (tag === "em")
    //                 return {
    //                     tag: "span",
    //                     attrs: {
    //                         ...attrs,
    //                         style: "color: red"
    //                     },
    //                     content,
    //                 };
    //         },
    //     }, ],
    // }),
    containerPlugin({
        type: 'para',
        locales: {
            '/': {
                defaultInfo: 'TIP',
            },
            '/zh/': {
                defaultInfo: '提示',
            },
        },
        before: (info) =>
            `<div class="custom-container">${info ? `<p class="custom-container-title">${info}</p>` : ''}\n`,
        after: () => '</div>\n'
    }),
    registerComponentsPlugin({
        componentsDir: path.resolve(__dirname, '../components/custom'),
    }),
    searchProPlugin({
        // 索引全部内容
        indexContent: true,
        // 为分类和标签添加索引
        customFields: [{
                getter: (page) => page.frontmatter.category + "",
                formatter: "分类：$content",
            },
            {
                getter: (page) => page.frontmatter.tag + "",
                formatter: "标签：$content",
            },
        ],
        locales: {
            "/zh/": {
                placeholder: "搜索",
            },
        },
    }),
    commentPlugin({
        provider: "Giscus",
        comment: true,
        repo: "gzwrrr/giscus",
        repoId: "R_kgDOI40yuA",
        category: "General",
        categoryId: "DIC_kwDOI40yuM4CT86L",
        mapping: "title",
        strict: false
    }),
    // autoCatalogPlugin(),
    feedPlugin({
        hostname: "https://gzwrrr.github.io",
        atom: true,
        rss: true,
        json: true,
        icon: "https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/Individual/logo.png",
        // rssOutputFilename: "rss.xml"
    }),
    pwaPlugin({
        showInstall: true,
        manifest: {
            name: "Gzw's Blog",
            short_name: "Gzw's Blog",
            description: "Gzw's Blog",
            theme_color: "#21332d",
        },
        favicon: "https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/Individual/logo.png",
        // 最大缓存：5M
        maxSize: 4096,
        cacheHTML: false,
        cachePic: false,
        maxPicSize: 1024,
        update: "available",
        themeColor: "#21332d"
    }),
]