<template>
  <el-scrollbar height="100vh" class="left-side">
    <el-menu
      :default-active="store.currentMenu"
      :router="true"
      class="el-menu-verticale"
      :collapse="common.isExpand"
      @select="menuSelect"
      text-color="#fff"
    >
      <el-menu-item route="/home" index="logo" id="logo">
        <el-icon>
          <SvgIcon name="rabbit" size="40"></SvgIcon>
        </el-icon>
        <template #title>
          <span mx-2 class="text-2xl font-bold ml-4" style="color: var(--el-color-primary)"
            >BREEZE</span
          >
        </template>
      </el-menu-item>
      <el-menu-item route="/home" index="首页">
        <el-icon size="20px">
          <!-- <House /> -->
          <div i-ic-sharp-home></div>
        </el-icon>
        <template #title>首页</template>
      </el-menu-item>
      <!-- 遍历多级菜单 -->
      <TreeMenu :data="routerList"></TreeMenu>
    </el-menu>
    <footer class="footer"><span>版本号： V1.0</span></footer>
  </el-scrollbar>
</template>
<script setup lang="ts">
import { tabStore } from '@/stores/tabs'
import { useWindowSize } from '@vueuse/core'
import TreeMenu from '@/components/treeMenu/index.vue'
import { commonStore } from '@/stores/common'

import { changeRootVar } from '@/utils/tools'
import type { Menu } from '@/stores/type'
let { menuList, changExpand } = commonStore()
let common = commonStore()
let routerList: Menu[] = menuList
const { width, height } = useWindowSize()
const store = tabStore()
let wd = ref<string>('200px')

watch(width, (val) => {
  if (width.value < 1000) {
    changExpand(true)
  } else {
    changExpand(false)
  }
})
const menuSelect = (...any: any) => {
  const item = any[2]
  if (item.index != 'logo') {
    store.addTab({ routerPath: item.route, title: item.index })
  }
  store.$patch({ currentTab: item.route, currentMenu: item.index })
}

if (common.isExpand) {
  wd.value = 'auto'
} else {
  wd.value = '200px'
}
</script>
<style scoped lang="scss">
:deep(.el-menu) {
  border-right: 0 !important;
}

.el-menu-item,
.el-sub-menu {
  width: v-bind(wd) !important;
}
.left-side {
  position: relative;
  .footer {
    position: absolute;
    visibility: visible;
    left: 20%;
    bottom: 10%;
    opacity: 0.6;
    color: #fff;
    &:hover {
      opacity: 1;
    }
  }
}
</style>
