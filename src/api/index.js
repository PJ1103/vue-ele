import request from './request'
const BASE = 'api'
// 获取一级分类或者二级分类
export const reqCategory = (params) => request(BASE + '/manage/category/list', params)

