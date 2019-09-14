<template>
  <el-container style="height: 100%; border: 1px solid #eee">

    <LeftNav />
    
    <el-container direction="vertical"> 
      <Header />
      
      <router-view></router-view>

    </el-container>

  </el-container>
</template>

<script>
import LeftNav from '../../components/leftNav'
import Header from '../../components/header'
export default {
  components: {
    LeftNav,
    Header
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
  
</style>
