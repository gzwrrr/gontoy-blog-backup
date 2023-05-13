// import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";
// import { blogPlugin } from "vuepress-plugin-blog2";

import { defineUserConfig } from '@vuepress/cli'
// 自定义配置
import alias from "./config/alias";
import theme from "./config/theme";
import markdown from "./config/markdown";
import plugins from "./config/plugins";
import bundler from './config/bundler';
import wrapTable from './plugins/tablePlugin';

export default defineUserConfig({
    base: '/',
    shouldPrefetch: false,
    bundler: bundler,
    alias: alias,
    // @ts-ignore
    plugins: plugins,
    markdown: markdown,
    theme: theme,
    onInitialized: (app) => {
    },
    extendsMarkdown: (md, app) => {
        md.use(wrapTable);
    }
});