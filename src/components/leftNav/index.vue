<template>
  <el-aside width="210px" style="background-color: #001529">
    <el-menu 
      class="el-menu-vertical-demo"
      default-active="1" 
      :default-openeds="['2']"
      active-text-color="#1DA57A" 
      background-color="#001529"
      text-color="#ffffffa6">

      <div class="logo">
        <img src="../../assets/gun.jpg" alt="">
      </div>

      <router-link to="/home">
        <el-menu-item index="1">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
      </router-link>
      
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>商品</template>
        <router-link to="/category">
          <el-menu-item index="2-1">
            <i class="el-icon-s-operation"></i>品类管理
          </el-menu-item>
        </router-link>
        <router-link to="/product">
          <el-menu-item index="2-2">
            <i class="el-icon-setting"></i>商品管理
          </el-menu-item>
        </router-link>
      </el-submenu>

      <router-link to="/user" v-if="role['/user']">
        <el-menu-item index="3">
          <i class="el-icon-user"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
      </router-link>
      
      <router-link to="/role">
        <el-menu-item index="4">
          <i class="el-icon-user"></i>
          <span slot="title">权限管理</span>
        </el-menu-item>
      </router-link>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  data() {
    return {
      role: {}
    }
  },
  mounted () {
    const str = localStorage.getItem('role')
    const arr = JSON.parse(str)
    const newArr = arr.values()
    for (const item of newArr) {
      this.role[item] = 1
    }
    console.log(this.role['/role']);
    
  }
}
</script>

<style lang="less" scoped>
  .el-aside {
    .el-menu {
      .logo {
        height: 80px;
        text-align: center;
        img {
          width: 30%;
        }
      }
    }
  }



a:link{
  text-decoration:none;
}



</style>
