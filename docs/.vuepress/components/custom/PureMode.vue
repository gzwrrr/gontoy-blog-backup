<template>
    <div>
        <div>
            <button @click="pure()">{{ tip }}</button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

let flag = false;
let tip = ref('纯净');
let width = document.documentElement.style.getPropertyValue('--content-width');
let newWidth = '1000px';

onMounted(() => {
    let pageTitleHeight = document.querySelector('.page-title').clientHeight;
    document.documentElement.style.setProperty('--page-title', pageTitleHeight + 'px');
    console.log(pageTitleHeight);
})

const pure = () => {
    let toc = document.getElementById('toc');
    let sidebar = document.getElementById('sidebar');
    let navbar = document.getElementById('navbar');
    if (!flag) {
        toc.style.display = 'none';
        sidebar.style.display = 'none';
        navbar.style.display = 'none';
        // document.documentElement.style.setProperty('--content-width', newWidth);
        tip.value = '退出';
        launchFullScreen(document.documentElement);
    } else {
        // document.documentElement.style.setProperty('--content-width', width);
        // toc.style.display = 'block';
        // sidebar.style.display = 'block';
        // navbar.style.display = 'block';
        toc.removeAttribute('style');
        sidebar.removeAttribute('style');
        navbar.removeAttribute('style');
        tip.value = '纯净';
        try {
            exitFullscreen(document);
        } catch (_) {

        }
    }
    flag = !flag;
}


const launchFullScreen = (document) => {

    if (document.requestFullscreen) {

        document.requestFullscreen();

    } else if (document.mozRequestFullScreen) {

        document.mozRequestFullScreen();

    } else if (document.webkitRequestFullscreen) {

        document.webkitRequestFullscreen();

    } else if (document.msRequestFullscreen) {

        document.msRequestFullscreen();

    }

}

const exitFullscreen = (document) => {

    if (document.exitFullscreen) {

        document.exitFullscreen();

    } else if (document.mozCancelFullScreen) {

        document.mozCancelFullScreen();

    } else if (document.webkitExitFullscreen) {

        document.webkitExitFullscreen();

    }
}
</script>

<style scoped lang="scss">
button {
    position: absolute;
    right: calc((100% - var(--content-width)) / 2 - 20px);
    top: calc(var(--navbar-height) + var(--page-title));
    transform: translate(0, -100%);
    width: 100px;
    height: 30px;
    border: none;
    z-index: 100;
    border-radius: 5px;
    background-color: var(--deep-theme-color);

}

button:hover {
    background-color: var(--theme-color);
    cursor: pointer;
}
</style>