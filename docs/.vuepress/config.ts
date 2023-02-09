import { defineUserConfig } from '@vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'
import { hopeTheme } from "vuepress-theme-hope"
import { getDirname, path } from "@vuepress/utils";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import { commentPlugin } from "vuepress-plugin-comment2";
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { containerPlugin } from '@vuepress/plugin-container'
import { anchorPlugin } from '@vuepress/markdown'
import { blogPlugin } from "vuepress-plugin-blog2";




const __dirname = getDirname(import.meta.url)
export default defineUserConfig({
    base: '/Blog-Vuepress/',
    bundler: viteBundler({
        viteOptions: {},
        vuePluginOptions: {},
    }),
    alias: {
        "@theme-hope/modules/blog/components/BlogHome": path.resolve(
            __dirname,
            "./components/BlogHome.vue"
        ),
        "@theme-hope/components/NormalPage": path.resolve(
            __dirname,
            "./components/NormalPage.vue"
        ),
    },
    theme: hopeTheme({
        // 此处放置主题配置
        author: "Gontoy",
        favicon: "/logo.png",
        darkmode: "switch",
        fullscreen: true,
        iconAssets: "https://at.alicdn.com/t/c/font_3879594_02a7jyioxr8t.css",
        navbar: [
            {
                text: "主页",
                link: "/README.md",
                icon: "zhuye",
                // 仅在 `/zh/guide/` 激活
                activeMatch: "^/zh/guide/$",
            },
            {
                text: "导航",
                link: "/guide/",
                icon: "tubiaozhuanqu-16",
                // 仅在 `/zh/guide/` 激活
                activeMatch: "^/zh/guide/$",
            },
            {
                text: "编程语言",
                icon: "code",
                children: [
                    "/article/java/",
                    "/article/go/",
                ]
            },
            {
                text: "算法",
                icon: "jichengsuanfa",
                link: "/article/algorithm/"
            },
            {
                text: "Springs",
                icon: "bxl-spring-boot",
                link: "/article/springs/"
            },
            {
                text: "数据库",
                icon: "database-full",
                children: [
                    "/article/mysql/",
                    "/article/redis/",
                ]
            },
            {
                text: "设计",
                icon: "sheji1",
                children: [
                    "/article/design/",
                ]
            },
            {
                text: "中间件",
                icon: "zhongjianjian",
                children: [
                    "/article/rabbitmq/",
                    "/article/elasticsearch/",
                    "/article/mongodb/",
                    "/article/netty/",
                    "/article/quartz/",
                ]
            },
            {
                text: "运维",
                icon: "yunwei-yunweirizhi",
                children: [
                    "/article/git/",
                    "/article/docker/",
                    "/article/jenkins/",
                    "/article/linux/",
                ]
            },
            {
                text: "数学建模",
                icon: "qita",
                link: "/article/modeling/"
            },
            {
                text: "其他文章",
                icon: "qita",
                link: "/article/other/"
            },
            {
                text: "关于",
                icon: "guanyu1",
                link: "/about/"
            },
        ],
        sidebar: {
            "/guide/": "structure",
            "/article/java/": "structure",
            "/article/go/": "structure",
            "/article/algorithm/": "structure",
            "/article/springs/": "structure",
            "/article/design/": "structure",
            "/article/mysql/": "structure",
            "/article/redis/": "structure",
            "/article/rabbitmq/": "structure",
            "/article/elasticsearch/": "structure",
            "/article/git/": "structure",
            "/article/docker/": "structure",
            "/article/jenkins/": "structure",
            "/article/linux/": "structure",
            "/article/mongodb/": "structure",
            "/article/netty/": "structure",
            "/article/quartz/": "structure",
            "/article/modeling/": "structure",
            "/article/other/": "structure",
            "/about/": "structure",
            "/": [
                "" /* / */,
                // "contact" /* /contact.html */,
                // "about" /* /about.html */,
            ],
        },
        themeColor: {
            blue: "#2196f3",
            red: "#f26d6d",
            green: "#3eaf7c",
            orange: "#fb9b5f",
        },
        plugins: {
            blog: {
                excerpt: true,
                excerptLength: 0,
                filter: (page) => Boolean(page.filePathRelative) && !page.frontmatter.home && !page.frontmatter.notPage
            },
            feed: {
                rss: true,
                icon: "https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/Individual/logo.png",
                rssOutputFilename: "rss.xml"
            },
            pwa: {
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
            },
            autoCatalog: true,
            mdEnhance: {
                presentation: true,
                tabs: true,
                chart: true,
                vuePlayground: true,
                codetabs: true,
                tasklist: true,
                imgLazyload: true,
                figure: true,
                include: true,
                attrs: true,
                mark: true,
                container: true,
                align: true,
            },
            photoSwipe: true,
            copyright: {
                global: true,
                author: "gzw"
            }
        },
        blog: {
            name: "Gzw",
            avatar: "/logo.png",
            roundAvatar: true,
            description: "极简主义",
            medias: {
                // GitHub 已经内置了图标
                GitHub: "https://github.com/gzwrrr",
                QQ: "tencent://message/?uin=1627121193&Site=&Menu=yes",
                Email: "mailto:1627121193@qq.com",
                BiliBili: "https://space.bilibili.com/361206654?spm_id_from=333.1007.0.0",
                Wechat: "weixin://dl/business/?t=Gzwen996-icu-io"
                // MediaX: [
                //     // 链接
                //     "https://mediax.com/UserX/",
                //     // 图标 SVG 字符串
                //     "<svg ....</svg>",
                // ],
            }
        },

    }),
    markdown: {
        anchor: {
            level: [1, 2, 3],
            permalink: anchorPlugin.permalink.ariaHidden({
                class: 'header-anchor',
                symbol: '#',
                space: true,
                placement: 'before',
            }),
        },
        toc: {
            level: [1, 2, 3]
        },
        headers: {
            level: [1, 2, 3]
        }
    },
    plugins: [
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
            before: (info: string): string =>
                `<div class="custom-container">${info ? `<p class="custom-container-title">${info}</p>` : ''}\n`,
            after: (): string => '</div>\n'
        }),
        registerComponentsPlugin({
            componentsDir: path.resolve(__dirname, './components'),
        }),
        searchProPlugin({
            // 索引全部内容
            indexContent: true,
            // 为分类和标签添加索引
            customFields: [
                {
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
        autoCatalogPlugin(),
    ],
});


