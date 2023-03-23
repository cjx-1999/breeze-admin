<template>
  <el-menu
    class="el-menu-demo dark:bg-[#404040] light:bg-[#f0f0f0]"
    :ellipsis="false"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item id="unfold-box">
      <el-icon>
        <el-tooltip content="收起" placement="right" v-if="!store.isExpand">
          <Fold color="var(--el-color-primary)" @click="changExpand(true)" />
        </el-tooltip>
        <el-tooltip content="展开" placement="right" v-else>
          <Expand color="var(--el-color-primary)" @click="changExpand(false)" />
        </el-tooltip>
      </el-icon>
    </el-menu-item>
    <el-menu-item id="switch-box">
      <SwitchIcon v-model:location="location"></SwitchIcon>
    </el-menu-item>
    <div class="grow" />
    <el-menu-item>
      <el-icon size="25px" ml-2>
        <el-tooltip content="全屏" placement="bottom" v-if="!isFullscreen">
          <div
            class="i-ic-sharp-fullscreen"
            v-fullscreen="isFullscreen"
            @click="changeFullScreen"
            style="color: var(--el-color-primary)"
          ></div>
        </el-tooltip>
        <el-tooltip content="退出全屏" placement="bottom" v-else>
          <div
            class="i-ic-sharp-fullscreen-exit"
            v-fullscreen="isFullscreen"
            @click="changeFullScreen"
            style="color: var(--el-color-primary)"
          ></div>
        </el-tooltip>
      </el-icon>
      <el-avatar w-20px h-20px flex>
        <template #default>
          <SvgIcon name="rabbit" size="25"></SvgIcon>
        </template>
      </el-avatar>
      <span mr-4 class="text-size-11px ml-2"
        >用户名:<span class="font-900">{{ userInfo.username }}</span></span
      >
      <el-button size="small" @click="register" type="primary">注册</el-button>
      <el-button v-show="loginState" size="small" @click="output" type="primary">退出</el-button>
    </el-menu-item>
  </el-menu>
</template>
<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import SwitchIcon from '@/components/switchBtn/index.vue'
import { commonStore } from '@/stores/common'
import type { Router } from 'vue-router'

const isFullscreen = ref<boolean>(false)
function changeFullScreen() {
  // 判断全屏状态的变量
  isFullscreen.value = !isFullscreen.value
}

let store = commonStore()
let { changExpand } = commonStore()
const userInfo = store.$state.userInfo
const router = inject<Router>('router')
const instance = getCurrentInstance()
// let back_color = ref<string>('#e7e5e4')
let location = ref<string>('')
const loginState = ref(true)

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const register = () => {
  store.$patch({ cardShow: false })
  router?.replace('/login')
}
const output = () => {
  store.$patch({ cardShow: true })
  sessionStorage.removeItem('Authorization')
  router?.replace('/login')
}
</script>
<style scoped lang="scss">
@import '@/style/var.scss';

.el-avatar--circle {
  width: 29px;
  height: 29px;
}

.el-menu-item {
  &:hover {
    color: $active_color !important;
    background-color: $hover_bg !important;
  }

  &.is-active {
    color: $active_color !important;
    background-color: transparent !important;

    &::before {
      border: 0 !important;
    }

    &:hover {
      color: $active_color !important;
      background-color: transparent !important;
    }
  }
}

.el-menu-demo {
  // background: v-bind(back_color);
  height: 40px;

  .el-sub-menu,
  .el-menu-item {
    border: 0 !important;
  }

  .el-menu-item:nth-child(1) {
    &.is-active {
      background-color: transparent !important;
    }
  }

  :deep(.el-sub-menu__title) {
    border: 0 !important;
  }

  .el-menu-item.is-active,
  .el-sub-menu__title.is-active {
    border-bottom: 0 !important;
  }
}
</style>
