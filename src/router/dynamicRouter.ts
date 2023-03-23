import type { RouteRecordRaw } from 'vue-router'

const dynamicRouter: Array<RouteRecordRaw> = [
  {
    path: '/componentsPackage',
    children: [
      {
        path: '/componentsPackage/iconPick',
        component: () => import('@/pages/componentsPackage/iconPick/index.vue')
      }
    ]
  },
  {
    path: '/my-directive',
    component: () => import('@/pages/myDirective/index.vue')
  },
  {
    path: '/tools',
    component: () => import('@/pages/tools/index.vue')
  },
  {
    path: '/test',
    component: () => import('@/pages/test/index.vue')
  },
  {
    path: '/permissions',
    component: () => import('@/pages/permissions/index.vue')
  },
  {
    //图表相关
    path: '/chart',
    component: () => import('@/pages/myCharts/index.vue'),
    meta: { title: '图表', icon: 'i-ic-outline-stream' },
    children: [
      {
        path: '/chart/echarts',
        name: 'echarts',
        component: () => import('@/pages/myCharts/basicEchart/index.vue'),
        meta: { title: 'echarts图表' }
      },
      {
        path: '/chart/chinaMap',
        name: 'chinaMap',
        component: () => import('@/pages/myCharts/chinaMap/index.vue'),
        meta: { title: '中国地图' }
      },
      {
        path: '/chart/gaodeMap',
        name: 'gaodeMap',
        component: () => import('@/pages/myCharts/gaodeMap/index.vue'),
        meta: { title: '高德地图' }
      },
      {
        path: '/chart/baiduMap',
        name: 'baiduMap',
        component: () => import('@/pages/myCharts/baiduMap/index.vue'),
        meta: { title: '百度地图' }
      }
    ]
  },
  //常用功能
  {
    path: '/commonComponents',
    component: () => import('@/pages/commonComponents/index.vue'),
    meta: { title: '常用功能', icon: 'i-ic-baseline-functions' },
    children: [
      {
        path: '/commonComponents/upload-dowload',
        name: 'upload-dowload',
        component: () => import('@/pages/commonComponents/uploadDowload/index.vue'),
        meta: { title: '上传/下载' }
      },
      {
        path: '/commonComponents/verify',
        name: 'verify',
        component: () => import('@/pages/commonComponents/verify/index.vue'),
        meta: { title: '验证码' }
      },
      {
        path: '/commonComponents/header-photo',
        name: 'header-photo',
        component: () => import('@/pages/commonComponents/header-photo/index.vue'),
        meta: { title: '头像上传' }
      },
      {
        path: '/commonComponents/curd',
        component: () => import('@/pages/commonComponents/curd/index.vue'),
        meta: { title: '基本表单' }
      },
      {
        path: '/commonComponents/waterfall',
        component: () => import('@/pages/commonComponents/waterfallFlow/index.vue'),
        meta: { title: '基本表单' }
      }
    ]
  },
  //系统管理
  {
    path: '/system',
    // meta: { title: "系统管理", icon: 'baseline-border-clear' },
    meta: { title: '系统管理', icon: 'i-ic-round-settings-applications' },
    children: [
      {
        path: '/system/user',
        name: 'user',
        component: () => import('@/pages/system/user/index.vue'),
        meta: { title: '用户管理' }
      },
      {
        path: '/system/role',
        name: 'role',
        component: () => import('@/pages/system/role/index.vue'),
        meta: { title: '角色管理' }
      },
      {
        path: '/system/menu',
        name: 'menu',
        component: () => import('@/pages/system/menu/index.vue'),
        meta: { title: '菜单管理' }
      }
    ]
  },
  //引导页面
  {
    path: '/guidance',
    name: 'guidance',
    component: () => import('@/pages/guidance/index.vue')
  },
  {
    path: '/excel',
    // meta: { title: "系统管理", icon: 'baseline-border-clear' },
    meta: { title: 'Excel', icon: 'i-ic-round-settings-applications' },
    children: [
      {
        path: '/excel/export',
        name: 'export',
        component: () => import('@/pages/excel/export/index.vue'),
        meta: { title: '导出excel表格' }
      },
      {
        path: '/excel/import',
        name: 'import',
        component: () => import('@/pages/excel/import/index.vue'),
        meta: { title: '导入excel表格' }
      }
    ]
  }
]

export { dynamicRouter }
