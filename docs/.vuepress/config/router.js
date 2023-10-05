export const navbar = [{
    text: "主页",
    link: "/README.md",
    // 仅在 `/zh/guide/` 激活
    activeMatch: "^/zh/guide/$",
},
{
    text: "导航",
    link: "/guide/",
    // 仅在 `/zh/guide/` 激活
    activeMatch: "^/zh/guide/$",
},
{
    text: "编程语言",
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
    text: "算法",
    link: "/article/algorithm/"
},
{
    text: "框架",
    children: [
        "/article/tomcat/",
        "/article/springs/",
        "/article/vue/",
    ]
},
{
    text: "数据库",
    children: [
        "/article/mysql/",
        "/article/redis/",
        "/article/elasticsearch/",
        "/article/mongodb/",
        "/article/mybatis/"
    ]
},
{
    text: "设计/架构",
    children: [
        "/article/design/",
        "/article/framework/",
    ]
},
{
    text: "中间件",
    children: [
        "/article/rabbitmq/",
        "/article/netty/",
        "/article/quartz/",
        "/article/kafaka/"
    ]
},
{
    text: "运维",
    children: [
        "/article/git/",
        "/article/docker/",
        "/article/k8s/",
        "/article/jenkins/",
        "/article/linux/",
    ]
},
{
    text: "移动端",
    children: [
        "/article/android/",
        "/article/mp/",
    ]
},
{
    text: "大数据",
    link: "/article/data/"
},
{
    text: "数学建模",
    link: "/article/modeling/"
},
{
    text: "其他文章",
    link: "/article/other/"
},
{
    text: "关于",
    link: "/about/"
},
];

export const sidebar = {
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
        "" /* / */,
        // "contact" /* /contact.html */,
        // "about" /* /about.html */,
    ],
};