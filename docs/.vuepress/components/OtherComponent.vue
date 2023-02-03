<template>
  <div>
    <button @click="change">{{ buttonName }}</button>
  </div>
</template>

<script>
export default {
  name: "OtherComponent",
  data() {
    return {
      buttonName: "点击按钮"
    };
  },
  methods: {
    change() {
      console.log(111);
    }
  }
};
</script>