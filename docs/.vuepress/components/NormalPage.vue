<template>
    <div>
        <ClientOnly>
            <PureMode />
            <!-- <Focus /> -->
        </ClientOnly>
        <NormalPage />
        <LeftFloating />
    </div>
</template>


<script setup>
import NormalPage from "vuepress-theme-hope/components/NormalPage.js";
import LeftFloating from "./custom/LeftFloating.vue";
// import Focus from "./custom/Focus.vue";
import PureMode from "./custom/PureMode.vue";
</script>