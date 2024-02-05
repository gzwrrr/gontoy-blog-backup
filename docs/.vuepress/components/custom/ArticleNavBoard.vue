<template>
    <div>
        <template v-for="(data, index) in dataList" :key="index">
            <ArticleLinkNavigation :id="data.typeName" :typeName="data.typeName" :list="data.list" />
        </template>
    </div>
</template>


<script setup>
import ArticleLinkNavigation from "./ArticleLinkNavigation.vue";
import { defineProps, onMounted, ref, onBeforeUnmount } from 'vue'


const props = defineProps({
    filePath: String,
    fileName: String
})

const dataList = ref([]);
const selectedIndex = ref(-1);

var toc = null;
var content = null;
var contentRight = null;


onMounted(async () => {
    // 获取文件路径和文件名
    let { filePath, fileName } = props;
    // 获取文件数据
    const files = await getWebsitesData(filePath, fileName);
    // 获取文件数据
    const data = files.default;
    // 将文件数据赋值给dataList
    dataList.value = data;
    // 获取内容元素
    content = document.querySelector('.theme-hope-content');
    // 设置内容元素的溢出属性为可见
    content.style.overflow = 'visible';
    // 获取toc元素
    toc = document.querySelector('#toc');
    // 设置toc元素的显示属性为隐藏
    // toc.style.display = 'none';
    // 获取文档元素
    document.documentElement.style.setProperty("--content-right", content.getBoundingClientRect().right + 'px');
    document.documentElement.style.setProperty("--content-top", content.getBoundingClientRect().top + 'px');
})

onBeforeUnmount(() => {
    toc.style.display = '';
})

const changeIndex = (index) => {
    selectedIndex.value = index
} 

async function getWebsitesData(filePath, fileName) {
    try {
        const data = await import(`../../data/nav/${filePath}/${fileName}.json`);
        console.log(data);
        return data;
    } catch {
        console.log("找不到资源");
        return {};
    }
}

</script>

<style scoped lang="scss">
:root {
    --content-right: 100vh;
    --content-top: 0;
}
#vuepress-toc {
    position: fixed;
    display: flex;
    flex-direction: column;
    left: var(--content-right);
    top: var(--content-top);
    z-index: 999;
    max-width: 300px;
    min-width: 250px;
    max-height: 600px;
    overflow-y: scroll;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    z-index: 5;
}
#vuepress-toc::-webkit-scrollbar {
  display: none;
}
.vuepress-toc-item {
    position: relative;
    display: block;
    padding: 5px 10px;
    box-sizing: border-box;
    border-left: 2px solid var(--theme-grey);
}
.vuepress-toc-link {
    opacity: 0.7;
    color: var(--theme-grey-light) !important;
    text-decoration: none !important;
    padding: 5px;
}

.vuepress-toc-link:hover {
    opacity: 1;
    color: var(--theme-grey-light) !important;   
}
.vuepress-toc-link-active {
    border-left: 2px solid var(--theme-grey-light) !important;
}
</style>