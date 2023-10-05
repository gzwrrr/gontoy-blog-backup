// docs/.vuepress/config.ts
import { defineUserConfig } from "@vuepress/cli";

// docs/.vuepress/config/alias.js
import {
  getDirname,
  path
} from "@vuepress/utils";
var __vite_injected_original_import_meta_url = "file:///C:/MyDisk/A-Code/Vue/Individual/gontoy-blog/docs/.vuepress/config/alias.js";
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

// docs/.vuepress/config/router.js
var navbar = [
  {
    text: "\u4E3B\u9875",
    link: "/README.md",
    // 仅在 `/zh/guide/` 激活
    activeMatch: "^/zh/guide/$"
  },
  {
    text: "\u5BFC\u822A",
    link: "/guide/",
    // 仅在 `/zh/guide/` 激活
    activeMatch: "^/zh/guide/$"
  },
  {
    text: "\u7F16\u7A0B\u8BED\u8A00",
    children: [
      "/article/java/",
      "/article/c/",
      "/article/go/",
      "/article/js/",
      "/article/python/",
      "/article/lua/"
    ]
  },
  {
    text: "\u7B97\u6CD5",
    link: "/article/algorithm/"
  },
  {
    text: "\u6846\u67B6",
    children: [
      "/article/tomcat/",
      "/article/springs/",
      "/article/vue/"
    ]
  },
  {
    text: "\u6570\u636E\u5E93",
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
    children: [
      "/article/design/",
      "/article/framework/"
    ]
  },
  {
    text: "\u4E2D\u95F4\u4EF6",
    children: [
      "/article/rabbitmq/",
      "/article/netty/",
      "/article/quartz/",
      "/article/kafaka/"
    ]
  },
  {
    text: "\u8FD0\u7EF4",
    children: [
      "/article/git/",
      "/article/docker/",
      "/article/k8s/",
      "/article/jenkins/",
      "/article/linux/"
    ]
  },
  {
    text: "\u79FB\u52A8\u7AEF",
    children: [
      "/article/android/",
      "/article/mp/"
    ]
  },
  {
    text: "\u5927\u6570\u636E",
    link: "/article/data/"
  },
  {
    text: "\u6570\u5B66\u5EFA\u6A21",
    link: "/article/modeling/"
  },
  {
    text: "\u5176\u4ED6\u6587\u7AE0",
    link: "/article/other/"
  },
  {
    text: "\u5173\u4E8E",
    link: "/about/"
  }
];
var sidebar = {
  "/guide/": "structure",
  "/article/java/": "structure",
  "/article/android/": "structure",
  "/article/c/": "structure",
  "/article/go/": "structure",
  "/article/js/": "structure",
  "/article/k8s/": "structure",
  "/article/kafaka/": "structure",
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
  "/article/mp/": "structure",
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
};

// docs/.vuepress/config/theme.js
var theme_default = hopeTheme({
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
    orange: "#ad7e4e"
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

// docs/.vuepress/vuepress-plugin-code/index.js
import { createBuildApp } from "@vuepress/core";
var navPlugin = async () => {
  const app = createBuildApp({
    name: "@org/vuepress-plugin-gontoy",
    multiple: false
  });
  await app.init();
  await app.prepare();
  await app.build();
  await app.pluginApi.hooks.onGenerated.process(app);
  console.log("===========================success===========================");
  console.log(app);
};

// docs/.vuepress/config/plugins.js
var __vite_injected_original_import_meta_url2 = "file:///C:/MyDisk/A-Code/Vue/Individual/gontoy-blog/docs/.vuepress/config/plugins.js";
var __dirname2 = getDirname2(
  __vite_injected_original_import_meta_url2
);
var plugins_default = [
  navPlugin(),
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
    type: "hide",
    locales: {
      "/": {
        defaultInfo: "HIDE"
      },
      "/zh/": {
        defaultInfo: "\u9690\u85CF"
      }
    },
    before: (info) => `<div class="hide-container">${info ? `<p class="hide-container-title">${info}</p>` : ""}
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
      theme_color: "#474748"
    },
    favicon: "https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/Individual/logo.png",
    // 最大缓存：5M
    maxSize: 4096,
    cacheHTML: false,
    cachePic: false,
    maxPicSize: 1024,
    update: "available",
    themeColor: "#474748"
  })
  // autoCatalogPlugin({
  //     //插件选项
  //     index: true
  // }),
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
  // @ts-ignore
  plugins: plugins_default,
  markdown: markdown_default,
  theme: theme_default,
  onInitialized: (app) => {
  },
  extendsMarkdown: (md, app) => {
    md.use(wrapTable);
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udnVlcHJlc3MvY29uZmlnLnRzIiwgImRvY3MvLnZ1ZXByZXNzL2NvbmZpZy9hbGlhcy5qcyIsICJkb2NzLy52dWVwcmVzcy9jb25maWcvdGhlbWUuanMiLCAiZG9jcy8udnVlcHJlc3MvY29uZmlnL3JvdXRlci5qcyIsICJkb2NzLy52dWVwcmVzcy9jb25maWcvbWFya2Rvd24uanMiLCAiZG9jcy8udnVlcHJlc3MvY29uZmlnL3BsdWdpbnMuanMiLCAiZG9jcy8udnVlcHJlc3MvdnVlcHJlc3MtcGx1Z2luLWNvZGUvaW5kZXguanMiLCAiZG9jcy8udnVlcHJlc3MvY29uZmlnL2J1bmRsZXIuanMiLCAiZG9jcy8udnVlcHJlc3MvcGx1Z2lucy90YWJsZVBsdWdpbi5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6L015RGlzay9BLUNvZGUvVnVlL0luZGl2aWR1YWwvZ29udG95LWJsb2cvZG9jcy8udnVlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXE15RGlza1xcXFxBLUNvZGVcXFxcVnVlXFxcXEluZGl2aWR1YWxcXFxcZ29udG95LWJsb2dcXFxcZG9jc1xcXFwudnVlcHJlc3NcXFxcY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9NeURpc2svQS1Db2RlL1Z1ZS9JbmRpdmlkdWFsL2dvbnRveS1ibG9nL2RvY3MvLnZ1ZXByZXNzL2NvbmZpZy50c1wiOy8vIGltcG9ydCB7IGF1dG9DYXRhbG9nUGx1Z2luIH0gZnJvbSBcInZ1ZXByZXNzLXBsdWdpbi1hdXRvLWNhdGFsb2dcIjtcclxuLy8gaW1wb3J0IHsgYmxvZ1BsdWdpbiB9IGZyb20gXCJ2dWVwcmVzcy1wbHVnaW4tYmxvZzJcIjtcclxuXHJcbmltcG9ydCB7IGRlZmluZVVzZXJDb25maWcgfSBmcm9tICdAdnVlcHJlc3MvY2xpJ1xyXG4vLyBcdTgxRUFcdTVCOUFcdTRFNDlcdTkxNERcdTdGNkVcclxuaW1wb3J0IGFsaWFzIGZyb20gXCIuL2NvbmZpZy9hbGlhc1wiO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSBcIi4vY29uZmlnL3RoZW1lXCI7XHJcbmltcG9ydCBtYXJrZG93biBmcm9tIFwiLi9jb25maWcvbWFya2Rvd25cIjtcclxuaW1wb3J0IHBsdWdpbnMgZnJvbSBcIi4vY29uZmlnL3BsdWdpbnNcIjtcclxuaW1wb3J0IGJ1bmRsZXIgZnJvbSAnLi9jb25maWcvYnVuZGxlcic7XHJcbmltcG9ydCB3cmFwVGFibGUgZnJvbSAnLi9wbHVnaW5zL3RhYmxlUGx1Z2luJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZVVzZXJDb25maWcoe1xyXG4gICAgYmFzZTogJy8nLFxyXG4gICAgc2hvdWxkUHJlZmV0Y2g6IGZhbHNlLFxyXG4gICAgYnVuZGxlcjogYnVuZGxlcixcclxuICAgIGFsaWFzOiBhbGlhcyxcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIHBsdWdpbnM6IHBsdWdpbnMsXHJcbiAgICBtYXJrZG93bjogbWFya2Rvd24sXHJcbiAgICB0aGVtZTogdGhlbWUsXHJcbiAgICBvbkluaXRpYWxpemVkOiAoYXBwKSA9PiB7XHJcbiAgICB9LFxyXG4gICAgZXh0ZW5kc01hcmtkb3duOiAobWQsIGFwcCkgPT4ge1xyXG4gICAgICAgIG1kLnVzZSh3cmFwVGFibGUpO1xyXG4gICAgfVxyXG59KTsiLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6L015RGlzay9BLUNvZGUvVnVlL0luZGl2aWR1YWwvZ29udG95LWJsb2cvZG9jcy8udnVlcHJlc3MvY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxNeURpc2tcXFxcQS1Db2RlXFxcXFZ1ZVxcXFxJbmRpdmlkdWFsXFxcXGdvbnRveS1ibG9nXFxcXGRvY3NcXFxcLnZ1ZXByZXNzXFxcXGNvbmZpZ1xcXFxhbGlhcy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovTXlEaXNrL0EtQ29kZS9WdWUvSW5kaXZpZHVhbC9nb250b3ktYmxvZy9kb2NzLy52dWVwcmVzcy9jb25maWcvYWxpYXMuanNcIjtpbXBvcnQge1xyXG4gICAgZ2V0RGlybmFtZSxcclxuICAgIHBhdGhcclxufSBmcm9tIFwiQHZ1ZXByZXNzL3V0aWxzXCI7XHJcbmNvbnN0IF9fZGlybmFtZSA9IGdldERpcm5hbWUoXHJcbiAgICBpbXBvcnQubWV0YS51cmwpXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBcIkB0aGVtZS1ob3BlL21vZHVsZXMvYmxvZy9jb21wb25lbnRzL0Jsb2dIb21lXCI6IHBhdGgucmVzb2x2ZShcclxuICAgICAgICBfX2Rpcm5hbWUsXHJcbiAgICAgICAgXCIuLi9jb21wb25lbnRzL0Jsb2dIb21lLnZ1ZVwiXHJcbiAgICApLFxyXG4gICAgXCJAdGhlbWUtaG9wZS9jb21wb25lbnRzL05vcm1hbFBhZ2VcIjogcGF0aC5yZXNvbHZlKFxyXG4gICAgICAgIF9fZGlybmFtZSxcclxuICAgICAgICBcIi4uL2NvbXBvbmVudHMvTm9ybWFsUGFnZS52dWVcIlxyXG4gICAgKSxcclxufSIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzovTXlEaXNrL0EtQ29kZS9WdWUvSW5kaXZpZHVhbC9nb250b3ktYmxvZy9kb2NzLy52dWVwcmVzcy9jb25maWdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXE15RGlza1xcXFxBLUNvZGVcXFxcVnVlXFxcXEluZGl2aWR1YWxcXFxcZ29udG95LWJsb2dcXFxcZG9jc1xcXFwudnVlcHJlc3NcXFxcY29uZmlnXFxcXHRoZW1lLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9NeURpc2svQS1Db2RlL1Z1ZS9JbmRpdmlkdWFsL2dvbnRveS1ibG9nL2RvY3MvLnZ1ZXByZXNzL2NvbmZpZy90aGVtZS5qc1wiO2ltcG9ydCB7XHJcbiAgICBob3BlVGhlbWVcclxufSBmcm9tIFwidnVlcHJlc3MtdGhlbWUtaG9wZVwiO1xyXG5pbXBvcnQge1xyXG4gICAgbmF2YmFyLFxyXG4gICAgc2lkZWJhclxyXG59IGZyb20gXCIuL3JvdXRlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGhvcGVUaGVtZSh7XHJcbiAgICAvLyBcdTZCNjRcdTU5MDRcdTY1M0VcdTdGNkVcdTRFM0JcdTk4OThcdTkxNERcdTdGNkVcclxuICAgIGF1dGhvcjogXCJHb250b3lcIixcclxuICAgIGZhdmljb246IFwiL2xvZ28ucG5nXCIsXHJcbiAgICBkYXJrbW9kZTogXCJlbmFibGVcIixcclxuICAgIGZ1bGxzY3JlZW46IHRydWUsXHJcbiAgICBpY29uQXNzZXRzOiBcImh0dHBzOi8vYXQuYWxpY2RuLmNvbS90L2MvZm9udF8zODc5NTk0XzAyYTdqeWlveHI4dC5jc3NcIixcclxuICAgIG5hdmJhcixcclxuICAgIHNpZGViYXIsXHJcbiAgICB0aGVtZUNvbG9yOiB7XHJcbiAgICAgICAgcHVycGxlOiBcIiNhNmE1YzRcIixcclxuICAgICAgICBncmVlbjogXCIjN2U5NDk2XCIsXHJcbiAgICAgICAgb3JhbmdlOiBcIiNhZDdlNGVcIixcclxuICAgIH0sXHJcbiAgICBwbHVnaW5zOiB7XHJcbiAgICAgICAgYmxvZzoge1xyXG4gICAgICAgICAgICBleGNlcnB0OiB0cnVlLFxyXG4gICAgICAgICAgICBleGNlcnB0TGVuZ3RoOiAwLFxyXG4gICAgICAgICAgICBmaWx0ZXI6IChwYWdlKSA9PiBCb29sZWFuKHBhZ2UuZmlsZVBhdGhSZWxhdGl2ZSkgJiYgIXBhZ2UuZnJvbnRtYXR0ZXIuaG9tZSAmJiAhcGFnZS5mcm9udG1hdHRlci5ub3RQYWdlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhdXRvQ2F0YWxvZzogdHJ1ZSxcclxuICAgICAgICAvLyBtZEVuaGFuY2U6IHtcclxuICAgICAgICAvLyAgICAgcHJlc2VudGF0aW9uOiB0cnVlLFxyXG4gICAgICAgIC8vICAgICB0YWJzOiB0cnVlLFxyXG4gICAgICAgIC8vICAgICBjaGFydDogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgdnVlUGxheWdyb3VuZDogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgY29kZXRhYnM6IHRydWUsXHJcbiAgICAgICAgLy8gICAgIHRhc2tsaXN0OiB0cnVlLFxyXG4gICAgICAgIC8vICAgICBpbWdMYXp5bG9hZDogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgZmlndXJlOiB0cnVlLFxyXG4gICAgICAgIC8vICAgICBpbmNsdWRlOiB0cnVlLFxyXG4gICAgICAgIC8vICAgICBhdHRyczogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgbWFyazogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgY29udGFpbmVyOiB0cnVlLFxyXG4gICAgICAgIC8vICAgICBhbGlnbjogdHJ1ZSxcclxuICAgICAgICAvLyB9LFxyXG4gICAgICAgIHBob3RvU3dpcGU6IHRydWUsXHJcbiAgICAgICAgY29weXJpZ2h0OiB7XHJcbiAgICAgICAgICAgIGdsb2JhbDogdHJ1ZSxcclxuICAgICAgICAgICAgYXV0aG9yOiBcImd6d1wiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGJsb2c6IHtcclxuICAgICAgICBuYW1lOiBcIkd6d1wiLFxyXG4gICAgICAgIGF2YXRhcjogXCIvbG9nby5wbmdcIixcclxuICAgICAgICByb3VuZEF2YXRhcjogdHJ1ZSxcclxuICAgICAgICBkZXNjcmlwdGlvbjogXCJcdTY3ODFcdTdCODBcdTRFM0JcdTRFNDlcIixcclxuICAgICAgICBtZWRpYXM6IHtcclxuICAgICAgICAgICAgLy8gR2l0SHViIFx1NURGMlx1N0VDRlx1NTE4NVx1N0Y2RVx1NEU4Nlx1NTZGRVx1NjgwN1xyXG4gICAgICAgICAgICBHaXRIdWI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2d6d3JyclwiLFxyXG4gICAgICAgICAgICBRUTogXCJ0ZW5jZW50Oi8vbWVzc2FnZS8/dWluPTE2MjcxMjExOTMmU2l0ZT0mTWVudT15ZXNcIixcclxuICAgICAgICAgICAgRW1haWw6IFwibWFpbHRvOjE2MjcxMjExOTNAcXEuY29tXCIsXHJcbiAgICAgICAgICAgIEJpbGlCaWxpOiBcImh0dHBzOi8vc3BhY2UuYmlsaWJpbGkuY29tLzM2MTIwNjY1ND9zcG1faWRfZnJvbT0zMzMuMTAwNy4wLjBcIixcclxuICAgICAgICAgICAgV2VjaGF0OiBcIndlaXhpbjovL2RsL2J1c2luZXNzLz90PUd6d2VuOTk2LWljdS1pb1wiXHJcbiAgICAgICAgICAgIC8vIE1lZGlhWDogW1xyXG4gICAgICAgICAgICAvLyAgICAgLy8gXHU5NEZFXHU2M0E1XHJcbiAgICAgICAgICAgIC8vICAgICBcImh0dHBzOi8vbWVkaWF4LmNvbS9Vc2VyWC9cIixcclxuICAgICAgICAgICAgLy8gICAgIC8vIFx1NTZGRVx1NjgwNyBTVkcgXHU1QjU3XHU3QjI2XHU0RTMyXHJcbiAgICAgICAgICAgIC8vICAgICBcIjxzdmcgLi4uLjwvc3ZnPlwiLFxyXG4gICAgICAgICAgICAvLyBdLFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG59KSIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzovTXlEaXNrL0EtQ29kZS9WdWUvSW5kaXZpZHVhbC9nb250b3ktYmxvZy9kb2NzLy52dWVwcmVzcy9jb25maWdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXE15RGlza1xcXFxBLUNvZGVcXFxcVnVlXFxcXEluZGl2aWR1YWxcXFxcZ29udG95LWJsb2dcXFxcZG9jc1xcXFwudnVlcHJlc3NcXFxcY29uZmlnXFxcXHJvdXRlci5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovTXlEaXNrL0EtQ29kZS9WdWUvSW5kaXZpZHVhbC9nb250b3ktYmxvZy9kb2NzLy52dWVwcmVzcy9jb25maWcvcm91dGVyLmpzXCI7ZXhwb3J0IGNvbnN0IG5hdmJhciA9IFt7XHJcbiAgICB0ZXh0OiBcIlx1NEUzQlx1OTg3NVwiLFxyXG4gICAgbGluazogXCIvUkVBRE1FLm1kXCIsXHJcbiAgICAvLyBcdTRFQzVcdTU3MjggYC96aC9ndWlkZS9gIFx1NkZDMFx1NkQzQlxyXG4gICAgYWN0aXZlTWF0Y2g6IFwiXi96aC9ndWlkZS8kXCIsXHJcbn0sXHJcbntcclxuICAgIHRleHQ6IFwiXHU1QkZDXHU4MjJBXCIsXHJcbiAgICBsaW5rOiBcIi9ndWlkZS9cIixcclxuICAgIC8vIFx1NEVDNVx1NTcyOCBgL3poL2d1aWRlL2AgXHU2RkMwXHU2RDNCXHJcbiAgICBhY3RpdmVNYXRjaDogXCJeL3poL2d1aWRlLyRcIixcclxufSxcclxue1xyXG4gICAgdGV4dDogXCJcdTdGMTZcdTdBMEJcdThCRURcdThBMDBcIixcclxuICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgXCIvYXJ0aWNsZS9qYXZhL1wiLFxyXG4gICAgICAgIFwiL2FydGljbGUvYy9cIixcclxuICAgICAgICBcIi9hcnRpY2xlL2dvL1wiLFxyXG4gICAgICAgIFwiL2FydGljbGUvanMvXCIsXHJcbiAgICAgICAgXCIvYXJ0aWNsZS9weXRob24vXCIsXHJcbiAgICAgICAgXCIvYXJ0aWNsZS9sdWEvXCJcclxuICAgIF1cclxufSxcclxue1xyXG4gICAgdGV4dDogXCJcdTdCOTdcdTZDRDVcIixcclxuICAgIGxpbms6IFwiL2FydGljbGUvYWxnb3JpdGhtL1wiXHJcbn0sXHJcbntcclxuICAgIHRleHQ6IFwiXHU2ODQ2XHU2N0I2XCIsXHJcbiAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgIFwiL2FydGljbGUvdG9tY2F0L1wiLFxyXG4gICAgICAgIFwiL2FydGljbGUvc3ByaW5ncy9cIixcclxuICAgICAgICBcIi9hcnRpY2xlL3Z1ZS9cIixcclxuICAgIF1cclxufSxcclxue1xyXG4gICAgdGV4dDogXCJcdTY1NzBcdTYzNkVcdTVFOTNcIixcclxuICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgXCIvYXJ0aWNsZS9teXNxbC9cIixcclxuICAgICAgICBcIi9hcnRpY2xlL3JlZGlzL1wiLFxyXG4gICAgICAgIFwiL2FydGljbGUvZWxhc3RpY3NlYXJjaC9cIixcclxuICAgICAgICBcIi9hcnRpY2xlL21vbmdvZGIvXCIsXHJcbiAgICAgICAgXCIvYXJ0aWNsZS9teWJhdGlzL1wiXHJcbiAgICBdXHJcbn0sXHJcbntcclxuICAgIHRleHQ6IFwiXHU4QkJFXHU4QkExL1x1NjdCNlx1Njc4NFwiLFxyXG4gICAgY2hpbGRyZW46IFtcclxuICAgICAgICBcIi9hcnRpY2xlL2Rlc2lnbi9cIixcclxuICAgICAgICBcIi9hcnRpY2xlL2ZyYW1ld29yay9cIixcclxuICAgIF1cclxufSxcclxue1xyXG4gICAgdGV4dDogXCJcdTRFMkRcdTk1RjRcdTRFRjZcIixcclxuICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgXCIvYXJ0aWNsZS9yYWJiaXRtcS9cIixcclxuICAgICAgICBcIi9hcnRpY2xlL25ldHR5L1wiLFxyXG4gICAgICAgIFwiL2FydGljbGUvcXVhcnR6L1wiLFxyXG4gICAgICAgIFwiL2FydGljbGUva2FmYWthL1wiXHJcbiAgICBdXHJcbn0sXHJcbntcclxuICAgIHRleHQ6IFwiXHU4RkQwXHU3RUY0XCIsXHJcbiAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgIFwiL2FydGljbGUvZ2l0L1wiLFxyXG4gICAgICAgIFwiL2FydGljbGUvZG9ja2VyL1wiLFxyXG4gICAgICAgIFwiL2FydGljbGUvazhzL1wiLFxyXG4gICAgICAgIFwiL2FydGljbGUvamVua2lucy9cIixcclxuICAgICAgICBcIi9hcnRpY2xlL2xpbnV4L1wiLFxyXG4gICAgXVxyXG59LFxyXG57XHJcbiAgICB0ZXh0OiBcIlx1NzlGQlx1NTJBOFx1N0FFRlwiLFxyXG4gICAgY2hpbGRyZW46IFtcclxuICAgICAgICBcIi9hcnRpY2xlL2FuZHJvaWQvXCIsXHJcbiAgICAgICAgXCIvYXJ0aWNsZS9tcC9cIixcclxuICAgIF1cclxufSxcclxue1xyXG4gICAgdGV4dDogXCJcdTU5MjdcdTY1NzBcdTYzNkVcIixcclxuICAgIGxpbms6IFwiL2FydGljbGUvZGF0YS9cIlxyXG59LFxyXG57XHJcbiAgICB0ZXh0OiBcIlx1NjU3MFx1NUI2Nlx1NUVGQVx1NkEyMVwiLFxyXG4gICAgbGluazogXCIvYXJ0aWNsZS9tb2RlbGluZy9cIlxyXG59LFxyXG57XHJcbiAgICB0ZXh0OiBcIlx1NTE3Nlx1NEVENlx1NjU4N1x1N0FFMFwiLFxyXG4gICAgbGluazogXCIvYXJ0aWNsZS9vdGhlci9cIlxyXG59LFxyXG57XHJcbiAgICB0ZXh0OiBcIlx1NTE3M1x1NEU4RVwiLFxyXG4gICAgbGluazogXCIvYWJvdXQvXCJcclxufSxcclxuXTtcclxuXHJcbmV4cG9ydCBjb25zdCBzaWRlYmFyID0ge1xyXG4gICAgXCIvZ3VpZGUvXCI6IFwic3RydWN0dXJlXCIsXHJcbiAgICBcIi9hcnRpY2xlL2phdmEvXCI6IFwic3RydWN0dXJlXCIsXHJcbiAgICBcIi9hcnRpY2xlL2FuZHJvaWQvXCI6IFwic3RydWN0dXJlXCIsXHJcbiAgICBcIi9hcnRpY2xlL2MvXCI6IFwic3RydWN0dXJlXCIsXHJcbiAgICBcIi9hcnRpY2xlL2dvL1wiOiBcInN0cnVjdHVyZVwiLFxyXG4gICAgXCIvYXJ0aWNsZS9qcy9cIjogXCJzdHJ1Y3R1cmVcIixcclxuICAgIFwiL2FydGljbGUvazhzL1wiOiBcInN0cnVjdHVyZVwiLFxyXG4gICAgXCIvYXJ0aWNsZS9rYWZha2EvXCI6IFwic3RydWN0dXJlXCIsXHJcbiAgICBcIi9hcnRpY2xlL3B5dGhvbi9cIjogXCJzdHJ1Y3R1cmVcIixcclxuICAgIFwiL2FydGljbGUvYWxnb3JpdGhtL1wiOiBcInN0cnVjdHVyZVwiLFxyXG4gICAgXCIvYXJ0aWNsZS9kYXRhL1wiOiBcInN0cnVjdHVyZVwiLFxyXG4gICAgXCIvYXJ0aWNsZS90b21jYXQvXCI6IFwic3RydWN0dXJlXCIsXHJcbiAgICBcIi9hcnRpY2xlL3NwcmluZ3MvXCI6IFwic3RydWN0dXJlXCIsXHJcbiAgICBcIi9hcnRpY2xlL3Z1ZS9cIjogXCJzdHJ1Y3R1cmVcIixcclxuICAgIFwiL2FydGljbGUvZGVzaWduL1wiOiBcInN0cnVjdHVyZVwiLFxyXG4gICAgXCIvYXJ0aWNsZS9teWJhdGlzL1wiOiBcInN0cnVjdHVyZVwiLFxyXG4gICAgXCIvYXJ0aWNsZS9teXNxbC9cIjogXCJzdHJ1Y3R1cmVcIixcclxuICAgIFwiL2FydGljbGUvcmVkaXMvXCI6IFwic3RydWN0dXJlXCIsXHJcbiAgICBcIi9hcnRpY2xlL3JhYmJpdG1xL1wiOiBcInN0cnVjdHVyZVwiLFxyXG4gICAgXCIvYXJ0aWNsZS9lbGFzdGljc2VhcmNoL1wiOiBcInN0cnVjdHVyZVwiLFxyXG4gICAgXCIvYXJ0aWNsZS9mcmFtZXdvcmsvXCI6IFwic3RydWN0dXJlXCIsXHJcbiAgICBcIi9hcnRpY2xlL2dpdC9cIjogXCJzdHJ1Y3R1cmVcIixcclxuICAgIFwiL2FydGljbGUvZG9ja2VyL1wiOiBcInN0cnVjdHVyZVwiLFxyXG4gICAgXCIvYXJ0aWNsZS9qZW5raW5zL1wiOiBcInN0cnVjdHVyZVwiLFxyXG4gICAgXCIvYXJ0aWNsZS9saW51eC9cIjogXCJzdHJ1Y3R1cmVcIixcclxuICAgIFwiL2FydGljbGUvbHVhL1wiOiBcInN0cnVjdHVyZVwiLFxyXG4gICAgXCIvYXJ0aWNsZS9tb25nb2RiL1wiOiBcInN0cnVjdHVyZVwiLFxyXG4gICAgXCIvYXJ0aWNsZS9tcC9cIjogXCJzdHJ1Y3R1cmVcIixcclxuICAgIFwiL2FydGljbGUvbmV0dHkvXCI6IFwic3RydWN0dXJlXCIsXHJcbiAgICBcIi9hcnRpY2xlL3F1YXJ0ei9cIjogXCJzdHJ1Y3R1cmVcIixcclxuICAgIFwiL2FydGljbGUvbW9kZWxpbmcvXCI6IFwic3RydWN0dXJlXCIsXHJcbiAgICBcIi9hcnRpY2xlL290aGVyL1wiOiBcInN0cnVjdHVyZVwiLFxyXG4gICAgXCIvYWJvdXQvXCI6IFwic3RydWN0dXJlXCIsXHJcbiAgICBcIi9cIjogW1xyXG4gICAgICAgIFwiXCIgLyogLyAqLyxcclxuICAgICAgICAvLyBcImNvbnRhY3RcIiAvKiAvY29udGFjdC5odG1sICovLFxyXG4gICAgICAgIC8vIFwiYWJvdXRcIiAvKiAvYWJvdXQuaHRtbCAqLyxcclxuICAgIF0sXHJcbn07IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOi9NeURpc2svQS1Db2RlL1Z1ZS9JbmRpdmlkdWFsL2dvbnRveS1ibG9nL2RvY3MvLnZ1ZXByZXNzL2NvbmZpZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcTXlEaXNrXFxcXEEtQ29kZVxcXFxWdWVcXFxcSW5kaXZpZHVhbFxcXFxnb250b3ktYmxvZ1xcXFxkb2NzXFxcXC52dWVwcmVzc1xcXFxjb25maWdcXFxcbWFya2Rvd24uanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L015RGlzay9BLUNvZGUvVnVlL0luZGl2aWR1YWwvZ29udG95LWJsb2cvZG9jcy8udnVlcHJlc3MvY29uZmlnL21hcmtkb3duLmpzXCI7aW1wb3J0IHtcclxuICAgIGFuY2hvclBsdWdpblxyXG59IGZyb20gJ0B2dWVwcmVzcy9tYXJrZG93bidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGFuY2hvcjoge1xyXG4gICAgICAgIGxldmVsOiBbMSwgMiwgM10sXHJcbiAgICAgICAgcGVybWFsaW5rOiBhbmNob3JQbHVnaW4ucGVybWFsaW5rLmFyaWFIaWRkZW4oe1xyXG4gICAgICAgICAgICBjbGFzczogJ2hlYWRlci1hbmNob3InLFxyXG4gICAgICAgICAgICBzeW1ib2w6ICcjJyxcclxuICAgICAgICAgICAgc3BhY2U6IHRydWUsXHJcbiAgICAgICAgICAgIHBsYWNlbWVudDogJ2JlZm9yZScsXHJcbiAgICAgICAgfSksXHJcbiAgICB9LFxyXG4gICAgdG9jOiB7XHJcbiAgICAgICAgbGV2ZWw6IFsxLCAyLCAzXVxyXG4gICAgfSxcclxuICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBsZXZlbDogWzEsIDIsIDNdXHJcbiAgICB9XHJcbn0iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6L015RGlzay9BLUNvZGUvVnVlL0luZGl2aWR1YWwvZ29udG95LWJsb2cvZG9jcy8udnVlcHJlc3MvY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxNeURpc2tcXFxcQS1Db2RlXFxcXFZ1ZVxcXFxJbmRpdmlkdWFsXFxcXGdvbnRveS1ibG9nXFxcXGRvY3NcXFxcLnZ1ZXByZXNzXFxcXGNvbmZpZ1xcXFxwbHVnaW5zLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9NeURpc2svQS1Db2RlL1Z1ZS9JbmRpdmlkdWFsL2dvbnRveS1ibG9nL2RvY3MvLnZ1ZXByZXNzL2NvbmZpZy9wbHVnaW5zLmpzXCI7Ly8gaW1wb3J0IHsgc2VvUGx1Z2luIH0gZnJvbSBcInZ1ZXByZXNzLXBsdWdpbi1zZW8yXCI7XHJcbi8vIGltcG9ydCB7IHJlYWRpbmdUaW1lUGx1Z2luIH0gZnJvbSBcInZ1ZXByZXNzLXBsdWdpbi1yZWFkaW5nLXRpbWUyXCI7XHJcbi8vIGltcG9ydCB7IGF1dG9DYXRhbG9nUGx1Z2luIH0gZnJvbSBcInZ1ZXByZXNzLXBsdWdpbi1hdXRvLWNhdGFsb2dcIjtcclxuaW1wb3J0IHtcclxuICAgIHNlYXJjaFByb1BsdWdpblxyXG59IGZyb20gXCJ2dWVwcmVzcy1wbHVnaW4tc2VhcmNoLXByb1wiO1xyXG5pbXBvcnQge1xyXG4gICAgY29tbWVudFBsdWdpblxyXG59IGZyb20gXCJ2dWVwcmVzcy1wbHVnaW4tY29tbWVudDJcIjtcclxuaW1wb3J0IHtcclxuICAgIHJlZ2lzdGVyQ29tcG9uZW50c1BsdWdpblxyXG59IGZyb20gJ0B2dWVwcmVzcy9wbHVnaW4tcmVnaXN0ZXItY29tcG9uZW50cydcclxuaW1wb3J0IHtcclxuICAgIGNvbnRhaW5lclBsdWdpblxyXG59IGZyb20gJ0B2dWVwcmVzcy9wbHVnaW4tY29udGFpbmVyJ1xyXG5pbXBvcnQge1xyXG4gICAgZmVlZFBsdWdpblxyXG59IGZyb20gXCJ2dWVwcmVzcy1wbHVnaW4tZmVlZDJcIjtcclxuaW1wb3J0IHtcclxuICAgIHB3YVBsdWdpblxyXG59IGZyb20gXCJ2dWVwcmVzcy1wbHVnaW4tcHdhMlwiO1xyXG5pbXBvcnQge1xyXG4gICAgbWRFbmhhbmNlUGx1Z2luXHJcbn0gZnJvbSBcInZ1ZXByZXNzLXBsdWdpbi1tZC1lbmhhbmNlXCI7XHJcbmltcG9ydCB7XHJcbiAgICBjb21wb25lbnRzUGx1Z2luXHJcbn0gZnJvbSBcInZ1ZXByZXNzLXBsdWdpbi1jb21wb25lbnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgICBnZXREaXJuYW1lLFxyXG4gICAgcGF0aFxyXG59IGZyb20gXCJAdnVlcHJlc3MvdXRpbHNcIjtcclxuaW1wb3J0IHsgdG9jUGx1Z2luIH0gZnJvbSAnQHZ1ZXByZXNzL3BsdWdpbi10b2MnO1xyXG5pbXBvcnQgeyBuYXZQbHVnaW4gfSBmcm9tICcuLi92dWVwcmVzcy1wbHVnaW4tY29kZS9pbmRleCc7XHJcblxyXG5jb25zdCBfX2Rpcm5hbWUgPSBnZXREaXJuYW1lKFxyXG4gICAgaW1wb3J0Lm1ldGEudXJsKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgW1xyXG4gICAgbmF2UGx1Z2luKCksXHJcbiAgICB0b2NQbHVnaW4oe1xyXG4gICAgICAgIC8vIFx1OTE0RFx1N0Y2RVx1OTg3OVxyXG4gICAgICAgIGNvbXBvbmVudE5hbWU6ICdUb2MnLFxyXG4gICAgICAgIGRlZmF1bHRPcHRpb25zOiB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lclRhZzogJ25hdicsXHJcbiAgICAgICAgICAgIGNvbnRhaW5lckNsYXNzOiAndnVlcHJlc3MtdG9jJyxcclxuICAgICAgICAgICAgbGlzdENsYXNzOiAndnVlcHJlc3MtdG9jLWxpc3QnLFxyXG4gICAgICAgICAgICBpdGVtQ2xhc3M6ICd2dWVwcmVzcy10b2MtaXRlbScsXHJcbiAgICAgICAgICAgIGxpbmtUYWc6ICdSb3V0ZXJMaW5rJyxcclxuICAgICAgICAgICAgbGlua0NsYXNzOiAndnVlcHJlc3MtdG9jLWxpbmsnLFxyXG4gICAgICAgICAgICBsaW5rQWN0aXZlQ2xhc3M6ICdhY3RpdmUnLFxyXG4gICAgICAgICAgICBsaW5rQ2hpbGRyZW5BY3RpdmVDbGFzczogJ2FjdGl2ZScsXHJcbiAgICAgICAgfVxyXG4gICAgfSksXHJcbiAgICBtZEVuaGFuY2VQbHVnaW4oe1xyXG4gICAgICAgIHN0eWxpemU6IFt7XHJcbiAgICAgICAgICAgIG1hdGNoZXI6IC9eXHU0RTBELyxcclxuICAgICAgICAgICAgcmVwbGFjZXI6ICh7XHJcbiAgICAgICAgICAgICAgICB0YWcsXHJcbiAgICAgICAgICAgICAgICBhdHRycyxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRcclxuICAgICAgICAgICAgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRhZyA9PT0gXCJlbVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogXCJzcGFuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5hdHRycyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiBcImVtXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCxcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXSxcclxuICAgICAgICBtZXJtYWlkOiB0cnVlLFxyXG4gICAgICAgIHByZXNlbnRhdGlvbjogdHJ1ZSxcclxuICAgICAgICB0YWJzOiB0cnVlLFxyXG4gICAgICAgIGNoYXJ0OiB0cnVlLFxyXG4gICAgICAgIHZ1ZVBsYXlncm91bmQ6IHRydWUsXHJcbiAgICAgICAgY29kZXRhYnM6IHRydWUsXHJcbiAgICAgICAgdGFza2xpc3Q6IHRydWUsXHJcbiAgICAgICAgaW1nTGF6eWxvYWQ6IHRydWUsXHJcbiAgICAgICAgZmlndXJlOiB0cnVlLFxyXG4gICAgICAgIGluY2x1ZGU6IHRydWUsXHJcbiAgICAgICAgYXR0cnM6IHRydWUsXHJcbiAgICAgICAgbWFyazogdHJ1ZSxcclxuICAgICAgICBjb250YWluZXI6IHRydWUsXHJcbiAgICAgICAgYWxpZ246IHRydWUsXHJcbiAgICAgICAgLy8gXHU1NDJGXHU3NTI4XHU0RTBCXHU4OUQyXHU2ODA3XHU1MjlGXHU4MEZEXHJcbiAgICAgICAgc3ViOiB0cnVlLFxyXG4gICAgICAgIC8vIFx1NTQyRlx1NzUyOFx1NEUwQVx1ODlEMlx1NjgwN1xyXG4gICAgICAgIHN1cDogdHJ1ZSxcclxuICAgICAgICAvLyBcdTU0MkZcdTc1MjhcdTgxMUFcdTZDRThcclxuICAgICAgICBmb290bm90ZTogdHJ1ZSxcclxuICAgIH0pLFxyXG4gICAgY29tcG9uZW50c1BsdWdpbih7XHJcbiAgICAgICAgLy8gXHU2M0QyXHU0RUY2XHU5MDA5XHU5ODc5XHJcbiAgICAgICAgY29tcG9uZW50czogW1wiUERGXCIsIFwiQmFkZ2VcIl1cclxuICAgIH0pLFxyXG4gICAgY29udGFpbmVyUGx1Z2luKHtcclxuICAgICAgICB0eXBlOiAnaGlkZScsXHJcbiAgICAgICAgbG9jYWxlczoge1xyXG4gICAgICAgICAgICAnLyc6IHtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRJbmZvOiAnSElERScsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICcvemgvJzoge1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdEluZm86ICdcdTk2OTBcdTg1Q0YnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmVmb3JlOiAoaW5mbykgPT5cclxuICAgICAgICAgICAgYDxkaXYgY2xhc3M9XCJoaWRlLWNvbnRhaW5lclwiPiR7aW5mbyA/IGA8cCBjbGFzcz1cImhpZGUtY29udGFpbmVyLXRpdGxlXCI+JHtpbmZvfTwvcD5gIDogJyd9XFxuYCxcclxuICAgICAgICBhZnRlcjogKCkgPT4gJzwvZGl2PlxcbidcclxuICAgIH0pLFxyXG4gICAgcmVnaXN0ZXJDb21wb25lbnRzUGx1Z2luKHtcclxuICAgICAgICBjb21wb25lbnRzRGlyOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vY29tcG9uZW50cy9jdXN0b20nKSxcclxuICAgIH0pLFxyXG4gICAgc2VhcmNoUHJvUGx1Z2luKHtcclxuICAgICAgICAvLyBcdTdEMjJcdTVGMTVcdTUxNjhcdTkwRThcdTUxODVcdTVCQjlcclxuICAgICAgICBpbmRleENvbnRlbnQ6IHRydWUsXHJcbiAgICAgICAgLy8gXHU0RTNBXHU1MjA2XHU3QzdCXHU1NDhDXHU2ODA3XHU3QjdFXHU2REZCXHU1MkEwXHU3RDIyXHU1RjE1XHJcbiAgICAgICAgY3VzdG9tRmllbGRzOiBbe1xyXG4gICAgICAgICAgICBnZXR0ZXI6IChwYWdlKSA9PiBwYWdlLmZyb250bWF0dGVyLmNhdGVnb3J5ICsgXCJcIixcclxuICAgICAgICAgICAgZm9ybWF0dGVyOiBcIlx1NTIwNlx1N0M3Qlx1RkYxQSRjb250ZW50XCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldHRlcjogKHBhZ2UpID0+IHBhZ2UuZnJvbnRtYXR0ZXIudGFnICsgXCJcIixcclxuICAgICAgICAgICAgZm9ybWF0dGVyOiBcIlx1NjgwN1x1N0I3RVx1RkYxQSRjb250ZW50XCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIGxvY2FsZXM6IHtcclxuICAgICAgICAgICAgXCIvemgvXCI6IHtcclxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIlx1NjQxQ1x1N0QyMlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICB9KSxcclxuICAgIGNvbW1lbnRQbHVnaW4oe1xyXG4gICAgICAgIHByb3ZpZGVyOiBcIkdpc2N1c1wiLFxyXG4gICAgICAgIGNvbW1lbnQ6IHRydWUsXHJcbiAgICAgICAgcmVwbzogXCJnendycnIvZ2lzY3VzXCIsXHJcbiAgICAgICAgcmVwb0lkOiBcIlJfa2dET0k0MHl1QVwiLFxyXG4gICAgICAgIGNhdGVnb3J5OiBcIkdlbmVyYWxcIixcclxuICAgICAgICBjYXRlZ29yeUlkOiBcIkRJQ19rd0RPSTQweXVNNENUODZMXCIsXHJcbiAgICAgICAgbWFwcGluZzogXCJ0aXRsZVwiLFxyXG4gICAgICAgIHN0cmljdDogZmFsc2VcclxuICAgIH0pLFxyXG4gICAgLy8gYXV0b0NhdGFsb2dQbHVnaW4oKSxcclxuICAgIGZlZWRQbHVnaW4oe1xyXG4gICAgICAgIGhvc3RuYW1lOiBcImh0dHBzOi8vZ3p3cnJyLmdpdGh1Yi5pb1wiLFxyXG4gICAgICAgIGF0b206IHRydWUsXHJcbiAgICAgICAgcnNzOiB0cnVlLFxyXG4gICAgICAgIGpzb246IHRydWUsXHJcbiAgICAgICAgaWNvbjogXCJodHRwczovL215LXBob3Rvcy0xLm9zcy1jbi1oYW5nemhvdS5hbGl5dW5jcy5jb20vSW5kaXZpZHVhbC9sb2dvLnBuZ1wiLFxyXG4gICAgICAgIC8vIHJzc091dHB1dEZpbGVuYW1lOiBcInJzcy54bWxcIlxyXG4gICAgfSksXHJcbiAgICBwd2FQbHVnaW4oe1xyXG4gICAgICAgIHNob3dJbnN0YWxsOiB0cnVlLFxyXG4gICAgICAgIG1hbmlmZXN0OiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiR3p3J3MgQmxvZ1wiLFxyXG4gICAgICAgICAgICBzaG9ydF9uYW1lOiBcIkd6dydzIEJsb2dcIixcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiR3p3J3MgQmxvZ1wiLFxyXG4gICAgICAgICAgICB0aGVtZV9jb2xvcjogXCIjNDc0NzQ4XCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmYXZpY29uOiBcImh0dHBzOi8vbXktcGhvdG9zLTEub3NzLWNuLWhhbmd6aG91LmFsaXl1bmNzLmNvbS9JbmRpdmlkdWFsL2xvZ28ucG5nXCIsXHJcbiAgICAgICAgLy8gXHU2NzAwXHU1OTI3XHU3RjEzXHU1QjU4XHVGRjFBNU1cclxuICAgICAgICBtYXhTaXplOiA0MDk2LFxyXG4gICAgICAgIGNhY2hlSFRNTDogZmFsc2UsXHJcbiAgICAgICAgY2FjaGVQaWM6IGZhbHNlLFxyXG4gICAgICAgIG1heFBpY1NpemU6IDEwMjQsXHJcbiAgICAgICAgdXBkYXRlOiBcImF2YWlsYWJsZVwiLFxyXG4gICAgICAgIHRoZW1lQ29sb3I6IFwiIzQ3NDc0OFwiXHJcbiAgICB9KSxcclxuICAgIC8vIGF1dG9DYXRhbG9nUGx1Z2luKHtcclxuICAgIC8vICAgICAvL1x1NjNEMlx1NEVGNlx1OTAwOVx1OTg3OVxyXG4gICAgLy8gICAgIGluZGV4OiB0cnVlXHJcbiAgICAvLyB9KSxcclxuICAgIC8vIHJlYWRpbmdUaW1lUGx1Z2luKHtcclxuICAgIC8vICAgICAvLyBcdTRGNjBcdTc2ODRcdTkwMDlcdTk4NzlcclxuICAgIC8vIH0pLFxyXG4gICAgLy8gc2VvUGx1Z2luKHtcclxuICAgIC8vICAgICAvLyBcdTRGNjBcdTc2ODRcdTkwMDlcdTk4NzlcclxuICAgIC8vICAgICBob3N0bmFtZTogXCJnendycnIuZ2l0aHViLmlvXCIsXHJcbiAgICAvLyAgICAgYXV0aG9yOiB7XHJcbiAgICAvLyAgICAgICAgIG5hbWU6IFwiR3p3XCIsXHJcbiAgICAvLyAgICAgICAgIHVybDogXCJodHRwczovL2d6d3Jyci5naXRodWIuaW9cIixcclxuICAgIC8vICAgICAgICAgZW1haWw6IFwiMTYyNzEyMTE5M0BxcS5jb21cIlxyXG4gICAgLy8gICAgIH0sXHJcbiAgICAvLyAgICAgYXV0b0Rlc2NyaXB0aW9uOiB0cnVlXHJcbiAgICAvLyB9KSxcclxuXSIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzovTXlEaXNrL0EtQ29kZS9WdWUvSW5kaXZpZHVhbC9nb250b3ktYmxvZy9kb2NzLy52dWVwcmVzcy92dWVwcmVzcy1wbHVnaW4tY29kZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcTXlEaXNrXFxcXEEtQ29kZVxcXFxWdWVcXFxcSW5kaXZpZHVhbFxcXFxnb250b3ktYmxvZ1xcXFxkb2NzXFxcXC52dWVwcmVzc1xcXFx2dWVwcmVzcy1wbHVnaW4tY29kZVxcXFxpbmRleC5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovTXlEaXNrL0EtQ29kZS9WdWUvSW5kaXZpZHVhbC9nb250b3ktYmxvZy9kb2NzLy52dWVwcmVzcy92dWVwcmVzcy1wbHVnaW4tY29kZS9pbmRleC5qc1wiO2ltcG9ydCB7IGNyZWF0ZUJ1aWxkQXBwIH0gZnJvbSAnQHZ1ZXByZXNzL2NvcmUnO1xyXG5cclxuZXhwb3J0IGNvbnN0IG5hdlBsdWdpbiA9IGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IGNyZWF0ZUJ1aWxkQXBwKHtcclxuICAgICAgICBuYW1lOiAnQG9yZy92dWVwcmVzcy1wbHVnaW4tZ29udG95JyxcclxuICAgICAgICBtdWx0aXBsZTogZmFsc2VcclxuICAgIH0pXHJcblxyXG4gICAgLy8gXHU1MjFEXHU1OUNCXHU1MzE2XHU1NDhDXHU1MUM2XHU1OTA3XHJcbiAgICBhd2FpdCBhcHAuaW5pdCgpXHJcbiAgICBhd2FpdCBhcHAucHJlcGFyZSgpXHJcblxyXG4gICAgLy8gXHU2Nzg0XHU1RUZBXHJcbiAgICBhd2FpdCBhcHAuYnVpbGQoKVxyXG5cclxuICAgIC8vIFx1NTkwNFx1NzQwNiBvbkdlbmVyYXRlZCBob29rXHJcbiAgICBhd2FpdCBhcHAucGx1Z2luQXBpLmhvb2tzLm9uR2VuZXJhdGVkLnByb2Nlc3MoYXBwKVxyXG5cclxuICAgIGNvbnNvbGUubG9nKCc9PT09PT09PT09PT09PT09PT09PT09PT09PT1zdWNjZXNzPT09PT09PT09PT09PT09PT09PT09PT09PT09JylcclxuICAgIGNvbnNvbGUubG9nKGFwcClcclxufSIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzovTXlEaXNrL0EtQ29kZS9WdWUvSW5kaXZpZHVhbC9nb250b3ktYmxvZy9kb2NzLy52dWVwcmVzcy9jb25maWdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXE15RGlza1xcXFxBLUNvZGVcXFxcVnVlXFxcXEluZGl2aWR1YWxcXFxcZ29udG95LWJsb2dcXFxcZG9jc1xcXFwudnVlcHJlc3NcXFxcY29uZmlnXFxcXGJ1bmRsZXIuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L015RGlzay9BLUNvZGUvVnVlL0luZGl2aWR1YWwvZ29udG95LWJsb2cvZG9jcy8udnVlcHJlc3MvY29uZmlnL2J1bmRsZXIuanNcIjtpbXBvcnQge1xyXG4gICAgdml0ZUJ1bmRsZXJcclxufSBmcm9tICdAdnVlcHJlc3MvYnVuZGxlci12aXRlJ1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHZpdGVCdW5kbGVyKHtcclxuICAgIHZpdGVPcHRpb25zOiB7XHJcbiAgICAgICAgYnVpbGQ6IHtcclxuICAgICAgICAgICAgZW1wdHlPdXREaXI6IGZhbHNlLFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB2dWVQbHVnaW5PcHRpb25zOiB7fSxcclxufSkiLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6L015RGlzay9BLUNvZGUvVnVlL0luZGl2aWR1YWwvZ29udG95LWJsb2cvZG9jcy8udnVlcHJlc3MvcGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcTXlEaXNrXFxcXEEtQ29kZVxcXFxWdWVcXFxcSW5kaXZpZHVhbFxcXFxnb250b3ktYmxvZ1xcXFxkb2NzXFxcXC52dWVwcmVzc1xcXFxwbHVnaW5zXFxcXHRhYmxlUGx1Z2luLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9NeURpc2svQS1Db2RlL1Z1ZS9JbmRpdmlkdWFsL2dvbnRveS1ibG9nL2RvY3MvLnZ1ZXByZXNzL3BsdWdpbnMvdGFibGVQbHVnaW4uanNcIjtpbXBvcnQgTWFya2Rvd25JdCBmcm9tICdtYXJrZG93bi1pdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3cmFwVGFibGUobWQpIHtcclxuICAgIGNvbnN0IGRlZmF1bHRSZW5kZXIgPSBtZC5yZW5kZXJlci5ydWxlcy50YWJsZV9vcGVuIHx8IGZ1bmN0aW9uICh0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzZWxmKSB7XHJcbiAgICAgICAgcmV0dXJuIHNlbGYucmVuZGVyVG9rZW4odG9rZW5zLCBpZHgsIG9wdGlvbnMpO1xyXG4gICAgfTtcclxuXHJcbiAgICBtZC5yZW5kZXJlci5ydWxlcy50YWJsZV9vcGVuID0gZnVuY3Rpb24gKHRva2VucywgaWR4LCBvcHRpb25zLCBlbnYsIHNlbGYpIHtcclxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJ0YWJsZS13cmFwcGVyIFwiPiR7ZGVmYXVsdFJlbmRlcih0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzZWxmKX1gO1xyXG4gICAgfTtcclxuXHJcbiAgICBtZC5yZW5kZXJlci5ydWxlcy50YWJsZV9jbG9zZSA9IGZ1bmN0aW9uICh0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzZWxmKSB7XHJcbiAgICAgICAgcmV0dXJuIGAke2RlZmF1bHRSZW5kZXIodG9rZW5zLCBpZHgsIG9wdGlvbnMsIGVudiwgc2VsZil9PC9kaXY+YDtcclxuICAgIH07XHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFHQSxTQUFTLHdCQUF3Qjs7O0FDSGtWO0FBQUEsRUFDL1c7QUFBQSxFQUNBO0FBQUEsT0FDRztBQUhzTyxJQUFNLDJDQUEyQztBQUk5UixJQUFNLFlBQVk7QUFBQSxFQUNkO0FBQWU7QUFFbkIsSUFBTyxnQkFBUTtBQUFBLEVBQ1gsZ0RBQWdELEtBQUs7QUFBQSxJQUNqRDtBQUFBLElBQ0E7QUFBQSxFQUNKO0FBQUEsRUFDQSxxQ0FBcUMsS0FBSztBQUFBLElBQ3RDO0FBQUEsSUFDQTtBQUFBLEVBQ0o7QUFDSjs7O0FDaEJtWDtBQUFBLEVBQy9XO0FBQUEsT0FDRzs7O0FDRnFYLElBQU0sU0FBUztBQUFBLEVBQUM7QUFBQSxJQUN4WSxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUE7QUFBQSxJQUVOLGFBQWE7QUFBQSxFQUNqQjtBQUFBLEVBQ0E7QUFBQSxJQUNJLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQTtBQUFBLElBRU4sYUFBYTtBQUFBLEVBQ2pCO0FBQUEsRUFDQTtBQUFBLElBQ0ksTUFBTTtBQUFBLElBQ04sVUFBVTtBQUFBLE1BQ047QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQUEsRUFDQTtBQUFBLElBQ0ksTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1Y7QUFBQSxFQUNBO0FBQUEsSUFDSSxNQUFNO0FBQUEsSUFDTixVQUFVO0FBQUEsTUFDTjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFBQSxFQUNBO0FBQUEsSUFDSSxNQUFNO0FBQUEsSUFDTixVQUFVO0FBQUEsTUFDTjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUFBLEVBQ0E7QUFBQSxJQUNJLE1BQU07QUFBQSxJQUNOLFVBQVU7QUFBQSxNQUNOO0FBQUEsTUFDQTtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQUEsRUFDQTtBQUFBLElBQ0ksTUFBTTtBQUFBLElBQ04sVUFBVTtBQUFBLE1BQ047QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUFBLEVBQ0E7QUFBQSxJQUNJLE1BQU07QUFBQSxJQUNOLFVBQVU7QUFBQSxNQUNOO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQUEsRUFDQTtBQUFBLElBQ0ksTUFBTTtBQUFBLElBQ04sVUFBVTtBQUFBLE1BQ047QUFBQSxNQUNBO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFBQSxFQUNBO0FBQUEsSUFDSSxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDVjtBQUFBLEVBQ0E7QUFBQSxJQUNJLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNWO0FBQUEsRUFDQTtBQUFBLElBQ0ksTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1Y7QUFBQSxFQUNBO0FBQUEsSUFDSSxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDVjtBQUNBO0FBRU8sSUFBTSxVQUFVO0FBQUEsRUFDbkIsV0FBVztBQUFBLEVBQ1gsa0JBQWtCO0FBQUEsRUFDbEIscUJBQXFCO0FBQUEsRUFDckIsZUFBZTtBQUFBLEVBQ2YsZ0JBQWdCO0FBQUEsRUFDaEIsZ0JBQWdCO0FBQUEsRUFDaEIsaUJBQWlCO0FBQUEsRUFDakIsb0JBQW9CO0FBQUEsRUFDcEIsb0JBQW9CO0FBQUEsRUFDcEIsdUJBQXVCO0FBQUEsRUFDdkIsa0JBQWtCO0FBQUEsRUFDbEIsb0JBQW9CO0FBQUEsRUFDcEIscUJBQXFCO0FBQUEsRUFDckIsaUJBQWlCO0FBQUEsRUFDakIsb0JBQW9CO0FBQUEsRUFDcEIscUJBQXFCO0FBQUEsRUFDckIsbUJBQW1CO0FBQUEsRUFDbkIsbUJBQW1CO0FBQUEsRUFDbkIsc0JBQXNCO0FBQUEsRUFDdEIsMkJBQTJCO0FBQUEsRUFDM0IsdUJBQXVCO0FBQUEsRUFDdkIsaUJBQWlCO0FBQUEsRUFDakIsb0JBQW9CO0FBQUEsRUFDcEIscUJBQXFCO0FBQUEsRUFDckIsbUJBQW1CO0FBQUEsRUFDbkIsaUJBQWlCO0FBQUEsRUFDakIscUJBQXFCO0FBQUEsRUFDckIsZ0JBQWdCO0FBQUEsRUFDaEIsbUJBQW1CO0FBQUEsRUFDbkIsb0JBQW9CO0FBQUEsRUFDcEIsc0JBQXNCO0FBQUEsRUFDdEIsbUJBQW1CO0FBQUEsRUFDbkIsV0FBVztBQUFBLEVBQ1gsS0FBSztBQUFBLElBQ0Q7QUFBQTtBQUFBO0FBQUEsRUFHSjtBQUNKOzs7QUQ5SEEsSUFBTyxnQkFBUSxVQUFVO0FBQUE7QUFBQSxFQUVyQixRQUFRO0FBQUEsRUFDUixTQUFTO0FBQUEsRUFDVCxVQUFVO0FBQUEsRUFDVixZQUFZO0FBQUEsRUFDWixZQUFZO0FBQUEsRUFDWjtBQUFBLEVBQ0E7QUFBQSxFQUNBLFlBQVk7QUFBQSxJQUNSLFFBQVE7QUFBQSxJQUNSLE9BQU87QUFBQSxJQUNQLFFBQVE7QUFBQSxFQUNaO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxNQUFNO0FBQUEsTUFDRixTQUFTO0FBQUEsTUFDVCxlQUFlO0FBQUEsTUFDZixRQUFRLENBQUMsU0FBUyxRQUFRLEtBQUssZ0JBQWdCLEtBQUssQ0FBQyxLQUFLLFlBQVksUUFBUSxDQUFDLEtBQUssWUFBWTtBQUFBLElBQ3BHO0FBQUEsSUFDQSxhQUFhO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFnQmIsWUFBWTtBQUFBLElBQ1osV0FBVztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLElBQ1o7QUFBQSxFQUNKO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDRixNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsSUFDUixhQUFhO0FBQUEsSUFDYixhQUFhO0FBQUEsSUFDYixRQUFRO0FBQUE7QUFBQSxNQUVKLFFBQVE7QUFBQSxNQUNSLElBQUk7QUFBQSxNQUNKLE9BQU87QUFBQSxNQUNQLFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQU9aO0FBQUEsRUFDSjtBQUVKLENBQUM7OztBRXhFd1g7QUFBQSxFQUNyWDtBQUFBLE9BQ0c7QUFFUCxJQUFPLG1CQUFRO0FBQUEsRUFDWCxRQUFRO0FBQUEsSUFDSixPQUFPLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxJQUNmLFdBQVcsYUFBYSxVQUFVLFdBQVc7QUFBQSxNQUN6QyxPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixPQUFPO0FBQUEsTUFDUCxXQUFXO0FBQUEsSUFDZixDQUFDO0FBQUEsRUFDTDtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0QsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDbkI7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNMLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ25CO0FBQ0o7OztBQ2pCQTtBQUFBLEVBQ0k7QUFBQSxPQUNHO0FBQ1A7QUFBQSxFQUNJO0FBQUEsT0FDRztBQUNQO0FBQUEsRUFDSTtBQUFBLE9BQ0c7QUFDUDtBQUFBLEVBQ0k7QUFBQSxPQUNHO0FBQ1A7QUFBQSxFQUNJO0FBQUEsT0FDRztBQUNQO0FBQUEsRUFDSTtBQUFBLE9BQ0c7QUFDUDtBQUFBLEVBQ0k7QUFBQSxPQUNHO0FBQ1A7QUFBQSxFQUNJO0FBQUEsT0FDRztBQUNQO0FBQUEsRUFDSSxjQUFBQTtBQUFBLEVBQ0EsUUFBQUM7QUFBQSxPQUNHO0FBQ1AsU0FBUyxpQkFBaUI7OztBQy9CbVksU0FBUyxzQkFBc0I7QUFFcmIsSUFBTSxZQUFZLFlBQVk7QUFDakMsUUFBTSxNQUFNLGVBQWU7QUFBQSxJQUN2QixNQUFNO0FBQUEsSUFDTixVQUFVO0FBQUEsRUFDZCxDQUFDO0FBR0QsUUFBTSxJQUFJLEtBQUs7QUFDZixRQUFNLElBQUksUUFBUTtBQUdsQixRQUFNLElBQUksTUFBTTtBQUdoQixRQUFNLElBQUksVUFBVSxNQUFNLFlBQVksUUFBUSxHQUFHO0FBRWpELFVBQVEsSUFBSSwrREFBK0Q7QUFDM0UsVUFBUSxJQUFJLEdBQUc7QUFDbkI7OztBRHBCK08sSUFBTUMsNENBQTJDO0FBa0NoUyxJQUFNQyxhQUFZQztBQUFBLEVBQ2RGO0FBQWU7QUFFbkIsSUFBTyxrQkFBUTtBQUFBLEVBQ1gsVUFBVTtBQUFBLEVBQ1YsVUFBVTtBQUFBO0FBQUEsSUFFTixlQUFlO0FBQUEsSUFDZixnQkFBZ0I7QUFBQSxNQUNaLGNBQWM7QUFBQSxNQUNkLGdCQUFnQjtBQUFBLE1BQ2hCLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxNQUNYLFNBQVM7QUFBQSxNQUNULFdBQVc7QUFBQSxNQUNYLGlCQUFpQjtBQUFBLE1BQ2pCLHlCQUF5QjtBQUFBLElBQzdCO0FBQUEsRUFDSixDQUFDO0FBQUEsRUFDRCxnQkFBZ0I7QUFBQSxJQUNaLFNBQVMsQ0FBQztBQUFBLE1BQ04sU0FBUztBQUFBLE1BQ1QsVUFBVSxDQUFDO0FBQUEsUUFDUDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDSixNQUFNO0FBQ0YsWUFBSSxRQUFRO0FBQ1IsaUJBQU87QUFBQSxZQUNILEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxjQUNILEdBQUc7QUFBQSxjQUNILE9BQU87QUFBQSxZQUNYO0FBQUEsWUFDQTtBQUFBLFVBQ0o7QUFBQSxNQUNSO0FBQUEsSUFDSixDQUFFO0FBQUEsSUFDRixTQUFTO0FBQUEsSUFDVCxjQUFjO0FBQUEsSUFDZCxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsSUFDUCxlQUFlO0FBQUEsSUFDZixVQUFVO0FBQUEsSUFDVixVQUFVO0FBQUEsSUFDVixhQUFhO0FBQUEsSUFDYixRQUFRO0FBQUEsSUFDUixTQUFTO0FBQUEsSUFDVCxPQUFPO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixXQUFXO0FBQUEsSUFDWCxPQUFPO0FBQUE7QUFBQSxJQUVQLEtBQUs7QUFBQTtBQUFBLElBRUwsS0FBSztBQUFBO0FBQUEsSUFFTCxVQUFVO0FBQUEsRUFDZCxDQUFDO0FBQUEsRUFDRCxpQkFBaUI7QUFBQTtBQUFBLElBRWIsWUFBWSxDQUFDLE9BQU8sT0FBTztBQUFBLEVBQy9CLENBQUM7QUFBQSxFQUNELGdCQUFnQjtBQUFBLElBQ1osTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLE1BQ0wsS0FBSztBQUFBLFFBQ0QsYUFBYTtBQUFBLE1BQ2pCO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDSixhQUFhO0FBQUEsTUFDakI7QUFBQSxJQUNKO0FBQUEsSUFDQSxRQUFRLENBQUMsU0FDTCwrQkFBK0IsT0FBTyxtQ0FBbUMsYUFBYTtBQUFBO0FBQUEsSUFDMUYsT0FBTyxNQUFNO0FBQUEsRUFDakIsQ0FBQztBQUFBLEVBQ0QseUJBQXlCO0FBQUEsSUFDckIsZUFBZUcsTUFBSyxRQUFRRixZQUFXLHNCQUFzQjtBQUFBLEVBQ2pFLENBQUM7QUFBQSxFQUNELGdCQUFnQjtBQUFBO0FBQUEsSUFFWixjQUFjO0FBQUE7QUFBQSxJQUVkLGNBQWM7QUFBQSxNQUFDO0FBQUEsUUFDWCxRQUFRLENBQUMsU0FBUyxLQUFLLFlBQVksV0FBVztBQUFBLFFBQzlDLFdBQVc7QUFBQSxNQUNmO0FBQUEsTUFDQTtBQUFBLFFBQ0ksUUFBUSxDQUFDLFNBQVMsS0FBSyxZQUFZLE1BQU07QUFBQSxRQUN6QyxXQUFXO0FBQUEsTUFDZjtBQUFBLElBQ0E7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNMLFFBQVE7QUFBQSxRQUNKLGFBQWE7QUFBQSxNQUNqQjtBQUFBLElBQ0o7QUFBQSxFQUNKLENBQUM7QUFBQSxFQUNELGNBQWM7QUFBQSxJQUNWLFVBQVU7QUFBQSxJQUNWLFNBQVM7QUFBQSxJQUNULE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxJQUNSLFVBQVU7QUFBQSxJQUNWLFlBQVk7QUFBQSxJQUNaLFNBQVM7QUFBQSxJQUNULFFBQVE7QUFBQSxFQUNaLENBQUM7QUFBQTtBQUFBLEVBRUQsV0FBVztBQUFBLElBQ1AsVUFBVTtBQUFBLElBQ1YsTUFBTTtBQUFBLElBQ04sS0FBSztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBO0FBQUEsRUFFVixDQUFDO0FBQUEsRUFDRCxVQUFVO0FBQUEsSUFDTixhQUFhO0FBQUEsSUFDYixVQUFVO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixZQUFZO0FBQUEsTUFDWixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsSUFDakI7QUFBQSxJQUNBLFNBQVM7QUFBQTtBQUFBLElBRVQsU0FBUztBQUFBLElBQ1QsV0FBVztBQUFBLElBQ1gsVUFBVTtBQUFBLElBQ1YsWUFBWTtBQUFBLElBQ1osUUFBUTtBQUFBLElBQ1IsWUFBWTtBQUFBLEVBQ2hCLENBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBa0JMOzs7QUUxTHVYO0FBQUEsRUFDblg7QUFBQSxPQUNHO0FBR1AsSUFBTyxrQkFBUSxZQUFZO0FBQUEsRUFDdkIsYUFBYTtBQUFBLElBQ1QsT0FBTztBQUFBLE1BQ0gsYUFBYTtBQUFBLElBQ2pCO0FBQUEsRUFDSjtBQUFBLEVBQ0Esa0JBQWtCLENBQUM7QUFDdkIsQ0FBQzs7O0FDWmlZLE9BQU8sZ0JBQWdCO0FBRTFZLFNBQVIsVUFBMkIsSUFBSTtBQUNsQyxRQUFNLGdCQUFnQixHQUFHLFNBQVMsTUFBTSxjQUFjLFNBQVUsUUFBUSxLQUFLLFNBQVMsS0FBSyxNQUFNO0FBQzdGLFdBQU8sS0FBSyxZQUFZLFFBQVEsS0FBSyxPQUFPO0FBQUEsRUFDaEQ7QUFFQSxLQUFHLFNBQVMsTUFBTSxhQUFhLFNBQVUsUUFBUSxLQUFLLFNBQVMsS0FBSyxNQUFNO0FBQ3RFLFdBQU8sK0JBQStCLGNBQWMsUUFBUSxLQUFLLFNBQVMsS0FBSyxJQUFJO0FBQUEsRUFDdkY7QUFFQSxLQUFHLFNBQVMsTUFBTSxjQUFjLFNBQVUsUUFBUSxLQUFLLFNBQVMsS0FBSyxNQUFNO0FBQ3ZFLFdBQU8sR0FBRyxjQUFjLFFBQVEsS0FBSyxTQUFTLEtBQUssSUFBSTtBQUFBLEVBQzNEO0FBQ0o7OztBUkZBLElBQU8saUJBQVEsaUJBQWlCO0FBQUEsRUFDNUIsTUFBTTtBQUFBLEVBQ04sZ0JBQWdCO0FBQUEsRUFDaEIsU0FBUztBQUFBLEVBQ1QsT0FBTztBQUFBO0FBQUEsRUFFUCxTQUFTO0FBQUEsRUFDVCxVQUFVO0FBQUEsRUFDVixPQUFPO0FBQUEsRUFDUCxlQUFlLENBQUMsUUFBUTtBQUFBLEVBQ3hCO0FBQUEsRUFDQSxpQkFBaUIsQ0FBQyxJQUFJLFFBQVE7QUFDMUIsT0FBRyxJQUFJLFNBQVM7QUFBQSxFQUNwQjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbImdldERpcm5hbWUiLCAicGF0aCIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsIiwgIl9fZGlybmFtZSIsICJnZXREaXJuYW1lIiwgInBhdGgiXQp9Cg==
