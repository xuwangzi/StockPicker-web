<template>
  <div id="app">
    <el-container>
      <el-header>
        <Header v-if="isHeaderShow" id="headWrapper"></Header>
      </el-header>
      <el-main>
        <router-view class="main-content"></router-view>
      </el-main>
    </el-container>
<!--    <Header v-if="isHeaderShow" id="headWrapper"></Header>-->
<!--    <router-view class="main-content"></router-view>-->
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  },
  computed: {
    //  头部是否显示
    isHeaderShow() {
      // let routerNameList = ['Error_404']
      let routerNameList = ['Error_404','Register','Login']
      if (routerNameList.includes(this.$route.name)) {
        return false
      } else {
        return true
      }
    }

  },
  data() {
    return {}
  }
}
</script>
<style lang="stylus" scoped>
@import '~@/assets/styles/varibles.styl';

#app {
  height: 100%;
  overflow-x: hidden;
  -webkit-text-size-adjust: none;
  overflow-y: auto;

  >>> .el-backtop {
    background-color: $Success;
    color: #fff;
    z-index: 3;
  }

  .main-content {
    flex: 1;
    width: 90%;
    min-height: calc(100vh - 70px);
    margin: 0 auto;
    display: flex;
  }
}
</style>
