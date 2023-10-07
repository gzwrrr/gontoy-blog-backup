<template>
    <div class="Collapse" :style="{ backgroundColor: bgColor, width: width }">
        <!-- :style="{
            color: headColor, borderLeftColor: headColor,
        }" -->
        <div class="CollapseHead" @click="collapse = !collapse">

            <span class="title">
                {{ title }}
            </span>
            <span style="float: right">
                <i v-if="collapse" class="el-icon-arrow-down"></i>
                <i v-else class="el-icon-arrow-right"></i>
            </span>

        </div>
        <transition name="content">
            <div class="content" v-if="collapse">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>
 
<script>
export default {
    name: "Collapse",
    components: {
    },
    props: {
        title: {
            type: String,
            default: "标题",
        },
        headColor: {
            type: String,
            default: "var(--theme-blue)",
        },
        bgColor: {
            type: String,
            default: "var(--theme-blue)",
        },
        width: {
            type: String,
            default: "100%",
        },
        isCollapse: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            collapse: this.isCollapse,
        };
    },
    computed: {},
    created() { },
    mounted() { },
    filters: {},
    methods: {},
    watch: {},
};
</script>
 
<style lang="scss" scoped>
// 
.content-enter-from,
.content-leave-to {
    opacity: 0;
    transform-origin: top;
    top: 0%;
    transform: scale(0);
}

// 

.content-enter-to,
.content-leave-from {
    opacity: 1;
    transform-origin: bottom;
    top: -100%;
    transform: scale(1);
}

.content-enter-active,
.content-leave-active {
    transition: all .3s ease-in-out;
}

.Collapse {
    color: var(--theme-white);
    background-color: var(--theme-deep-blue);
    box-sizing: border-box;
    user-select: none;
    cursor: pointer;
    border: 1px solid var(--theme-grey);
    border-radius: 5px;

    .CollapseHead {
        padding-left: 10px;
        caret-color: transparent;
        padding: 5px 0;
        background-color: var(--theme-dark-light);
        color: var(--theme-white) !important;

        &:hover {
            cursor: pointer;
            background-color: var(--theme-dark);
        }

        &:active {
            cursor: pointer;
            color: var(--theme-dark-brightness);
        }
    }
}

.content {
    position: relative;
    font-size: 18px;
    border-top: 1px solid var(--theme-grey);
    background-color: var(--theme-dark-brightness);
}

.title {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    font-weight: 100;
    font-size: 15px;
}

// .title::after {
//     content: '';
//     position: absolute;
//     left: 0;
//     bottom: 0;
//     width: 7px;
//     height: 90%;
//     background-color: var(--theme-white);
// }</style>