<template>
  <div class="box">
    <el-scrollbar ref="scrollbarRef">
      <div class="tabs">
        <div
          :id="`tab-${i}`"
          v-for="(v, i) in tabList"
          :key="v.routerPath"
          @click="changePage(v, i)"
        >
          <div class="tab" :class="{ 'tab-active': store.currentTab === v.routerPath }">
            <span class="title">{{ v.title }}</span>
            <span
              class="close"
              v-show="store.currentTab === v.routerPath"
              @click="removeTab(v.routerPath)"
              ><SvgIcon name="ele-Close" size="20px"></SvgIcon
            ></span>
          </div>
          <!-- <span v-show="i === 0" class="glider glider-move"></span> -->
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import { tabStore } from '@/stores/tabs'
import type { tabs } from '@/stores/type'
import type { ElScrollbar } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = tabStore()
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
let moveX = ref<string>()

let currentTab = toRef(store, 'currentTab')
let tabList = toRef(store, 'tabList')

const changePage = (tab: tabs, index: number) => {
  const path: string = tab.routerPath
  store.$patch(() => {
    store.$state.currentTab = path
    store.$state.currentMenu = tab.title
  })
  router.push({
    path
  })
}
const removeTab = (name: any) => {
  store.removeTab(name)
}
let _left = ref<string>('0')
watch(
  currentTab,
  (newVal) => {
    let index = store.tabList.findIndex((v) => v.routerPath == newVal)
    index = index == -1 ? 0 : index
    const el = document.getElementById(`tab-${index}`)
    const left = el?.getBoundingClientRect().left
    // moveX.value = `translateX(calc(${index} * (100% + 0.3rem)))`
    moveX.value = `translateX(calc(${left}px))`
    const cWidth = document.querySelector('.tabs')?.clientWidth
    if (cWidth && left && left > cWidth) {
      cWidth && scrollbarRef.value?.setScrollLeft(left - cWidth + 117 * 2)
    }
  },
  { immediate: true }
)
// watch(
//   tabList,
//   (newVal) => {
//     myTabList.value = newVal.reverse()
//   },
//   { immediate: true }
// )
</script>
<style lang="scss" scoped>
$primary-color: var(--el-color-primary);
$close-color: rgba(52, 58, 64, 1);
$secondary-color: var(--el-color-primary);

.box {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  position: relative;
  left: 0;
}

.tabs {
  display: flex;
  width: 100%;
  height: 100%;
  // position: absolute;
  padding: 0.1rem;
  margin-bottom: 0.1rem;
  // left: v-bind(_left);
}

.tab {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 30px;
  width: 100px;
  font-size: 0.78rem;
  font-weight: 500;
  border: 0.1rem solid $primary-color;
  border-radius: 99px;
  margin-right: 0.3rem;
  cursor: pointer;
  position: relative;
  color: $primary-color;
  transition: color 0.15s ease-in;
  .title {
    display: block;
  }
}
.tab-active {
  color: #fff;
  background-color: $secondary-color;
}

.close {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  transform: translate(0, 33%);
  right: 5%;
  background-color: $close-color;
  color: #fff;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  transition: 0.15s ease-in;
  opacity: 0.5;
  &:hover {
    opacity: 0.8;
  }
}

.glider-move {
  transform: v-bind(moveX);
}

.glider {
  position: absolute;
  top: 0.1rem;
  height: 35px;
  width: 117px;
  background-color: $secondary-color;
  z-index: -1;
  border-radius: 99px;
  transition: 0.25s ease-out;
}
</style>
