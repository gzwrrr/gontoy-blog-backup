import { createBuildApp } from '@vuepress/core';

export const navPlugin = async () => {
    const app = createBuildApp({
        name: '@org/vuepress-plugin-gontoy',
        multiple: false
    })

    // 初始化和准备
    await app.init()
    await app.prepare()

    // 构建
    await app.build()

    // 处理 onGenerated hook
    await app.pluginApi.hooks.onGenerated.process(app)

    console.log('===========================success===========================')
    console.log(app)
}