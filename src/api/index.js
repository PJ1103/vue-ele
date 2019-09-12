import request from './request'
const BASE = 'api'
// 获取一级分类或者二级分类
export const reqCategory = (params) => request(BASE + '/manage/category/list', params)

// 添加一级分类或二级分类
export const reqAddCategory = (params) => request(BASE + '/manage/category/add', params, 'post')

// 更新一级分类或二级分类名称
export const reqUpdateCategoryName = (params) => request(BASE + '/manage/category/update', params, 'post')

// 获取商品分页列表
export const reqProduct = (params) => request(BASE + '/manage/product/list', params)

// 更新商品状态
export const reqUpdateState = (params) => request(BASE + '/manage/product/updateStatus', params, 'post')

// 搜索产品分页列表
export const reqProductSearch = (params) => request(BASE + '/manage/product/search', params)


