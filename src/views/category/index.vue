<template>
  <el-main>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span v-if="!isShowSubCategory">一级分类列表</span>
        <span v-else>
          <el-button class="categoryBtn" size="medium" type="text" @click="backCategory">一级分类</el-button>
          <i class="el-icon-right" style="margin-left: 10px; font-size: 18px"></i>
          <span>{{categoryName}}</span>
        </span>
        <el-button @click="dialogFormVisible=true" style="float: right; padding: 8px 12px; margin-top: -4px;" icon="el-icon-plus" type="primary">添加品类</el-button>
      </div>

      <!-- 一级分类展示 -->
      <template v-if="!isShowSubCategory">
        <el-table
          :data="categoryData"
          border
          >
          <el-table-column
            prop="name"
            label="品类名称"
            min-width="70">
          </el-table-column>
         
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="updateCategoryName(scope)">修改名称</el-button>
              <el-button
                type="text"
                @click="showSubCategory(scope.row)">查看其子品类</el-button>
            </template>
          </el-table-column>
          
        </el-table>
      </template>

      <!-- 二级分类展示 -->
      <template v-if="isShowSubCategory">
        <el-table
          :data="subCategoryData"
          border
          >
          <el-table-column
            prop="name"
            label="品类名称"
            min-width="70">
          </el-table-column>
         
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="updateCategoryName(scope)">修改名称
              </el-button>
            </template>
          </el-table-column>
          
        </el-table>
      </template>

      <!-- 添加品类 -->
      <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
        <el-form :model="form" ref="form" label-position="top" :rules="rules">
          <el-form-item label="所属分类">
            <el-select v-model="form.id" placeholder="请选择活动区域">
              <el-option label="一级分类" value="0"></el-option>
              <el-option :label="item.name" :value="item._id" v-for="item in categoryData" :key="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类名称" prop="name">
            <el-input v-model.number="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </el-main>
</template>

<script>
import { reqCategory } from '../../api'
export default {
  data() {
    return {
      categoryData: [],
      categoryName: '',
      subCategoryData: [],
      isShowSubCategory: false,
      // 添加品类的显示
      dialogFormVisible: true,
      form: {
        name: '',
        id: '0',
      },
      rules: {
        name: [
          // 想要校验数字，必须在 v-model 上写 v-model.number，官方文档上已说明
          { required: true, message: '必须填' },
          { type: 'number', message: '填数字' }
        ]
      }
    }
  },
  async mounted () {
    const result = await reqCategory({parentId: 0})
    this.categoryData = result.data
  },
  methods: {
    updateCategoryName(a) {
      console.log(a);
    },
    async showSubCategory(row) {
      const result = await reqCategory({parentId: row._id})
      this.isShowSubCategory = true
      this.subCategoryData = result.data
      this.categoryName = row.name
    },
    // 点击一级分类，返回一级分类列表
    backCategory() {
      this.isShowSubCategory = false
    },
    // 处理添加分类
    handleSubmit() {
      this.$refs.form.validate((flag) => {
        if (flag) {
          console.log(this.form);
          this.$refs.form.resetFields()
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .el-main {
    background-color: #F0F2F5;
    .box-card {
      .categoryBtn {
        padding: 0
      }
    }
  }
</style>
