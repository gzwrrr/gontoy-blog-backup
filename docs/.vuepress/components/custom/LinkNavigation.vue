<template>
  <div class="Container">  
    <Collapse :title="typeName" headColor="var(--theme-white)" width="100%" bgColor="var(--dark-color)"
      :isCollapse="false">
      <div id="list-container">
        <div class="list">
          <div @click="to(item.url)" class="item" v-for="(item, index) in list" :index="index">
            <div class="head">
              <div class="icon">
                <img v-if="item.icon !== ''" :id="'img-' + index" :src="item.icon" @error="loadFail('img-' + index)" />
                <!-- <span v-else class="empty-icon">&#9785</span> -->
                <img v-else :id="'img-' + index" :src="errorImage" @error="loadFail('img-' + index)" />
              </div>
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
import { defineProps, onMounted, ref } from 'vue'

const props = defineProps({
  typeName: String,
  list: []
})

const list = ref(props.list);
const typeName = ref(props.typeName);

const errorImage = 'data:image/png;base64,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';

const loadFail = (id) => {
  var image = document.getElementById(id)
  image.src = errorImage;
  image.οnerrοr = null
 
}

onMounted(() => {
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
  color: var(--theme-white) !important;
}

.list:nth-child(3n+1) {
  margin-left: 20px;
}

.item {
  display: flex;
  flex-direction: column;
  background-color: var(--theme-dark-light);
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
  box-shadow:0 0px 0px rgba(0,0,0,0.2);
}

.item:hover {
  background-color: var(--theme-dark);
  cursor: pointer;
}

.item:active {
  background-color: var(--theme-dark-light);
}

.head {
  display: flex;
  justify-content: start;
  align-items: center;
  width: 95%;
  border-bottom: 1px solid var(--theme-white);
  padding: 0 0 10px;

  .title {
    font-size: 15px;
    margin-left: 10px;
    height: 30px;
    line-height: 30px;
    flex: 1;
  }

  .icon {
    width: 30px;
    height: 30px;
    border-radius: 5px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .empty-icon {
      width: 100%;
      height: 100%;
      display: block;
      color: var(--theme-white);
      justify-content: center;
      text-align: center;
      background-color: var(--theme-dark);
      font-size: 0px;
      align-items: center;
      line-height: 30px;
    }
  }
}

.desc {
  width: 95%;
  margin-top: 10px;
  font-size: 12px;
}
</style>