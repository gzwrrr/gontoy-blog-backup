<template>
  <div>
    <button @click="enlargePage">+</button>
    <button @click="narrowPage">-</button>
  </div>
</template>

<script setup>

//网页放大缩小的变量，初始值为1
var paramNumber = 1;
//缩小页面
const narrowPage = () => {
  //设置最小限制
    if(paramNumber >0.2){
        paramNumber -=0.1;
    }
    //缩小body
    document.getElementsByTagName('body')[0].style.zoom=paramNumber;
}
//放大页面
const enlargePage = () => {
  //设置最大限制
    if(paramNumber <5){
        paramNumber +=0.1;
    }
    //放大body
    document.getElementsByTagName('body')[0].style.zoom=paramNumber;
}


</script>