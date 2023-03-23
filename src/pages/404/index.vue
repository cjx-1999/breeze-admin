<template>
  <div class="box">
    <div>
      <h1>404</h1>
      <el-link>找不到页面了！！！！！</el-link>
      <br/>
      <el-link ml-10>找不到页面了！！！！！</el-link>
      <br/>
      <el-link ml-20>找不到页面了！！！！！</el-link>
      <br/>
      <el-link mt-2 ml-30 @click="backHome">返回首页</el-link>
    </div>
  </div>
</template>
<script setup lang='ts'>
import {tabStore} from '@/stores/tabs';
import type {Router} from 'vue-router';

const router = inject<Router>('router')
const store = tabStore()

function backHome() {
  store.$patch({
    currentMenu: '',
    currentTab: ''
  })
  router?.back()
}
</script>
<style scoped lang="scss">
.box {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
  position: fixed;
  top: 0;

  div {
    text-align: center;
  }

  h1 {
    font-size: 120px;
  }
}
</style>
