import { getStorage } from '@/hooks'
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  type RouteRecordRaw
} from 'vue-router'
import { dynamicRouter } from './dynamicRouter'
import layout from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'home',
    redirect: '/home/main',
    meta: {
      title: '首页',
      icon: 'home'
    },
    component: () => import('@/pages/home/home.vue'),
    children: [
      {
        path: '/home/main',
        name: 'main',
        component: () => import('@/pages/home/components/main-container/index.vue')
      },
      {
        path: '/home/more',
        name: 'more',
        component: () => import('@/pages/home/components/more/index.vue')
      }
    ]
  },
  {
    path: '/',
    redirect: 'home',
    component: layout,
    children: [...dynamicRouter]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: '/404',
    component: () => import('@/pages/404/index.vue')
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/pages/403/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = getStorage('token')
  if (!token && to.path != '/login') {
    router.replace('/login')
  } else {
    next()
  }
  next()
})

export default router
