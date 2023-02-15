<template>
    <div>
        <PDF :url="url" />
    </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue'

const { filePath, fileName } = props;

const url = `/pdf/${filePath}/${fileName}.pdf`;


const props = defineProps({
    filePath: String,
    fileName: String
})

onMounted(async () => {

})

</script>

<style>
.pdf-preview {
    position: relative;
    height: 100vh !important;
    overflow: hidden;
    border-radius: 8px;
}
</style>
