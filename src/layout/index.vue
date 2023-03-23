<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto">
        <LeftSide></LeftSide>
      </el-aside>
      <el-container>
        <el-header height="40px">
          <TopHeaderVue></TopHeaderVue>
        </el-header>
        <el-header height="40px">
          <Tabs class="tabs"></Tabs>
        </el-header>
        <el-main>
          <Container class="scroll-container"></Container>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import LeftSide from './leftSide/index.vue'
import TopHeaderVue from './topHeader/index.vue'
import Tabs from './tabs/index.vue'
import Container from './container/index.vue'
import { commonStore } from '@/stores/common'
const { getDrak } = commonStore()
let bg = ref('#e7e5e4')

watch(
  getDrak(),
  (val) => {
    bg.value = val ? '#33333333' : '#f8f8f8'
  },
  { immediate: true }
)
</script>
<style scoped lang="scss">
.el-header {
  padding: 0;
}

.el-main {
  padding: 10px;
  background-color: v-bind(bg) !important;
}

.scroll-container {
  overflow-y: auto;
  width: 100%;
  // overflow: hidden;
  height: calc(100vh - 80px);
}
</style>
