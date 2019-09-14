<template>
  <el-header height="100px">
    <div class="header-top"></div>
    <div class="header-bottom">
      <span class="title">{{getTitle}}</span>
      <div class="right">
        <span class="time">{{time|timeFormat}}</span>
      </div>
    </div>
  </el-header>
</template>

<script>
/* eslint-disable */
import moment from 'moment'
export default {
  data() {
    return {
      time: Date.now()
    }
  },
  mounted () {
    setInterval(() => {
      this.time = Date.now()
    }, 1000)
  },
  computed: {
    getTitle() {
      let path = this.$route.path
      if (path.indexOf('/product') === 0) {
        path = '/product'
      }
      switch (path) {
        case '/home':
          return '首页';
        case '/category':
          return '品类管理';
        case '/product':
          return '商品管理';
        case '/role':
          return '权限管理';
        default:
          break;
      }
    }
  },
  methods: {
  },
  filters: {
    timeFormat() {
      return moment().format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style lang="less" scoped>
  .el-header {
    padding: 0;
    .header-top {
      height: 60px;
      border-bottom: 1px solid #1DA57A;
    }
    .header-bottom {
      height: 40px;
      line-height: 40px;
      font-size: 18px;
      .title {
        margin-left: 60px;
      }
      .right {
        float: right;
        margin-right: 20px;
        .time {
          font-size: 14px;
        }
      }
    }
  }
</style>

