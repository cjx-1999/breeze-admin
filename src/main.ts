import { createApp } from 'vue'
import store from './stores'
import App from './App.vue'
//自定义指令
import registerDirective from './hooks/registerDirective'
import 'animate.css'
import 'uno.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style/element/index.scss' //自定义css文件
import './style/main.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'virtual:svg-icons-register'
//全局事件总线
import mitt from 'mitt'
const myMitt = mitt() //事件总线
//全局组件
import SvgIcon from './components/svgIcon/index.vue'
import router from './router'
// 由于必须要拓展ComponentCustomProperties类型才能获得类型提示
declare module 'vue' {
  export interface ComponentCustomProperties {
    $Bus: typeof myMitt
  }
}

//粒子动画库
import Particles from 'vue3-particles'
const app = createApp(App)
//饿了么图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.component('SvgIcon', SvgIcon)
app.use(Particles as any)
app.use(ElementPlus)
app.use(router)
app.use(store)
app.config.globalProperties.$Bus = myMitt
//指令函数需要在挂载之前使用
registerDirective(app) //注册所有自定义指令
app.mount('#app')

/**
 * 测试环境下 引入自定义的mockRequest
 * 因为mockRequest不是默认导出的：export default{}
 * 所以引入时需要加大括号，这种可以引入多个
 */
import { mockRequest } from '../mock'

if (import.meta.env.VITE_MODE === 'development') {
  mockRequest()
}
//自定义组件库
import setIntroduction from '@/utils/setIconfont' //图标资源文件
// 设置批量第三方 icon 图标
setIntroduction.cssCdn()
// 设置批量第三方 js
setIntroduction.jsCdn()
