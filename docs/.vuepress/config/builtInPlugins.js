export const builtInPlugins = {
    blog: {
        excerpt: true,
        excerptLength: 0,
        filter: (page) => Boolean(page.filePathRelative) && !page.frontmatter.home && !page.frontmatter.notPage
    },
    autoCatalog: {
        index: true,
        level: 3
    },
    photoSwipe: true,
    copyright: {
        global: true,
        author: "gzw"
    },
    mdEnhance: {
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
                        content,
                    };
            },
        }],
        include: {
            deep: true
        },
        presentation: ["highlight", "math", "search", "notes", "zoom"],
        align: true,
        katex: true,
        attrs: true,
        card: true,
        chart: true,
        codetabs: true,
        container: true,
        demo: true,
        echarts: true,
        figure: true,
        flowchart: true,
        gfm: true,
        imgLazyload: true,
        imgMark: true,
        imgSize: true,
        mark: true,
        mermaid: true,
        playground: {
            presets: ["ts", "vue"],
        },
        sub: true,
        // 启用上角标
        sup: true,
        tabs: true,
        vuePlayground: true,
        tasklist: true,
        footnote: true,
        mathjax: {
            output: "chtml",
        }
    }
}