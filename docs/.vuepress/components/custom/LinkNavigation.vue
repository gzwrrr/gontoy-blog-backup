<template>
  <div class="Container">
    <Collapse :title="typeName" headColor="var(--theme-white)" width="100%" bgColor="var(--dark-color)"
      :isCollapse="true">
      <div class="list">
        <div @click="to(item.url)" class="item" v-for="(item, index) in list" :index="index">
          <div class="head">
            <div class="icon"><img :id="'img-' + index" :src="item.icon" @error="loadFail('img-' + index)" /></div>
            <div class="title">{{ item.title }}</div>
          </div>
          <div class="desc">{{ item.desc }}</div>
        </div>
      </div>
    </Collapse>
  </div>
</template>

<script setup>
import Collapse from './Collapse.vue';
import { defineProps, onMounted } from 'vue'
const props = defineProps(["list", "typeName"])

const list = props.list;
const typeName = props.typeName;

const loadFail = (id) => {

  var image = document.getElementById(id)

  image.src = '/assets/img/error_image.png'

  image.οnerrοr = null

}

onMounted(() => {
  console.log('onMounted');
})

const to = (url) => {
  window.open(url, "_blank");
}

</script>

<style scoped lang="scss">
.Container {
  margin: 20px 0;
}

.type-name {
  font-size: 25px;
  font-weight: bold;
  border-bottom: 1px solid var(--theme-grey);
  padding: 20px 0 10px;
}

.list {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  margin: 0;
}

.item {
  background-color: var(--deep-theme-color);
  width: 30%;
  border-radius: 3px;
  margin: 10px 1.5% 0;
  box-sizing: border-box;
  padding: 10px;
  transition: all .1s ease-in-out;
  user-select: none;
}

.item:hover {
  transform: scale(1.03);
  cursor: pointer;

}

.item:active {
  background-color: var(--theme-deep-blue);
}

.head {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid var(--theme-grey);
  padding: 0 0 5px 0;

  .title {
    font-weight: bold;
    font-size: 15px;
    margin-left: 10px;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    overflow: hidden;
    border-radius: 5px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.desc {
  margin-top: 5px;
  font-size: 10px;
}
</style>