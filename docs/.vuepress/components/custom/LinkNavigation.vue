<template>
  <div class="Container">
    <Collapse :title="typeName" headColor="var(--theme-white)" width="100%" bgColor="var(--dark-color)"
      :isCollapse="true">
      <div id="list-container">
        <div class="list">
          <div @click="to(item.url)" class="item" v-for="(item, index) in list" :index="index">
            <div class="head">
              <div class="icon"><img :id="'img-' + index" :src="item.icon" @error="loadFail('img-' + index)" /></div>
              <div v-if="item.title" class="title omit">{{ item.title }}</div>
              <div v-else class="title omit">暂时没有标题...</div>
            </div>
            <div v-if="item.desc" class="desc omit">{{ item.desc }}</div>
            <div v-else class="desc omit">暂时没有介绍...</div>
          </div>
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

.omit {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.type-name {
  font-size: 25px;
  font-weight: bold;
  border-bottom: 1px solid var(--theme-grey);
  padding: 20px 0 10px;
}

#list-container {
  width: 100%;
}

.list {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-flow: row wrap;
  width: auto;
}

.list:nth-child(3n+1) {
  margin-left: 20px;
}

.item {
  display: flex;
  flex-direction: column;
  background-color: var(--theme-blue);
  width: 30%;
  min-width: 30%;
  border-radius: 3px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  padding: 10px;
  user-select: none;
  height: 100px;
  overflow: hidden;
  padding: 10px;
  margin: 10px;
  transition: all .1s ease-in-out;
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
  justify-content: start;
  align-items: center;
  width: 95%;
  border-bottom: 1px solid var(--theme-white);
  padding: 0 0 10px;

  .title {
    font-weight: bold;
    font-size: 15px;
    margin-left: 10px;
    flex: 1;
  }

  .icon {
    width: 30px;
    height: 30px;
    border-radius: 5px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.desc {
  width: 95%;
  margin-top: 10px;
  font-size: 12px;
}
</style>