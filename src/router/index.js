import Vue from 'vue'
import Router from 'vue-router'

const Product = () => import('../views/product/index.vue')
Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: resolve => require(['@/views/admin'], resolve),
      redirect: 'home',
      children: [
        {
          path: 'home',
          component: resolve => require(['@/views/home'], resolve)
        },
        {
          path: 'user',
          component: resolve => require(['@/views/user'], resolve)
        },
        {
          path: 'role',
          component: resolve => require(['@/views/role'], resolve)
        },
        {
          path: 'category',
          component: resolve => require(['@/views/category'], resolve)
        },
        {
          path: 'product',
          component: resolve => require(['@/views/product'], resolve),
        },
        {
          path: 'product/saveupdate',
          component: resolve => require(['@/views/saveUpdate'], resolve)
        }
      ]
    }
  ]
})

export default router
