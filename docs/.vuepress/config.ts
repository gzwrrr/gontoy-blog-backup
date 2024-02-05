// @ts-ignore
import { defineUserConfig } from '@vuepress/cli'
// 自定义配置
import alias from "./config/alias";
import markdown from "./config/markdown";
import plugins from "./config/plugins";
import bundler from './config/bundler';
import wrapTable from './plugins/tablePlugin';
import {
    hopeTheme
} from "vuepress-theme-hope";

import {
    navbar,
    sidebar
} from "./config/router";
import {
    blog
} from "./config/blog";
import {
    themeColor
} from "./config/themeColor";
import {
    builtInPlugins
} from "./config/builtInPlugins";
import {
    encrypt
} from "./config/encrypt";

export default defineUserConfig({
    base: '/',
    shouldPrefetch: false,
    bundler: bundler,
    alias: alias,
    // @ts-ignore
    plugins: plugins,
    markdown: markdown,
    theme: hopeTheme({
        // @ts-ignore
        encrypt,
        // 此处放置主题配置
        author: "Gontoy",
        favicon: "/logo.png",
        darkmode: "enable",
        fullscreen: true,
        iconAssets: "https://at.alicdn.com/t/c/font_3879594_02a7jyioxr8t.css",
        navbar,
        // @ts-ignore
        sidebar,
        themeColor,
        blog,
        // @ts-ignore
        plugins: builtInPlugins,
    }),
    onInitialized: (app) => {
    },
    extendsMarkdown: (md, app) => {
        md.use(wrapTable);
    }
});