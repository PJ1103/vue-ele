import Vue from 'vue'
import Router from 'vue-router'

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
          redirect: '/product/index',
          children: [
            { path: 'index', component: resolve => require(['@/views/product/Index/index'], resolve) }
          ]
        }
      ]
    }
  ]
})

export default router
