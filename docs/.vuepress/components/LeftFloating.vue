<template>
    <div>
        <div class="left-floating-container">

        </div>
    </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
// $height: 410px;
$height: 60px;
$width: 60px;
$gap: 20px;
$opacity: 0.8;

.left-floating-container {
    position: fixed !important;
    // top: calc(100% - $height - $gap);
    top: calc(var(--navbar-height) + $gap);
    right: $gap;
    background-color: var(--dark-color);
    width: $width;
    height: $height;
    border-radius: 5px;
    opacity: $opacity;
    z-index: 999;
    transition: all .5s ease-in-out;
}

.left-floating-container:hover {
    // width: calc(100% - 2 * $gap);
    // height: calc(100% - var(--navbar-height) - 2 * $gap);
    top: calc(var(--navbar-height));
    right: 0;
    width: 100%;
    height: calc(100% - var(--navbar-height));
    opacity: 1;
    border-radius: 0;
}
</style>