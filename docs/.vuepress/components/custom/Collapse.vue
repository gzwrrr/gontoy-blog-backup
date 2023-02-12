<template>
    <div class="Collapse" :style="{ backgroundColor: bgColor, width: width }">
        <div class="CollapseHead" :style="{
            color: headColor, borderLeftColor: headColor,
        }" @click="collapse = !collapse">
            <span class="title">{{ title }}</span>
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
            default: true,
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
.content-enter-from,
.content-leave-to {
    opacity: 0;
}

.content-enter-to,
.content-leave-from {
    opacity: 1;
}

.content-enter-active,
.content-leave-active {
    transition: all .2s ease-in-out;
}

.Collapse {
    color: var(--theme-white);
    background-color: var(--theme-deep-blue);
    padding: 10px;
    box-sizing: border-box;
    user-select: none;
    cursor: pointer;
    border: 1px solid var(--theme-grey);
    border-radius: 5px;

    CollapseHead {
        line-height: 30px;
        border-left: 5px solid;
        font-weight: bold;
        padding-left: 10px;
        font-size: 20px;
        caret-color: transparent;

        &:hover {
            cursor: pointer;
        }
    }
}

.content {
    margin-top: 10px;
    font-size: 18px;
    border-top: 1px solid var(--theme-grey);
}

.title {
    position: relative;
    font-weight: bold;
    font-size: 20px;
    padding: 0 15px;
}

.title::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 7px;
    height: 90%;
    background-color: var(--theme-white);

}
</style>