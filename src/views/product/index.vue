<template>
  <el-main>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item>
            <el-select v-model="searchForm.selectValue" placeholder="活动区域">
              <el-option label="根据商品名称" value="0"></el-option>
              <el-option label="根据商品描述" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchForm.searchWord" placeholder="关键字"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" @click="handleSearch">搜索</el-button>
          </el-form-item>
        </el-form>
        <el-button class="add-btn" type="primary">
          <i class="el-icon-plus el-icon--left"></i>添加产品
        </el-button>
      </div>
      
      <template>
        <el-table
          :data="productList"
          border
          style="width: 100%">
          <el-table-column
            prop="name"
            label="商品名称">
          </el-table-column>
          <el-table-column
            prop="desc"
            label="商品描述">
          </el-table-column>
          <el-table-column
            prop="price"
            label="价格"
            width="200">
          </el-table-column>
          <el-table-column label="状态" width="150">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="small"
                @click="updateStatus(scope.row)">{{scope.row.status===2?'下架':'上架'}}</el-button>
              <span style="margin-left: 10px">{{scope.row.status===2?'在售':'已下架'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handleEdit(scope.$index, scope.row)">详情</el-button>
              <el-button
              type="text"
              size="small"
              @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

    </el-card>
  </el-main>
</template>

<script>
import { reqProduct, reqUpdateState, reqProductSearch, reqCategory } from '../../api'
export default {
  data() {
    return {
      searchForm: {
        selectValue: '0',
        searchWord: ''
      },
      productList: []
    } 
  },
  mounted () {
    // 初始化数据
    this.initProduct()
  },
  methods: {
     async initProduct() {
      const result = await reqProduct({ pageNum: 1, pageSize: 4 })
      console.log(result);
      if (result.status === 0) {
        this.productList = result.data.list
      }
      
    },
    // 更新状态
    async updateStatus(row) {
      const status = row.status
      const id = row._id
      const result = await reqUpdateState({ productId: id, status: 3 - status})
      if (result.status === 0) {
        row.status = 3 - status
        this.$message({
          message: '更新状态成功！',
          type: 'success'
        });
      }
    },
    // 处理搜索
    async handleSearch() {
      const productDesc = this.searchForm.searchWord.trim()
      const result = await reqProductSearch({ productDesc, pageNum: 1, pageSize: 4 })
      if (result.status === 0) {
        this.productList = result.data.list
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .el-main {
    background-color: #F0F2F5;
    .box-card {
      .demo-form-inline {
        height: 40px;
      }
      .add-btn {
        float: right;
        margin-top: -42px;
      }
    }
  }
</style>
