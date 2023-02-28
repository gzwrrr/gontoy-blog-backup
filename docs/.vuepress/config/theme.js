import {
    hopeTheme
} from "vuepress-theme-hope"


export default hopeTheme({
    // 此处放置主题配置
    author: "Gontoy",
    favicon: "/logo.png",
    darkmode: "enable",
    fullscreen: true,
    iconAssets: "https://at.alicdn.com/t/c/font_3879594_02a7jyioxr8t.css",
    navbar: [{
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
            "/article/js/"
        ]
    },
    {
        text: "算法",
        icon: "jichengsuanfa",
        link: "/article/algorithm/"
    },
    {
        text: "框架",
        icon: "database-full",
        children: [
            "/article/springs/",
            "/article/vue/",
        ]
    },
    {
        text: "数据库",
        icon: "database-full",
        children: [
            "/article/mysql/",
            "/article/redis/",
            "/article/elasticsearch/",
            "/article/mongodb/",
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
        "/article/js/": "structure",
        "/article/algorithm/": "structure",
        "/article/springs/": "structure",
        "/article/vue/": "structure",
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
        autoCatalog: true,
        // mdEnhance: {
        //     presentation: true,
        //     tabs: true,
        //     chart: true,
        //     vuePlayground: true,
        //     codetabs: true,
        //     tasklist: true,
        //     imgLazyload: true,
        //     figure: true,
        //     include: true,
        //     attrs: true,
        //     mark: true,
        //     container: true,
        //     align: true,
        // },
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

})