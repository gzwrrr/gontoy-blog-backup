import {
    anchorPlugin
} from '@vuepress/markdown'

export default {
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
}