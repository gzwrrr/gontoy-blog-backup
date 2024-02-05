<template>
    <div>
        <!-- <nav id="vuepress-toc">
            <span v-for="(data, index) in dataList" :class="{'vuepress-toc-item': true, 'vuepress-toc-link-active': selectedIndex === index}">
                <RouterLink class="vuepress-toc-link" :to="'#' + data.typeName" @click="changeIndex(index)">{{ data.typeName }}</RouterLink>
            </span>
        </nav> -->
        <template v-for="(data, index) in dataList" :key="index">
            <LinkNavigation :id="data.typeName" :typeName="data.typeName" :list="data.list" />
        </template>
    </div>
</template>

<script setup>
import LinkNavigation from "./LinkNavigation.vue";
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
    let { filePath, fileName } = props;
    const files = await getWebsitesData(filePath, fileName);
    const data = files.default;
    dataList.value = data;
    content = document.querySelector('.theme-hope-content');
    content.style.overflow = 'visible';
    toc = document.querySelector('#toc');
    // toc.style.display = 'none';
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