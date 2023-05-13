// docs/.vuepress/config.ts
import { defineUserConfig } from "@vuepress/cli";

// docs/.vuepress/config/alias.js
import {
  getDirname,
  path
} from "@vuepress/utils";
var __vite_injected_original_import_meta_url = "file:///C:/MyDisk/A-Code/Vue/Individual/Blog/docs/.vuepress/config/alias.js";
var __dirname = getDirname(
  __vite_injected_original_import_meta_url
);
var alias_default = {
  "@theme-hope/modules/blog/components/BlogHome": path.resolve(
    __dirname,
    "../components/BlogHome.vue"
  ),
  "@theme-hope/components/NormalPage": path.resolve(
    __dirname,
    "../components/NormalPage.vue"
  )
};

// docs/.vuepress/config/theme.js
import {
  hopeTheme
} from "vuepress-theme-hope";
var theme_default = hopeTheme({
  // 此处放置主题配置
  author: "Gontoy",
  favicon: "/logo.png",
  darkmode: "enable",
  fullscreen: true,
  iconAssets: "https://at.alicdn.com/t/c/font_3879594_02a7jyioxr8t.css",
  navbar: [
    {
      text: "\u4E3B\u9875",
      link: "/README.md",
      icon: "zhuye",
      // 仅在 `/zh/guide/` 激活
      activeMatch: "^/zh/guide/$"
    },
    {
      text: "\u5BFC\u822A",
      link: "/guide/",
      icon: "tubiaozhuanqu-16",
      // 仅在 `/zh/guide/` 激活
      activeMatch: "^/zh/guide/$"
    },
    {
      text: "\u7F16\u7A0B\u8BED\u8A00",
      icon: "code",
      children: [
        "/article/java/",
        "/article/go/",
        "/article/js/",
        "/article/python/",
        "/article/lua/"
      ]
    },
    {
      text: "\u7B97\u6CD5",
      icon: "jichengsuanfa",
      link: "/article/algorithm/"
    },
    {
      text: "\u6846\u67B6",
      icon: "database-full",
      children: [
        "/article/tomcat/",
        "/article/springs/",
        "/article/vue/"
      ]
    },
    {
      text: "\u6570\u636E\u5E93",
      icon: "database-full",
      children: [
        "/article/mysql/",
        "/article/redis/",
        "/article/elasticsearch/",
        "/article/mongodb/",
        "/article/mybatis/"
      ]
    },
    {
      text: "\u8BBE\u8BA1/\u67B6\u6784",
      icon: "sheji1",
      children: [
        "/article/design/",
        "/article/framework/"
      ]
    },
    {
      text: "\u4E2D\u95F4\u4EF6",
      icon: "zhongjianjian",
      children: [
        "/article/rabbitmq/",
        "/article/netty/",
        "/article/quartz/"
      ]
    },
    {
      text: "\u8FD0\u7EF4",
      icon: "yunwei-yunweirizhi",
      children: [
        "/article/git/",
        "/article/docker/",
        "/article/k8s/",
        "/article/jenkins/",
        "/article/linux/"
      ]
    },
    {
      text: "\u5927\u6570\u636E",
      icon: "qita",
      link: "/article/data/"
    },
    {
      text: "\u6570\u5B66\u5EFA\u6A21",
      icon: "qita",
      link: "/article/modeling/"
    },
    {
      text: "\u5176\u4ED6\u6587\u7AE0",
      icon: "qita",
      link: "/article/other/"
    },
    {
      text: "\u5173\u4E8E",
      icon: "guanyu1",
      link: "/about/"
    }
  ],
  sidebar: {
    "/guide/": "structure",
    "/article/java/": "structure",
    "/article/go/": "structure",
    "/article/js/": "structure",
    "/article/k8s/": "structure",
    "/article/python/": "structure",
    "/article/algorithm/": "structure",
    "/article/data/": "structure",
    "/article/tomcat/": "structure",
    "/article/springs/": "structure",
    "/article/vue/": "structure",
    "/article/design/": "structure",
    "/article/mybatis/": "structure",
    "/article/mysql/": "structure",
    "/article/redis/": "structure",
    "/article/rabbitmq/": "structure",
    "/article/elasticsearch/": "structure",
    "/article/framework/": "structure",
    "/article/git/": "structure",
    "/article/docker/": "structure",
    "/article/jenkins/": "structure",
    "/article/linux/": "structure",
    "/article/lua/": "structure",
    "/article/mongodb/": "structure",
    "/article/netty/": "structure",
    "/article/quartz/": "structure",
    "/article/modeling/": "structure",
    "/article/other/": "structure",
    "/about/": "structure",
    "/": [
      ""
      // "contact" /* /contact.html */,
      // "about" /* /about.html */,
    ]
  },
  themeColor: {
    blue: "#2196f3",
    red: "#f26d6d",
    green: "#3eaf7c",
    orange: "#fb9b5f"
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
    description: "\u6781\u7B80\u4E3B\u4E49",
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
  }
});

// docs/.vuepress/config/markdown.js
import {
  anchorPlugin
} from "@vuepress/markdown";
var markdown_default = {
  anchor: {
    level: [1, 2, 3],
    permalink: anchorPlugin.permalink.ariaHidden({
      class: "header-anchor",
      symbol: "#",
      space: true,
      placement: "before"
    })
  },
  toc: {
    level: [1, 2, 3]
  },
  headers: {
    level: [1, 2, 3]
  }
};

// docs/.vuepress/config/plugins.js
import {
  searchProPlugin
} from "vuepress-plugin-search-pro";
import {
  commentPlugin
} from "vuepress-plugin-comment2";
import {
  registerComponentsPlugin
} from "@vuepress/plugin-register-components";
import {
  containerPlugin
} from "@vuepress/plugin-container";
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
  componentsPlugin
} from "vuepress-plugin-components";
import {
  getDirname as getDirname2,
  path as path2
} from "@vuepress/utils";
import { tocPlugin } from "@vuepress/plugin-toc";
var __vite_injected_original_import_meta_url2 = "file:///C:/MyDisk/A-Code/Vue/Individual/Blog/docs/.vuepress/config/plugins.js";
var __dirname2 = getDirname2(
  __vite_injected_original_import_meta_url2
);
var plugins_default = [
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
  tocPlugin({
    // 配置项
    componentName: "Toc",
    defaultOptions: {
      containerTag: "nav",
      containerClass: "vuepress-toc",
      listClass: "vuepress-toc-list",
      itemClass: "vuepress-toc-item",
      linkTag: "RouterLink",
      linkClass: "vuepress-toc-link",
      linkActiveClass: "active",
      linkChildrenActiveClass: "active"
    }
  }),
  // autoCatalogPlugin({
  //     //插件选项
  //     index: true
  // }),
  mdEnhancePlugin({
    stylize: [{
      matcher: /^不/,
      replacer: ({
        tag,
        attrs,
        content
      }) => {
        if (tag === "em")
          return {
            tag: "span",
            attrs: {
              ...attrs,
              class: "em"
            },
            content
          };
      }
    }],
    mermaid: true,
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
    // 启用下角标功能
    sub: true,
    // 启用上角标
    sup: true,
    // 启用脚注
    footnote: true
  }),
  componentsPlugin({
    // 插件选项
    components: ["PDF", "Badge"]
  }),
  containerPlugin({
    type: "para",
    locales: {
      "/": {
        defaultInfo: "TIP"
      },
      "/zh/": {
        defaultInfo: "\u63D0\u793A"
      }
    },
    before: (info) => `<div class="custom-container">${info ? `<p class="custom-container-title">${info}</p>` : ""}
`,
    after: () => "</div>\n"
  }),
  registerComponentsPlugin({
    componentsDir: path2.resolve(__dirname2, "../components/custom")
  }),
  searchProPlugin({
    // 索引全部内容
    indexContent: true,
    // 为分类和标签添加索引
    customFields: [
      {
        getter: (page) => page.frontmatter.category + "",
        formatter: "\u5206\u7C7B\uFF1A$content"
      },
      {
        getter: (page) => page.frontmatter.tag + "",
        formatter: "\u6807\u7B7E\uFF1A$content"
      }
    ],
    locales: {
      "/zh/": {
        placeholder: "\u641C\u7D22"
      }
    }
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
    icon: "https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/Individual/logo.png"
    // rssOutputFilename: "rss.xml"
  }),
  pwaPlugin({
    showInstall: true,
    manifest: {
      name: "Gzw's Blog",
      short_name: "Gzw's Blog",
      description: "Gzw's Blog",
      theme_color: "#21332d"
    },
    favicon: "https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/Individual/logo.png",
    // 最大缓存：5M
    maxSize: 4096,
    cacheHTML: false,
    cachePic: false,
    maxPicSize: 1024,
    update: "available",
    themeColor: "#21332d"
  })
];

// docs/.vuepress/config/bundler.js
import {
  viteBundler
} from "@vuepress/bundler-vite";
var bundler_default = viteBundler({
  viteOptions: {
    build: {
      emptyOutDir: false
    }
  },
  vuePluginOptions: {}
});

// docs/.vuepress/plugins/tablePlugin.js
import MarkdownIt from "markdown-it";
function wrapTable(md) {
  const defaultRender = md.renderer.rules.table_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };
  md.renderer.rules.table_open = function(tokens, idx, options, env, self) {
    return `<div class="table-wrapper ">${defaultRender(tokens, idx, options, env, self)}`;
  };
  md.renderer.rules.table_close = function(tokens, idx, options, env, self) {
    return `${defaultRender(tokens, idx, options, env, self)}</div>`;
  };
}

// docs/.vuepress/config.ts
var config_default = defineUserConfig({
  base: "/",
  shouldPrefetch: false,
  bundler: bundler_default,
  alias: alias_default,
  theme: theme_default,
  plugins: plugins_default,
  markdown: markdown_default,
  onInitialized: (app) => {
  },
  extendsMarkdown: (md, app) => {
    md.use(wrapTable);
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udnVlcHJlc3MvY29uZmlnLnRzIiwgImRvY3MvLnZ1ZXByZXNzL2NvbmZpZy9hbGlhcy5qcyIsICJkb2NzLy52dWVwcmVzcy9jb25maWcvdGhlbWUuanMiLCAiZG9jcy8udnVlcHJlc3MvY29uZmlnL21hcmtkb3duLmpzIiwgImRvY3MvLnZ1ZXByZXNzL2NvbmZpZy9wbHVnaW5zLmpzIiwgImRvY3MvLnZ1ZXByZXNzL2NvbmZpZy9idW5kbGVyLmpzIiwgImRvY3MvLnZ1ZXByZXNzL3BsdWdpbnMvdGFibGVQbHVnaW4uanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOi9NeURpc2svQS1Db2RlL1Z1ZS9JbmRpdmlkdWFsL0Jsb2cvZG9jcy8udnVlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXE15RGlza1xcXFxBLUNvZGVcXFxcVnVlXFxcXEluZGl2aWR1YWxcXFxcQmxvZ1xcXFxkb2NzXFxcXC52dWVwcmVzc1xcXFxjb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L015RGlzay9BLUNvZGUvVnVlL0luZGl2aWR1YWwvQmxvZy9kb2NzLy52dWVwcmVzcy9jb25maWcudHNcIjsvLyBpbXBvcnQgeyBhdXRvQ2F0YWxvZ1BsdWdpbiB9IGZyb20gXCJ2dWVwcmVzcy1wbHVnaW4tYXV0by1jYXRhbG9nXCI7XHJcbi8vIGltcG9ydCB7IGJsb2dQbHVnaW4gfSBmcm9tIFwidnVlcHJlc3MtcGx1Z2luLWJsb2cyXCI7XHJcblxyXG5pbXBvcnQgeyBkZWZpbmVVc2VyQ29uZmlnIH0gZnJvbSAnQHZ1ZXByZXNzL2NsaSdcclxuLy8gXHU4MUVBXHU1QjlBXHU0RTQ5XHU5MTREXHU3RjZFXHJcbmltcG9ydCBhbGlhcyBmcm9tIFwiLi9jb25maWcvYWxpYXNcIjtcclxuaW1wb3J0IHRoZW1lIGZyb20gXCIuL2NvbmZpZy90aGVtZVwiO1xyXG5pbXBvcnQgbWFya2Rvd24gZnJvbSBcIi4vY29uZmlnL21hcmtkb3duXCI7XHJcbmltcG9ydCBwbHVnaW5zIGZyb20gXCIuL2NvbmZpZy9wbHVnaW5zXCI7XHJcbmltcG9ydCBidW5kbGVyIGZyb20gJy4vY29uZmlnL2J1bmRsZXInO1xyXG5pbXBvcnQgd3JhcFRhYmxlIGZyb20gJy4vcGx1Z2lucy90YWJsZVBsdWdpbidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZVVzZXJDb25maWcoe1xyXG4gICAgYmFzZTogJy8nLFxyXG4gICAgc2hvdWxkUHJlZmV0Y2g6IGZhbHNlLFxyXG4gICAgYnVuZGxlcjogYnVuZGxlcixcclxuICAgIGFsaWFzOiBhbGlhcyxcclxuICAgIHRoZW1lOiB0aGVtZSxcclxuICAgIHBsdWdpbnM6IHBsdWdpbnMsXHJcbiAgICBtYXJrZG93bjogbWFya2Rvd24sXHJcbiAgICBvbkluaXRpYWxpemVkOiAoYXBwKSA9PiB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYXBwKVxyXG4gICAgfSxcclxuICAgIGV4dGVuZHNNYXJrZG93bjogKG1kLCBhcHApID0+IHtcclxuICAgICAgICBtZC51c2Uod3JhcFRhYmxlKTtcclxuICAgIH1cclxufSk7IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOi9NeURpc2svQS1Db2RlL1Z1ZS9JbmRpdmlkdWFsL0Jsb2cvZG9jcy8udnVlcHJlc3MvY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxNeURpc2tcXFxcQS1Db2RlXFxcXFZ1ZVxcXFxJbmRpdmlkdWFsXFxcXEJsb2dcXFxcZG9jc1xcXFwudnVlcHJlc3NcXFxcY29uZmlnXFxcXGFsaWFzLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9NeURpc2svQS1Db2RlL1Z1ZS9JbmRpdmlkdWFsL0Jsb2cvZG9jcy8udnVlcHJlc3MvY29uZmlnL2FsaWFzLmpzXCI7aW1wb3J0IHtcclxuICAgIGdldERpcm5hbWUsXHJcbiAgICBwYXRoXHJcbn0gZnJvbSBcIkB2dWVwcmVzcy91dGlsc1wiO1xyXG5jb25zdCBfX2Rpcm5hbWUgPSBnZXREaXJuYW1lKFxyXG4gICAgaW1wb3J0Lm1ldGEudXJsKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgXCJAdGhlbWUtaG9wZS9tb2R1bGVzL2Jsb2cvY29tcG9uZW50cy9CbG9nSG9tZVwiOiBwYXRoLnJlc29sdmUoXHJcbiAgICAgICAgX19kaXJuYW1lLFxyXG4gICAgICAgIFwiLi4vY29tcG9uZW50cy9CbG9nSG9tZS52dWVcIlxyXG4gICAgKSxcclxuICAgIFwiQHRoZW1lLWhvcGUvY29tcG9uZW50cy9Ob3JtYWxQYWdlXCI6IHBhdGgucmVzb2x2ZShcclxuICAgICAgICBfX2Rpcm5hbWUsXHJcbiAgICAgICAgXCIuLi9jb21wb25lbnRzL05vcm1hbFBhZ2UudnVlXCJcclxuICAgICksXHJcbn0iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6L015RGlzay9BLUNvZGUvVnVlL0luZGl2aWR1YWwvQmxvZy9kb2NzLy52dWVwcmVzcy9jb25maWdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXE15RGlza1xcXFxBLUNvZGVcXFxcVnVlXFxcXEluZGl2aWR1YWxcXFxcQmxvZ1xcXFxkb2NzXFxcXC52dWVwcmVzc1xcXFxjb25maWdcXFxcdGhlbWUuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L015RGlzay9BLUNvZGUvVnVlL0luZGl2aWR1YWwvQmxvZy9kb2NzLy52dWVwcmVzcy9jb25maWcvdGhlbWUuanNcIjtpbXBvcnQge1xyXG4gICAgaG9wZVRoZW1lXHJcbn0gZnJvbSBcInZ1ZXByZXNzLXRoZW1lLWhvcGVcIlxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGhvcGVUaGVtZSh7XHJcbiAgICAvLyBcdTZCNjRcdTU5MDRcdTY1M0VcdTdGNkVcdTRFM0JcdTk4OThcdTkxNERcdTdGNkVcclxuICAgIGF1dGhvcjogXCJHb250b3lcIixcclxuICAgIGZhdmljb246IFwiL2xvZ28ucG5nXCIsXHJcbiAgICBkYXJrbW9kZTogXCJlbmFibGVcIixcclxuICAgIGZ1bGxzY3JlZW46IHRydWUsXHJcbiAgICBpY29uQXNzZXRzOiBcImh0dHBzOi8vYXQuYWxpY2RuLmNvbS90L2MvZm9udF8zODc5NTk0XzAyYTdqeWlveHI4dC5jc3NcIixcclxuICAgIG5hdmJhcjogW3tcclxuICAgICAgICB0ZXh0OiBcIlx1NEUzQlx1OTg3NVwiLFxyXG4gICAgICAgIGxpbms6IFwiL1JFQURNRS5tZFwiLFxyXG4gICAgICAgIGljb246IFwiemh1eWVcIixcclxuICAgICAgICAvLyBcdTRFQzVcdTU3MjggYC96aC9ndWlkZS9gIFx1NkZDMFx1NkQzQlxyXG4gICAgICAgIGFjdGl2ZU1hdGNoOiBcIl4vemgvZ3VpZGUvJFwiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICB0ZXh0OiBcIlx1NUJGQ1x1ODIyQVwiLFxyXG4gICAgICAgIGxpbms6IFwiL2d1aWRlL1wiLFxyXG4gICAgICAgIGljb246IFwidHViaWFvemh1YW5xdS0xNlwiLFxyXG4gICAgICAgIC8vIFx1NEVDNVx1NTcyOCBgL3poL2d1aWRlL2AgXHU2RkMwXHU2RDNCXHJcbiAgICAgICAgYWN0aXZlTWF0Y2g6IFwiXi96aC9ndWlkZS8kXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHRleHQ6IFwiXHU3RjE2XHU3QTBCXHU4QkVEXHU4QTAwXCIsXHJcbiAgICAgICAgaWNvbjogXCJjb2RlXCIsXHJcbiAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgXCIvYXJ0aWNsZS9qYXZhL1wiLFxyXG4gICAgICAgICAgICBcIi9hcnRpY2xlL2dvL1wiLFxyXG4gICAgICAgICAgICBcIi9hcnRpY2xlL2pzL1wiLFxyXG4gICAgICAgICAgICBcIi9hcnRpY2xlL3B5dGhvbi9cIixcclxuICAgICAgICAgICAgXCIvYXJ0aWNsZS9sdWEvXCJcclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHRleHQ6IFwiXHU3Qjk3XHU2Q0Q1XCIsXHJcbiAgICAgICAgaWNvbjogXCJqaWNoZW5nc3VhbmZhXCIsXHJcbiAgICAgICAgbGluazogXCIvYXJ0aWNsZS9hbGdvcml0aG0vXCJcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgdGV4dDogXCJcdTY4NDZcdTY3QjZcIixcclxuICAgICAgICBpY29uOiBcImRhdGFiYXNlLWZ1bGxcIixcclxuICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICBcIi9hcnRpY2xlL3RvbWNhdC9cIixcclxuICAgICAgICAgICAgXCIvYXJ0aWNsZS9zcHJpbmdzL1wiLFxyXG4gICAgICAgICAgICBcIi9hcnRpY2xlL3Z1ZS9cIixcclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHRleHQ6IFwiXHU2NTcwXHU2MzZFXHU1RTkzXCIsXHJcbiAgICAgICAgaWNvbjogXCJkYXRhYmFzZS1mdWxsXCIsXHJcbiAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgXCIvYXJ0aWNsZS9teXNxbC9cIixcclxuICAgICAgICAgICAgXCIvYXJ0aWNsZS9yZWRpcy9cIixcclxuICAgICAgICAgICAgXCIvYXJ0aWNsZS9lbGFzdGljc2VhcmNoL1wiLFxyXG4gICAgICAgICAgICBcIi9hcnRpY2xlL21vbmdvZGIvXCIsXHJcbiAgICAgICAgICAgIFwiL2FydGljbGUvbXliYXRpcy9cIlxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgdGV4dDogXCJcdThCQkVcdThCQTEvXHU2N0I2XHU2Nzg0XCIsXHJcbiAgICAgICAgaWNvbjogXCJzaGVqaTFcIixcclxuICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICBcIi9hcnRpY2xlL2Rlc2lnbi9cIixcclxuICAgICAgICAgICAgXCIvYXJ0aWNsZS9mcmFtZXdvcmsvXCIsXHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICB0ZXh0OiBcIlx1NEUyRFx1OTVGNFx1NEVGNlwiLFxyXG4gICAgICAgIGljb246IFwiemhvbmdqaWFuamlhblwiLFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgIFwiL2FydGljbGUvcmFiYml0bXEvXCIsXHJcbiAgICAgICAgICAgIFwiL2FydGljbGUvbmV0dHkvXCIsXHJcbiAgICAgICAgICAgIFwiL2FydGljbGUvcXVhcnR6L1wiLFxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgdGV4dDogXCJcdThGRDBcdTdFRjRcIixcclxuICAgICAgICBpY29uOiBcInl1bndlaS15dW53ZWlyaXpoaVwiLFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgIFwiL2FydGljbGUvZ2l0L1wiLFxyXG4gICAgICAgICAgICBcIi9hcnRpY2xlL2RvY2tlci9cIixcclxuICAgICAgICAgICAgXCIvYXJ0aWNsZS9rOHMvXCIsXHJcbiAgICAgICAgICAgIFwiL2FydGljbGUvamVua2lucy9cIixcclxuICAgICAgICAgICAgXCIvYXJ0aWNsZS9saW51eC9cIixcclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHRleHQ6IFwiXHU1OTI3XHU2NTcwXHU2MzZFXCIsXHJcbiAgICAgICAgaWNvbjogXCJxaXRhXCIsXHJcbiAgICAgICAgbGluazogXCIvYXJ0aWNsZS9kYXRhL1wiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHRleHQ6IFwiXHU2NTcwXHU1QjY2XHU1RUZBXHU2QTIxXCIsXHJcbiAgICAgICAgaWNvbjogXCJxaXRhXCIsXHJcbiAgICAgICAgbGluazogXCIvYXJ0aWNsZS9tb2RlbGluZy9cIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICB0ZXh0OiBcIlx1NTE3Nlx1NEVENlx1NjU4N1x1N0FFMFwiLFxyXG4gICAgICAgIGljb246IFwicWl0YVwiLFxyXG4gICAgICAgIGxpbms6IFwiL2FydGljbGUvb3RoZXIvXCJcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgdGV4dDogXCJcdTUxNzNcdTRFOEVcIixcclxuICAgICAgICBpY29uOiBcImd1YW55dTFcIixcclxuICAgICAgICBsaW5rOiBcIi9hYm91dC9cIlxyXG4gICAgfSxcclxuICAgIF0sXHJcbiAgICBzaWRlYmFyOiB7XHJcbiAgICAgICAgXCIvZ3VpZGUvXCI6IFwic3RydWN0dXJlXCIsXHJcbiAgICAgICAgXCIvYXJ0aWNsZS9qYXZhL1wiOiBcInN0cnVjdHVyZVwiLFxyXG4gICAgICAgIFwiL2FydGljbGUvZ28vXCI6IFwic3RydWN0dXJlXCIsXHJcbiAgICAgICAgXCIvYXJ0aWNsZS9qcy9cIjogXCJzdHJ1Y3R1cmVcIixcclxuICAgICAgICBcIi9hcnRpY2xlL2s4cy9cIjogXCJzdHJ1Y3R1cmVcIixcclxuICAgICAgICBcIi9hcnRpY2xlL3B5dGhvbi9cIjogXCJzdHJ1Y3R1cmVcIixcclxuICAgICAgICBcIi9hcnRpY2xlL2FsZ29yaXRobS9cIjogXCJzdHJ1Y3R1cmVcIixcclxuICAgICAgICBcIi9hcnRpY2xlL2RhdGEvXCI6IFwic3RydWN0dXJlXCIsXHJcbiAgICAgICAgXCIvYXJ0aWNsZS90b21jYXQvXCI6IFwic3RydWN0dXJlXCIsXHJcbiAgICAgICAgXCIvYXJ0aWNsZS9zcHJpbmdzL1wiOiBcInN0cnVjdHVyZVwiLFxyXG4gICAgICAgIFwiL2FydGljbGUvdnVlL1wiOiBcInN0cnVjdHVyZVwiLFxyXG4gICAgICAgIFwiL2FydGljbGUvZGVzaWduL1wiOiBcInN0cnVjdHVyZVwiLFxyXG4gICAgICAgIFwiL2FydGljbGUvbXliYXRpcy9cIjogXCJzdHJ1Y3R1cmVcIixcclxuICAgICAgICBcIi9hcnRpY2xlL215c3FsL1wiOiBcInN0cnVjdHVyZVwiLFxyXG4gICAgICAgIFwiL2FydGljbGUvcmVkaXMvXCI6IFwic3RydWN0dXJlXCIsXHJcbiAgICAgICAgXCIvYXJ0aWNsZS9yYWJiaXRtcS9cIjogXCJzdHJ1Y3R1cmVcIixcclxuICAgICAgICBcIi9hcnRpY2xlL2VsYXN0aWNzZWFyY2gvXCI6IFwic3RydWN0dXJlXCIsXHJcbiAgICAgICAgXCIvYXJ0aWNsZS9mcmFtZXdvcmsvXCI6IFwic3RydWN0dXJlXCIsXHJcbiAgICAgICAgXCIvYXJ0aWNsZS9naXQvXCI6IFwic3RydWN0dXJlXCIsXHJcbiAgICAgICAgXCIvYXJ0aWNsZS9kb2NrZXIvXCI6IFwic3RydWN0dXJlXCIsXHJcbiAgICAgICAgXCIvYXJ0aWNsZS9qZW5raW5zL1wiOiBcInN0cnVjdHVyZVwiLFxyXG4gICAgICAgIFwiL2FydGljbGUvbGludXgvXCI6IFwic3RydWN0dXJlXCIsXHJcbiAgICAgICAgXCIvYXJ0aWNsZS9sdWEvXCI6IFwic3RydWN0dXJlXCIsXHJcbiAgICAgICAgXCIvYXJ0aWNsZS9tb25nb2RiL1wiOiBcInN0cnVjdHVyZVwiLFxyXG4gICAgICAgIFwiL2FydGljbGUvbmV0dHkvXCI6IFwic3RydWN0dXJlXCIsXHJcbiAgICAgICAgXCIvYXJ0aWNsZS9xdWFydHovXCI6IFwic3RydWN0dXJlXCIsXHJcbiAgICAgICAgXCIvYXJ0aWNsZS9tb2RlbGluZy9cIjogXCJzdHJ1Y3R1cmVcIixcclxuICAgICAgICBcIi9hcnRpY2xlL290aGVyL1wiOiBcInN0cnVjdHVyZVwiLFxyXG4gICAgICAgIFwiL2Fib3V0L1wiOiBcInN0cnVjdHVyZVwiLFxyXG4gICAgICAgIFwiL1wiOiBbXHJcbiAgICAgICAgICAgIFwiXCIgLyogLyAqLyxcclxuICAgICAgICAgICAgLy8gXCJjb250YWN0XCIgLyogL2NvbnRhY3QuaHRtbCAqLyxcclxuICAgICAgICAgICAgLy8gXCJhYm91dFwiIC8qIC9hYm91dC5odG1sICovLFxyXG4gICAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAgdGhlbWVDb2xvcjoge1xyXG4gICAgICAgIGJsdWU6IFwiIzIxOTZmM1wiLFxyXG4gICAgICAgIHJlZDogXCIjZjI2ZDZkXCIsXHJcbiAgICAgICAgZ3JlZW46IFwiIzNlYWY3Y1wiLFxyXG4gICAgICAgIG9yYW5nZTogXCIjZmI5YjVmXCIsXHJcbiAgICB9LFxyXG4gICAgcGx1Z2luczoge1xyXG4gICAgICAgIGJsb2c6IHtcclxuICAgICAgICAgICAgZXhjZXJwdDogdHJ1ZSxcclxuICAgICAgICAgICAgZXhjZXJwdExlbmd0aDogMCxcclxuICAgICAgICAgICAgZmlsdGVyOiAocGFnZSkgPT4gQm9vbGVhbihwYWdlLmZpbGVQYXRoUmVsYXRpdmUpICYmICFwYWdlLmZyb250bWF0dGVyLmhvbWUgJiYgIXBhZ2UuZnJvbnRtYXR0ZXIubm90UGFnZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXV0b0NhdGFsb2c6IHRydWUsXHJcbiAgICAgICAgLy8gbWRFbmhhbmNlOiB7XHJcbiAgICAgICAgLy8gICAgIHByZXNlbnRhdGlvbjogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgdGFiczogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgY2hhcnQ6IHRydWUsXHJcbiAgICAgICAgLy8gICAgIHZ1ZVBsYXlncm91bmQ6IHRydWUsXHJcbiAgICAgICAgLy8gICAgIGNvZGV0YWJzOiB0cnVlLFxyXG4gICAgICAgIC8vICAgICB0YXNrbGlzdDogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgaW1nTGF6eWxvYWQ6IHRydWUsXHJcbiAgICAgICAgLy8gICAgIGZpZ3VyZTogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgaW5jbHVkZTogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgYXR0cnM6IHRydWUsXHJcbiAgICAgICAgLy8gICAgIG1hcms6IHRydWUsXHJcbiAgICAgICAgLy8gICAgIGNvbnRhaW5lcjogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgYWxpZ246IHRydWUsXHJcbiAgICAgICAgLy8gfSxcclxuICAgICAgICBwaG90b1N3aXBlOiB0cnVlLFxyXG4gICAgICAgIGNvcHlyaWdodDoge1xyXG4gICAgICAgICAgICBnbG9iYWw6IHRydWUsXHJcbiAgICAgICAgICAgIGF1dGhvcjogXCJnendcIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBibG9nOiB7XHJcbiAgICAgICAgbmFtZTogXCJHendcIixcclxuICAgICAgICBhdmF0YXI6IFwiL2xvZ28ucG5nXCIsXHJcbiAgICAgICAgcm91bmRBdmF0YXI6IHRydWUsXHJcbiAgICAgICAgZGVzY3JpcHRpb246IFwiXHU2NzgxXHU3QjgwXHU0RTNCXHU0RTQ5XCIsXHJcbiAgICAgICAgbWVkaWFzOiB7XHJcbiAgICAgICAgICAgIC8vIEdpdEh1YiBcdTVERjJcdTdFQ0ZcdTUxODVcdTdGNkVcdTRFODZcdTU2RkVcdTY4MDdcclxuICAgICAgICAgICAgR2l0SHViOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9nendycnJcIixcclxuICAgICAgICAgICAgUVE6IFwidGVuY2VudDovL21lc3NhZ2UvP3Vpbj0xNjI3MTIxMTkzJlNpdGU9Jk1lbnU9eWVzXCIsXHJcbiAgICAgICAgICAgIEVtYWlsOiBcIm1haWx0bzoxNjI3MTIxMTkzQHFxLmNvbVwiLFxyXG4gICAgICAgICAgICBCaWxpQmlsaTogXCJodHRwczovL3NwYWNlLmJpbGliaWxpLmNvbS8zNjEyMDY2NTQ/c3BtX2lkX2Zyb209MzMzLjEwMDcuMC4wXCIsXHJcbiAgICAgICAgICAgIFdlY2hhdDogXCJ3ZWl4aW46Ly9kbC9idXNpbmVzcy8/dD1Hendlbjk5Ni1pY3UtaW9cIlxyXG4gICAgICAgICAgICAvLyBNZWRpYVg6IFtcclxuICAgICAgICAgICAgLy8gICAgIC8vIFx1OTRGRVx1NjNBNVxyXG4gICAgICAgICAgICAvLyAgICAgXCJodHRwczovL21lZGlheC5jb20vVXNlclgvXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAvLyBcdTU2RkVcdTY4MDcgU1ZHIFx1NUI1N1x1N0IyNlx1NEUzMlxyXG4gICAgICAgICAgICAvLyAgICAgXCI8c3ZnIC4uLi48L3N2Zz5cIixcclxuICAgICAgICAgICAgLy8gXSxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxufSkiLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6L015RGlzay9BLUNvZGUvVnVlL0luZGl2aWR1YWwvQmxvZy9kb2NzLy52dWVwcmVzcy9jb25maWdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXE15RGlza1xcXFxBLUNvZGVcXFxcVnVlXFxcXEluZGl2aWR1YWxcXFxcQmxvZ1xcXFxkb2NzXFxcXC52dWVwcmVzc1xcXFxjb25maWdcXFxcbWFya2Rvd24uanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L015RGlzay9BLUNvZGUvVnVlL0luZGl2aWR1YWwvQmxvZy9kb2NzLy52dWVwcmVzcy9jb25maWcvbWFya2Rvd24uanNcIjtpbXBvcnQge1xyXG4gICAgYW5jaG9yUGx1Z2luXHJcbn0gZnJvbSAnQHZ1ZXByZXNzL21hcmtkb3duJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgYW5jaG9yOiB7XHJcbiAgICAgICAgbGV2ZWw6IFsxLCAyLCAzXSxcclxuICAgICAgICBwZXJtYWxpbms6IGFuY2hvclBsdWdpbi5wZXJtYWxpbmsuYXJpYUhpZGRlbih7XHJcbiAgICAgICAgICAgIGNsYXNzOiAnaGVhZGVyLWFuY2hvcicsXHJcbiAgICAgICAgICAgIHN5bWJvbDogJyMnLFxyXG4gICAgICAgICAgICBzcGFjZTogdHJ1ZSxcclxuICAgICAgICAgICAgcGxhY2VtZW50OiAnYmVmb3JlJyxcclxuICAgICAgICB9KSxcclxuICAgIH0sXHJcbiAgICB0b2M6IHtcclxuICAgICAgICBsZXZlbDogWzEsIDIsIDNdXHJcbiAgICB9LFxyXG4gICAgaGVhZGVyczoge1xyXG4gICAgICAgIGxldmVsOiBbMSwgMiwgM11cclxuICAgIH1cclxufSIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzovTXlEaXNrL0EtQ29kZS9WdWUvSW5kaXZpZHVhbC9CbG9nL2RvY3MvLnZ1ZXByZXNzL2NvbmZpZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcTXlEaXNrXFxcXEEtQ29kZVxcXFxWdWVcXFxcSW5kaXZpZHVhbFxcXFxCbG9nXFxcXGRvY3NcXFxcLnZ1ZXByZXNzXFxcXGNvbmZpZ1xcXFxwbHVnaW5zLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9NeURpc2svQS1Db2RlL1Z1ZS9JbmRpdmlkdWFsL0Jsb2cvZG9jcy8udnVlcHJlc3MvY29uZmlnL3BsdWdpbnMuanNcIjtpbXBvcnQge1xyXG4gICAgc2VhcmNoUHJvUGx1Z2luXHJcbn0gZnJvbSBcInZ1ZXByZXNzLXBsdWdpbi1zZWFyY2gtcHJvXCI7XHJcbmltcG9ydCB7XHJcbiAgICBjb21tZW50UGx1Z2luXHJcbn0gZnJvbSBcInZ1ZXByZXNzLXBsdWdpbi1jb21tZW50MlwiO1xyXG5pbXBvcnQge1xyXG4gICAgcmVnaXN0ZXJDb21wb25lbnRzUGx1Z2luXHJcbn0gZnJvbSAnQHZ1ZXByZXNzL3BsdWdpbi1yZWdpc3Rlci1jb21wb25lbnRzJ1xyXG5pbXBvcnQge1xyXG4gICAgY29udGFpbmVyUGx1Z2luXHJcbn0gZnJvbSAnQHZ1ZXByZXNzL3BsdWdpbi1jb250YWluZXInXHJcbmltcG9ydCB7XHJcbiAgICBmZWVkUGx1Z2luXHJcbn0gZnJvbSBcInZ1ZXByZXNzLXBsdWdpbi1mZWVkMlwiO1xyXG5pbXBvcnQge1xyXG4gICAgcHdhUGx1Z2luXHJcbn0gZnJvbSBcInZ1ZXByZXNzLXBsdWdpbi1wd2EyXCI7XHJcbmltcG9ydCB7XHJcbiAgICBtZEVuaGFuY2VQbHVnaW5cclxufSBmcm9tIFwidnVlcHJlc3MtcGx1Z2luLW1kLWVuaGFuY2VcIjtcclxuaW1wb3J0IHtcclxuICAgIGNvbXBvbmVudHNQbHVnaW5cclxufSBmcm9tIFwidnVlcHJlc3MtcGx1Z2luLWNvbXBvbmVudHNcIjtcclxuaW1wb3J0IHtcclxuICAgIGdldERpcm5hbWUsXHJcbiAgICBwYXRoXHJcbn0gZnJvbSBcIkB2dWVwcmVzcy91dGlsc1wiO1xyXG4vLyBpbXBvcnQgeyBzZW9QbHVnaW4gfSBmcm9tIFwidnVlcHJlc3MtcGx1Z2luLXNlbzJcIjtcclxuLy8gaW1wb3J0IHsgcmVhZGluZ1RpbWVQbHVnaW4gfSBmcm9tIFwidnVlcHJlc3MtcGx1Z2luLXJlYWRpbmctdGltZTJcIjtcclxuLy8gaW1wb3J0IHsgYXV0b0NhdGFsb2dQbHVnaW4gfSBmcm9tIFwidnVlcHJlc3MtcGx1Z2luLWF1dG8tY2F0YWxvZ1wiO1xyXG5pbXBvcnQgeyB0b2NQbHVnaW4gfSBmcm9tICdAdnVlcHJlc3MvcGx1Z2luLXRvYydcclxuXHJcbmNvbnN0IF9fZGlybmFtZSA9IGdldERpcm5hbWUoXHJcbiAgICBpbXBvcnQubWV0YS51cmwpXHJcblxyXG5leHBvcnQgZGVmYXVsdCBbXHJcbiAgICAvLyByZWFkaW5nVGltZVBsdWdpbih7XHJcbiAgICAvLyAgICAgLy8gXHU0RjYwXHU3Njg0XHU5MDA5XHU5ODc5XHJcbiAgICAvLyB9KSxcclxuICAgIC8vIHNlb1BsdWdpbih7XHJcbiAgICAvLyAgICAgLy8gXHU0RjYwXHU3Njg0XHU5MDA5XHU5ODc5XHJcbiAgICAvLyAgICAgaG9zdG5hbWU6IFwiZ3p3cnJyLmdpdGh1Yi5pb1wiLFxyXG4gICAgLy8gICAgIGF1dGhvcjoge1xyXG4gICAgLy8gICAgICAgICBuYW1lOiBcIkd6d1wiLFxyXG4gICAgLy8gICAgICAgICB1cmw6IFwiaHR0cHM6Ly9nendycnIuZ2l0aHViLmlvXCIsXHJcbiAgICAvLyAgICAgICAgIGVtYWlsOiBcIjE2MjcxMjExOTNAcXEuY29tXCJcclxuICAgIC8vICAgICB9LFxyXG4gICAgLy8gICAgIGF1dG9EZXNjcmlwdGlvbjogdHJ1ZVxyXG4gICAgLy8gfSksXHJcbiAgICB0b2NQbHVnaW4oe1xyXG4gICAgICAgIC8vIFx1OTE0RFx1N0Y2RVx1OTg3OVxyXG4gICAgICAgIGNvbXBvbmVudE5hbWU6ICdUb2MnLFxyXG4gICAgICAgIGRlZmF1bHRPcHRpb25zOiB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lclRhZzogJ25hdicsXHJcbiAgICAgICAgICAgIGNvbnRhaW5lckNsYXNzOiAndnVlcHJlc3MtdG9jJyxcclxuICAgICAgICAgICAgbGlzdENsYXNzOiAndnVlcHJlc3MtdG9jLWxpc3QnLFxyXG4gICAgICAgICAgICBpdGVtQ2xhc3M6ICd2dWVwcmVzcy10b2MtaXRlbScsXHJcbiAgICAgICAgICAgIGxpbmtUYWc6ICdSb3V0ZXJMaW5rJyxcclxuICAgICAgICAgICAgbGlua0NsYXNzOiAndnVlcHJlc3MtdG9jLWxpbmsnLFxyXG4gICAgICAgICAgICBsaW5rQWN0aXZlQ2xhc3M6ICdhY3RpdmUnLFxyXG4gICAgICAgICAgICBsaW5rQ2hpbGRyZW5BY3RpdmVDbGFzczogJ2FjdGl2ZScsXHJcbiAgICAgICAgfVxyXG4gICAgfSksXHJcbiAgICAvLyBhdXRvQ2F0YWxvZ1BsdWdpbih7XHJcbiAgICAvLyAgICAgLy9cdTYzRDJcdTRFRjZcdTkwMDlcdTk4NzlcclxuICAgIC8vICAgICBpbmRleDogdHJ1ZVxyXG4gICAgLy8gfSksXHJcbiAgICBtZEVuaGFuY2VQbHVnaW4oe1xyXG4gICAgICAgIHN0eWxpemU6IFt7XHJcbiAgICAgICAgICAgIG1hdGNoZXI6IC9eXHU0RTBELyxcclxuICAgICAgICAgICAgcmVwbGFjZXI6ICh7XHJcbiAgICAgICAgICAgICAgICB0YWcsXHJcbiAgICAgICAgICAgICAgICBhdHRycyxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRcclxuICAgICAgICAgICAgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRhZyA9PT0gXCJlbVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogXCJzcGFuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5hdHRycyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiBcImVtXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCxcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXSxcclxuICAgICAgICBtZXJtYWlkOiB0cnVlLFxyXG4gICAgICAgIHByZXNlbnRhdGlvbjogdHJ1ZSxcclxuICAgICAgICB0YWJzOiB0cnVlLFxyXG4gICAgICAgIGNoYXJ0OiB0cnVlLFxyXG4gICAgICAgIHZ1ZVBsYXlncm91bmQ6IHRydWUsXHJcbiAgICAgICAgY29kZXRhYnM6IHRydWUsXHJcbiAgICAgICAgdGFza2xpc3Q6IHRydWUsXHJcbiAgICAgICAgaW1nTGF6eWxvYWQ6IHRydWUsXHJcbiAgICAgICAgZmlndXJlOiB0cnVlLFxyXG4gICAgICAgIGluY2x1ZGU6IHRydWUsXHJcbiAgICAgICAgYXR0cnM6IHRydWUsXHJcbiAgICAgICAgbWFyazogdHJ1ZSxcclxuICAgICAgICBjb250YWluZXI6IHRydWUsXHJcbiAgICAgICAgYWxpZ246IHRydWUsXHJcbiAgICAgICAgLy8gXHU1NDJGXHU3NTI4XHU0RTBCXHU4OUQyXHU2ODA3XHU1MjlGXHU4MEZEXHJcbiAgICAgICAgc3ViOiB0cnVlLFxyXG4gICAgICAgIC8vIFx1NTQyRlx1NzUyOFx1NEUwQVx1ODlEMlx1NjgwN1xyXG4gICAgICAgIHN1cDogdHJ1ZSxcclxuICAgICAgICAvLyBcdTU0MkZcdTc1MjhcdTgxMUFcdTZDRThcclxuICAgICAgICBmb290bm90ZTogdHJ1ZSxcclxuICAgIH0pLFxyXG4gICAgY29tcG9uZW50c1BsdWdpbih7XHJcbiAgICAgICAgLy8gXHU2M0QyXHU0RUY2XHU5MDA5XHU5ODc5XHJcbiAgICAgICAgY29tcG9uZW50czogW1wiUERGXCIsIFwiQmFkZ2VcIl1cclxuICAgIH0pLFxyXG4gICAgY29udGFpbmVyUGx1Z2luKHtcclxuICAgICAgICB0eXBlOiAncGFyYScsXHJcbiAgICAgICAgbG9jYWxlczoge1xyXG4gICAgICAgICAgICAnLyc6IHtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRJbmZvOiAnVElQJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJy96aC8nOiB7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0SW5mbzogJ1x1NjNEMFx1NzkzQScsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiZWZvcmU6IChpbmZvKSA9PlxyXG4gICAgICAgICAgICBgPGRpdiBjbGFzcz1cImN1c3RvbS1jb250YWluZXJcIj4ke2luZm8gPyBgPHAgY2xhc3M9XCJjdXN0b20tY29udGFpbmVyLXRpdGxlXCI+JHtpbmZvfTwvcD5gIDogJyd9XFxuYCxcclxuICAgICAgICBhZnRlcjogKCkgPT4gJzwvZGl2PlxcbidcclxuICAgIH0pLFxyXG4gICAgcmVnaXN0ZXJDb21wb25lbnRzUGx1Z2luKHtcclxuICAgICAgICBjb21wb25lbnRzRGlyOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vY29tcG9uZW50cy9jdXN0b20nKSxcclxuICAgIH0pLFxyXG4gICAgc2VhcmNoUHJvUGx1Z2luKHtcclxuICAgICAgICAvLyBcdTdEMjJcdTVGMTVcdTUxNjhcdTkwRThcdTUxODVcdTVCQjlcclxuICAgICAgICBpbmRleENvbnRlbnQ6IHRydWUsXHJcbiAgICAgICAgLy8gXHU0RTNBXHU1MjA2XHU3QzdCXHU1NDhDXHU2ODA3XHU3QjdFXHU2REZCXHU1MkEwXHU3RDIyXHU1RjE1XHJcbiAgICAgICAgY3VzdG9tRmllbGRzOiBbe1xyXG4gICAgICAgICAgICBnZXR0ZXI6IChwYWdlKSA9PiBwYWdlLmZyb250bWF0dGVyLmNhdGVnb3J5ICsgXCJcIixcclxuICAgICAgICAgICAgZm9ybWF0dGVyOiBcIlx1NTIwNlx1N0M3Qlx1RkYxQSRjb250ZW50XCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldHRlcjogKHBhZ2UpID0+IHBhZ2UuZnJvbnRtYXR0ZXIudGFnICsgXCJcIixcclxuICAgICAgICAgICAgZm9ybWF0dGVyOiBcIlx1NjgwN1x1N0I3RVx1RkYxQSRjb250ZW50XCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIGxvY2FsZXM6IHtcclxuICAgICAgICAgICAgXCIvemgvXCI6IHtcclxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIlx1NjQxQ1x1N0QyMlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICB9KSxcclxuICAgIGNvbW1lbnRQbHVnaW4oe1xyXG4gICAgICAgIHByb3ZpZGVyOiBcIkdpc2N1c1wiLFxyXG4gICAgICAgIGNvbW1lbnQ6IHRydWUsXHJcbiAgICAgICAgcmVwbzogXCJnendycnIvZ2lzY3VzXCIsXHJcbiAgICAgICAgcmVwb0lkOiBcIlJfa2dET0k0MHl1QVwiLFxyXG4gICAgICAgIGNhdGVnb3J5OiBcIkdlbmVyYWxcIixcclxuICAgICAgICBjYXRlZ29yeUlkOiBcIkRJQ19rd0RPSTQweXVNNENUODZMXCIsXHJcbiAgICAgICAgbWFwcGluZzogXCJ0aXRsZVwiLFxyXG4gICAgICAgIHN0cmljdDogZmFsc2VcclxuICAgIH0pLFxyXG4gICAgLy8gYXV0b0NhdGFsb2dQbHVnaW4oKSxcclxuICAgIGZlZWRQbHVnaW4oe1xyXG4gICAgICAgIGhvc3RuYW1lOiBcImh0dHBzOi8vZ3p3cnJyLmdpdGh1Yi5pb1wiLFxyXG4gICAgICAgIGF0b206IHRydWUsXHJcbiAgICAgICAgcnNzOiB0cnVlLFxyXG4gICAgICAgIGpzb246IHRydWUsXHJcbiAgICAgICAgaWNvbjogXCJodHRwczovL215LXBob3Rvcy0xLm9zcy1jbi1oYW5nemhvdS5hbGl5dW5jcy5jb20vSW5kaXZpZHVhbC9sb2dvLnBuZ1wiLFxyXG4gICAgICAgIC8vIHJzc091dHB1dEZpbGVuYW1lOiBcInJzcy54bWxcIlxyXG4gICAgfSksXHJcbiAgICBwd2FQbHVnaW4oe1xyXG4gICAgICAgIHNob3dJbnN0YWxsOiB0cnVlLFxyXG4gICAgICAgIG1hbmlmZXN0OiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiR3p3J3MgQmxvZ1wiLFxyXG4gICAgICAgICAgICBzaG9ydF9uYW1lOiBcIkd6dydzIEJsb2dcIixcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiR3p3J3MgQmxvZ1wiLFxyXG4gICAgICAgICAgICB0aGVtZV9jb2xvcjogXCIjMjEzMzJkXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmYXZpY29uOiBcImh0dHBzOi8vbXktcGhvdG9zLTEub3NzLWNuLWhhbmd6aG91LmFsaXl1bmNzLmNvbS9JbmRpdmlkdWFsL2xvZ28ucG5nXCIsXHJcbiAgICAgICAgLy8gXHU2NzAwXHU1OTI3XHU3RjEzXHU1QjU4XHVGRjFBNU1cclxuICAgICAgICBtYXhTaXplOiA0MDk2LFxyXG4gICAgICAgIGNhY2hlSFRNTDogZmFsc2UsXHJcbiAgICAgICAgY2FjaGVQaWM6IGZhbHNlLFxyXG4gICAgICAgIG1heFBpY1NpemU6IDEwMjQsXHJcbiAgICAgICAgdXBkYXRlOiBcImF2YWlsYWJsZVwiLFxyXG4gICAgICAgIHRoZW1lQ29sb3I6IFwiIzIxMzMyZFwiXHJcbiAgICB9KSxcclxuXSIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzovTXlEaXNrL0EtQ29kZS9WdWUvSW5kaXZpZHVhbC9CbG9nL2RvY3MvLnZ1ZXByZXNzL2NvbmZpZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcTXlEaXNrXFxcXEEtQ29kZVxcXFxWdWVcXFxcSW5kaXZpZHVhbFxcXFxCbG9nXFxcXGRvY3NcXFxcLnZ1ZXByZXNzXFxcXGNvbmZpZ1xcXFxidW5kbGVyLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9NeURpc2svQS1Db2RlL1Z1ZS9JbmRpdmlkdWFsL0Jsb2cvZG9jcy8udnVlcHJlc3MvY29uZmlnL2J1bmRsZXIuanNcIjtpbXBvcnQge1xyXG4gICAgdml0ZUJ1bmRsZXJcclxufSBmcm9tICdAdnVlcHJlc3MvYnVuZGxlci12aXRlJ1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHZpdGVCdW5kbGVyKHtcclxuICAgIHZpdGVPcHRpb25zOiB7XHJcbiAgICAgICAgYnVpbGQ6IHtcclxuICAgICAgICAgICAgZW1wdHlPdXREaXI6IGZhbHNlLFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB2dWVQbHVnaW5PcHRpb25zOiB7fSxcclxufSkiLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6L015RGlzay9BLUNvZGUvVnVlL0luZGl2aWR1YWwvQmxvZy9kb2NzLy52dWVwcmVzcy9wbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxNeURpc2tcXFxcQS1Db2RlXFxcXFZ1ZVxcXFxJbmRpdmlkdWFsXFxcXEJsb2dcXFxcZG9jc1xcXFwudnVlcHJlc3NcXFxccGx1Z2luc1xcXFx0YWJsZVBsdWdpbi5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovTXlEaXNrL0EtQ29kZS9WdWUvSW5kaXZpZHVhbC9CbG9nL2RvY3MvLnZ1ZXByZXNzL3BsdWdpbnMvdGFibGVQbHVnaW4uanNcIjtpbXBvcnQgTWFya2Rvd25JdCBmcm9tICdtYXJrZG93bi1pdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3cmFwVGFibGUobWQpIHtcclxuICAgIGNvbnN0IGRlZmF1bHRSZW5kZXIgPSBtZC5yZW5kZXJlci5ydWxlcy50YWJsZV9vcGVuIHx8IGZ1bmN0aW9uICh0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzZWxmKSB7XHJcbiAgICAgICAgcmV0dXJuIHNlbGYucmVuZGVyVG9rZW4odG9rZW5zLCBpZHgsIG9wdGlvbnMpO1xyXG4gICAgfTtcclxuXHJcbiAgICBtZC5yZW5kZXJlci5ydWxlcy50YWJsZV9vcGVuID0gZnVuY3Rpb24gKHRva2VucywgaWR4LCBvcHRpb25zLCBlbnYsIHNlbGYpIHtcclxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJ0YWJsZS13cmFwcGVyIFwiPiR7ZGVmYXVsdFJlbmRlcih0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzZWxmKX1gO1xyXG4gICAgfTtcclxuXHJcbiAgICBtZC5yZW5kZXJlci5ydWxlcy50YWJsZV9jbG9zZSA9IGZ1bmN0aW9uICh0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzZWxmKSB7XHJcbiAgICAgICAgcmV0dXJuIGAke2RlZmF1bHRSZW5kZXIodG9rZW5zLCBpZHgsIG9wdGlvbnMsIGVudiwgc2VsZil9PC9kaXY+YDtcclxuICAgIH07XHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFHQSxTQUFTLHdCQUF3Qjs7O0FDSDZUO0FBQUEsRUFDMVY7QUFBQSxFQUNBO0FBQUEsT0FDRztBQUh3TixJQUFNLDJDQUEyQztBQUloUixJQUFNLFlBQVk7QUFBQSxFQUNkO0FBQWU7QUFFbkIsSUFBTyxnQkFBUTtBQUFBLEVBQ1gsZ0RBQWdELEtBQUs7QUFBQSxJ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LGFBQWE7QUFBQSxJQUNULE9BQU87QUFBQSxNQUNILGFBQWE7QUFBQSxJQUNqQjtBQUFBLEVBQ0o7QUFBQSxFQUNBLGtCQUFrQixDQUFDO0FBQ3ZCLENBQUM7OztBQ1o0VyxPQUFPLGdCQUFnQjtBQUVyWCxTQUFSLFVBQTJCLElBQUk7QUFDbEMsUUFBTSxnQkFBZ0IsR0FBRyxTQUFTLE1BQU0sY0FBYyxTQUFVLFFBQVEsS0FBSyxTQUFTLEtBQUssTUFBTTtBQUM3RixXQUFPLEtBQUssWUFBWSxRQUFRLEtBQUssT0FBTztBQUFBLEVBQ2hEO0FBRUEsS0FBRyxTQUFTLE1BQU0sYUFBYSxTQUFVLFFBQVEsS0FBSyxTQUFTLEtBQUssTUFBTTtBQUN0RSxXQUFPLCtCQUErQixjQUFjLFFBQVEsS0FBSyxTQUFTLEtBQUssSUFBSTtBQUFBLEVBQ3ZGO0FBRUEsS0FBRyxTQUFTLE1BQU0sY0FBYyxTQUFVLFFBQVEsS0FBSyxTQUFTLEtBQUssTUFBTTtBQUN2RSxXQUFPLEdBQUcsY0FBYyxRQUFRLEtBQUssU0FBUyxLQUFLLElBQUk7QUFBQSxFQUMzRDtBQUNKOzs7QU5GQSxJQUFPLGlCQUFRLGlCQUFpQjtBQUFBLEVBQzVCLE1BQU07QUFBQSxFQUNOLGdCQUFnQjtBQUFBLEVBQ2hCLFNBQVM7QUFBQSxFQUNULE9BQU87QUFBQSxFQUNQLE9BQU87QUFBQSxFQUNQLFNBQVM7QUFBQSxFQUNULFVBQVU7QUFBQSxFQUNWLGVBQWUsQ0FBQyxRQUFRO0FBQUEsRUFFeEI7QUFBQSxFQUNBLGlCQUFpQixDQUFDLElBQUksUUFBUTtBQUMxQixPQUFHLElBQUksU0FBUztBQUFBLEVBQ3BCO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFsiZ2V0RGlybmFtZSIsICJwYXRoIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwiLCAiX19kaXJuYW1lIiwgImdldERpcm5hbWUiLCAicGF0aCJdCn0K
