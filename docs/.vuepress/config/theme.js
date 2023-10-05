import {
    hopeTheme
} from "vuepress-theme-hope";
import {
    navbar,
    sidebar
} from "./router";


export default hopeTheme({
    // 此处放置主题配置
    author: "Gontoy",
    favicon: "/logo.png",
    darkmode: "enable",
    fullscreen: true,
    iconAssets: "https://at.alicdn.com/t/c/font_3879594_02a7jyioxr8t.css",
    navbar,
    sidebar,
    themeColor: {
        purple: "#a6a5c4",
        green: "#7e9496",
        orange: "#ad7e4e",
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