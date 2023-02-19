<template>
  <div class="first-page">
    <h3>汽车销售管理系统</h3>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'first-page',
  components: {}
}
</script>

<style lang="scss" scoped>
.first-page {
  width: 100%;
  height: 100%;
  min-height: 800px;
  background: url('../assets/login_background.jpg') no-repeat;
  background-size: 100% 100%;
  position: relative;
  h3 {
    color: #fff;
    font-size: 50px;
    position: absolute;
    top: 150px;
    left: 200px;
    margin: 0px;
  }
}
</style>