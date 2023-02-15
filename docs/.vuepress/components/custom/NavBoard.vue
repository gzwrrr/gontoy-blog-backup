<template>
    <div>
        <template v-for="(data, index) in dataList" :key="index">
            <LinkNavigation :typeName="data.typeName" :list="data.list" />
        </template>
    </div>
</template>

<script setup>
import LinkNavigation from "./LinkNavigation.vue";
import { defineProps, onMounted, ref } from 'vue'


const props = defineProps({
    filePath: String,
    fileName: String
})

const dataList = ref([]);

onMounted(async () => {
    let { filePath, fileName } = props;
    const files = await getWebsitesData(filePath, fileName);
    const data = files.default;
    dataList.value = data;
    console.log(data);
})

async function getWebsitesData(filePath, fileName) {
    try {
        const data = await import(`../../data/nav/${filePath}/${fileName}.json`);
        return data;
    } catch {
        console.log("找不到资源");
        return {};
    }
}

</script>
