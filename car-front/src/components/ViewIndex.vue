<template>
  <div class="viewIndex">
    <el-container>
      <el-header
        ><img src="../assets/轿车.png" alt="" width="100" /><span>汽车销售平台</span>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>
<style lang="scss" scoped>
.viewIndex {
  * {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
  }
  .el-header {
    height: 70px !important;
    display: flex;
    align-items: center;
    background-color: rgba(55, 61, 65, 1);
    color: #fff;
    span {
      font-size: 24px;
      display: block;
      margin: 0 20px;
    }
  }
  .el-footer {
    height: 200px !important;
    background-color: rgba(0, 30, 80, 1);
  }
}
</style>

<style lang="scss">
.viewIndex {
  .el-main {
    padding: 0px;
  }
}
</style>