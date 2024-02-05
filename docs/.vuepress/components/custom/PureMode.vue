<template>
    <div>
        <div>
            <button id="pure" @click="pure()">{{ tip }}</button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'

let flag = false;
let tip = ref('Pure');
let width = document.documentElement.style.getPropertyValue('--content-width');
let newWidth = '1000px';

onMounted(() => {
    let pageTitleHeight = document.querySelector('.page-title').clientHeight;
    document.documentElement.style.setProperty('--page-title', pageTitleHeight + 'px');
})

onBeforeUnmount(() => {
    
})

const hide = (element) => {
    element.style.opacity = 0;
    element.style.visibility = 'hidden';
    element.style.position = 'fixed';
    // element.style.transform = 'scale(0)';
}

const moveToTop = (element) => {
    element.style.top = '-50%';
}

const moveToLeft = (element) => {
    element.style.left = '-100%';
}

const moveToToc = (element) => {
    element.style.left = '-250px';
    element.style['z-index'] = '-100';
}

const pure = () => {
    let toc = document.getElementById('toc');
    let sidebar = document.getElementById('sidebar');
    let navbar = document.getElementById('navbar');
    if (!flag) {
        // moveToToc(toc);
        hide(sidebar);
        moveToLeft(sidebar);
        hide(navbar);
        moveToTop(navbar);
        tip.value = 'Exit';
        launchFullScreen(document.documentElement);
    } else {
        toc.removeAttribute('style');
        sidebar.removeAttribute('style');
        navbar.removeAttribute('style');
        tip.value = 'Pure';
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
@media screen and (min-width: 1680px) {
    :root {
        --mask-width: 0px;
        --mask-height: 0px;
        --mask-top: 0px;
        --mask-left: 0px;
    }

    #pure {
        position: fixed;
        opacity: 0.5;
        right: 30px;
        bottom: 30px;
        transform: translate(0, -100%);
        width: 50px;
        height: 50px;
        border: none;
        z-index: 170;
        border-radius: 30px;
        background-color: transparent;
        border: 2px solid var(--theme-color);
        font-weight: bold;
        color: var(--theme-grey-color);
        transition: all 0.5s ease-in-out;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 10px;
    }

    #pure:hover {
        opacity: 1;
        cursor: pointer;
    }
}

</style>