<template>
    <div>
        <BlogHome />
        <LeftFloating />
    </div>
</template>

<script setup>
import BlogHome from "vuepress-theme-hope/modules/blog/components/BlogHome.js";
import LeftFloating from "./custom/LeftFloating.vue";   
</script>

<style>
#sidebar, #navbar, #toc {
    transition: all 0.5s ease-in-out !important;
}
</style>
