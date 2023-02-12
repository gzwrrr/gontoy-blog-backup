<template>
    <div>
        <PureMode />
        <NormalPage />
        <LeftFloating />
    </div>
</template>


<script setup>
import NormalPage from "vuepress-theme-hope/components/NormalPage.js";
import LeftFloating from "./custom/LeftFloating.vue";
import PureMode from "./custom/PureMode.vue";
</script>
