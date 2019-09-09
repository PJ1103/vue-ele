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
        <el-button @click="showAddCategory=true" style="float: right; padding: 8px 12px; margin-top: -4px;" icon="el-icon-plus" type="primary">添加品类</el-button>
      </div>

      <!-- 一级分类表格显示 -->
      <template v-if="!isShowSubCategory">
        <el-table
          :data="categoryPageData"
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
                @click="updateCategoryName(scope, 0)">修改名称</el-button>
              <el-button
                type="text"
                @click="showSubCategory(scope.row)">查看其子品类</el-button>
            </template>
          </el-table-column>
          
        </el-table>
      </template>

      <!-- 二级分类表格显示 -->
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
                @click="updateCategoryName(scope, 1)">修改名称
              </el-button>
            </template>
          </el-table-column>
          
        </el-table>
      </template>

      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :current-page="isShowSubCategory ? currentPage1 : currentPage"
        :total="isShowSubCategory ? subCategoryData.length : categoryData.length"
        @current-change="currentChange($event)">
      </el-pagination>
      

      <!-- 添加品类 -->
      <el-dialog title="添加分类" :visible.sync="showAddCategory">
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
          <el-button @click="showAddCategory = false">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 修改分类名称 -->
      <el-dialog title="更新分类" :visible.sync="showUpdateCategoryName" width="30%">
        <el-form>
          <el-form-item>
            <el-input autocomplete="off" v-model="updateCategoryNameValue"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showUpdateCategoryName = false">取 消</el-button>
          <el-button type="primary" @click="handleUpdateCategoryName">确 定</el-button>
        </div>
      </el-dialog>

    </el-card>
  </el-main>
</template>

<script>
import { reqCategory, reqAddCategory, reqUpdateCategoryName } from '../../api'
export default {
  data() {
    return {
      categoryData: [],
      categoryPageData: [],      
      categoryName: '',
      updateCategoryNameId: '',
      updateCategoryNameValue: '',
      updateCategoryNameType: '',
      subCategoryData: [],
      isShowSubCategory: false,
      // 添加品类的显示
      showAddCategory: false,
      showUpdateCategoryName: false,
      pageSize: 4,
      // 显示一级或二级当前分页，不能共用同一个当前页
      currentPage: 1,
      currentPage1: 1,
      form: {
        name: '',
        id: '0',
      },
      rules: {
        name: [
          // 想要校验数字，必须在 v-model 上写 v-model.number，官方文档上已说明
          { required: true, message: '必须填' }
        ]
      }
    }
  },
  async mounted () {
    const result = await reqCategory({parentId: 0})
    this.categoryData = result.data
    console.log(this.categoryData)
    this.getPageData(1)
  },
  methods: {
    // 修改分类名称的显示 一级或二级 
    // type 判断是一级还是二级 0为一级 1为二级
    updateCategoryName(scope, type) {
      // 展示修改名称组件
      this.showUpdateCategoryName = true
      const { _id, name } = scope.row
      this.updateCategoryNameId = _id
      this.updateCategoryNameValue = name
      this.updateCategoryNameType = type
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
      this.$refs.form.validate(async (flag) => {
        if (flag) {
          const { name, id } = this.form
          const result = await reqAddCategory({categoryName: name, parentId: id})
          if (result.status === 0) {
            this.categoryData.push(result.data)
            this.showAddCategory = false
          } else {
            console.log(result.msg);
          }
        }
      })
    },
    // 处理修改分类名字
    async handleUpdateCategoryName() {
      const categoryId = this.updateCategoryNameId
      const categoryName = this.updateCategoryNameValue
      const params = { categoryId, categoryName }
      const result = await reqUpdateCategoryName(params)
      if (result.status === 0) {
        // 判断是修改了一级分类还是二级分类
        const categoryType = this.updateCategoryNameType === 0 ? 'categoryData' : 'subCategoryData'
        // 修改分类数组数据
        this[categoryType].find((item, index) => {
          if (item._id === categoryId) {
            item.name = categoryName
          }
        })
        
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.showUpdateCategoryName = false
      }
    },
    // 分页
    getPageData(page) {
      const pageSize = this.pageSize
      const stringObj = JSON.stringify(this.categoryData)
      const toObj = JSON.parse(stringObj)
      this.categoryPageData = toObj.splice((page-1) * pageSize, pageSize)
    },
    // 页码变化时
    currentChange(page) {
      this.currentPage = page
      this.getPageData(page)
      // console.log(page);
    }
  },
  watch: {
    categoryData: {
      handler() {
        this.getPageData(this.currentPage)
      },
      deep: true
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
