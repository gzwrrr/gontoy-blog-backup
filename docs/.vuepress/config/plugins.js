// import { seoPlugin } from "vuepress-plugin-seo2";
// import { readingTimePlugin } from "vuepress-plugin-reading-time2";
// import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";
// import {
//     mdEnhancePlugin
// } from "vuepress-plugin-md-enhance";
import { prismjsPlugin } from '@vuepress/plugin-prismjs'
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
    componentsPlugin
} from "vuepress-plugin-components";
import {
    getDirname,
    path
} from "@vuepress/utils";
import { tocPlugin } from '@vuepress/plugin-toc';
// import { navPlugin } from '../vuepress-plugin-code/index';

const __dirname = getDirname(
    import.meta.url)

export default [
    prismjsPlugin({
        // 配置项
        dark: 'z-touch'
    }),
    tocPlugin({
        // 配置项
        componentName: 'Toc',
        defaultOptions: {
            containerTag: 'nav',
            containerClass: 'vuepress-toc',
            listClass: 'vuepress-toc-list',
            itemClass: 'vuepress-toc-item',
            linkTag: 'RouterLink',
            linkClass: 'vuepress-toc-link',
            linkActiveClass: 'active',
            linkChildrenActiveClass: 'active',
        }
    }),
    containerPlugin({
        type: 'hide',
        locales: {
            '/': {
                defaultInfo: 'HIDE',
            },
            '/zh/': {
                defaultInfo: '隐藏',
            },
        },
        before: (info) =>
            `<div class="hide-container">${info ? `<p class="hide-container-title">${info}</p>` : ''}\n`,
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
    feedPlugin({
        hostname: "https://gzwrrr.github.io",
        atom: true,
        rss: true,
        json: true,
        icon: "https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/Individual/logo.png",
        // rssOutputFilename: "rss.xml"
    }),
    // componentsPlugin({
    //     // 插件选项
    //     components: ["PDF", "Badge"]
    // }),
    // pwaPlugin({
    //     showInstall: true,
    //     manifest: {
    //         name: "Gzw's Blog",
    //         short_name: "Gzw's Blog",
    //         description: "Gzw's Blog",
    //         theme_color: "#474748",
    //     },
    //     favicon: "https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/Individual/logo.png",
    //     // 最大缓存：5M
    //     maxSize: 4096,
    //     cacheHTML: false,
    //     cachePic: false,
    //     maxPicSize: 1024,
    //     update: "available",
    //     themeColor: "#474748"
    // }),
]

// mdEnhancePlugin(),
// autoCatalogPlugin(),
// readingTimePlugin({
//     // 你的选项
// }),
// seoPlugin({
//     // 你的选项
//     hostname: "gzwrrr.github.io",
//     author: {
//         name: "Gzw",
//         url: "https://gzwrrr.github.io",
//         email: "1627121193@qq.com"
//     },
//     autoDescription: true
// }),

// mdEnhance: {
// presentation: true,
// tabs: true,
// chart: true,
// vuePlayground: true,
// codetabs: true,
// tasklist: true,
// imgLazyload: true,
// figure: true,
// include: true,
// attrs: true,
// mark: true,
// container: true,
// align: true,
// },