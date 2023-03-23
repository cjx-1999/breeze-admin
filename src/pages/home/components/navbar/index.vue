<template>
  <div class="nav-wrapper">
    <div class="bar-title" @click.stop="$router.replace('/home')">Breeze数据分析系统</div>
    <div class="menu line-b2" @click="goSystem"><span>进入后台</span></div>
    <div class="time">{{ date }} {{ time }}</div>
    <div class="quitLogin line-b2" @click="$router.push('/login')"><span>退出</span></div>
    <div class="mapChoose" v-if="parentInfo.length > 1">
      <el-tooltip content="返回上一级" placement="bottom">
        <span class="location inline-block" @click="backAll">中国</span>
      </el-tooltip>
      <span class="location inline-block" @click="backAll" v-if="parentInfo.length > 3">{{
        parentInfo[parentInfo.length - 3].cityName
      }}</span>
      <span class="location inline-block" @click="backAll" v-if="parentInfo.length > 2">{{
        parentInfo[parentInfo.length - 2].cityName
      }}</span>
      <span class="location inline-block">{{ parentInfo[parentInfo.length - 1].cityName }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getDate, getTime } from '@/utils/date'
import { tabStore } from '@/stores/tabs'
import type { Router } from 'vue-router'
import { homeStore } from '@/stores/home'
const homeS = homeStore()
const { parentInfo, abcode } = toRefs(homeS)
const router = inject<Router>('router')
const store = tabStore()
let date = ref<string>(getDate())
let time = ref<string>(getTime())
onMounted(() => {
  setInterval(() => {
    date.value = getDate()
    time.value = getTime()
  }, 1000)
})
function backAll() {
  homeS.removeInfo(parentInfo.value.length - 1)
}
function goSystem() {
  const route = { routerPath: '/guidance', title: '引导页' }
  store.$patch({ currentTab: route.routerPath, currentMenu: route.title })
  store.addTab(route)
  router?.push('/guidance')
}
</script>

<style lang="scss" scoped>
.nav-wrapper {
  height: 65px;
  line-height: 50px;
  width: 100%;
  background: url('@/assets/image/nav.png') no-repeat;
  background-size: 100% 100%;
  text-align: center;
  position: relative;
  color: #b3efff;

  .bar-title {
    font-size: 1.23rem;
    font-family: '黑体';
    cursor: pointer;
  }

  .time {
    position: absolute;
    right: 8%;
    top: 50%;
    transform: translateY(-35%);
    font-family: 'Time Number';
    font-weight: bold;
    font-size: 1rem;
  }

  .location {
    font-weight: bold;
    font-size: 0.8rem;
    margin: 0 3px;
    font-family: 'Time Number';
    color: #b3efff;
    box-sizing: border-box;
    cursor: pointer;
  }

  .menu {
    position: absolute;
    right: 23.5%;
    vertical-align: middle;
    top: 50%;
    transform: translateY(-35%);
    cursor: pointer;
    font-family: 'Time Number';
    font-weight: bold;
    font-size: 1rem;
  }

  .quitLogin {
    @extend .menu;
    right: 3.5%;
  }

  .mapChoose {
    position: absolute;
    left: 10px;
    bottom: -5px;
    color: #eee;

    .title {
      padding: 4px;
      border-top: 1px solid rgba(147, 235, 248, 0.8);
      border-bottom: 1px solid rgba(147, 235, 248, 0.8);
      cursor: pointer;
      font-size: 14px;
    }

    .icon {
      font-family: 'simsun';
      font-size: 25px;
      margin: 0 11px;
    }
  }
}
</style>
