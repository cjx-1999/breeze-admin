<template>
  <div class="h-50px w-100%">
    <!-- <el-tabs
      v-model="store.currentTab"
      type="card"
      closable
      class="demo-tabs"
      @tab-click="changePage"
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="item in store?.tabList"
        :key="item.title"
        :label="item.title"
        :name="item.routerPath"
      >
      </el-tab-pane>
    </el-tabs> -->
    <CTabs></CTabs>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { tabStore } from '@/stores/tabs'
import { commonStore } from '@/stores/common'
import CTabs from '@/components/cTabs/index.vue'
const { getDrak } = commonStore()
const store = tabStore()
const router = useRouter()

const bg = ref<string>('')
watch(getDrak(), (val) => {
  bg.value = val ? '#33333333' : '#fff'
})
</script>
<style scoped lang="scss">
:deep(.el-tabs__header) {
  margin-bottom: 0 !important;
  overflow: hidden;
  height: 40px !important;
}

:deep(.el-tabs__nav-scroll) {
  background-color: v-bind(bg) !important;
  height: 40px !important;
}

:deep(.el-tabs__header) {
  // border: 0 !important;
}

:deep(.el-tabs__nav) {
  // border: 0 !important;
  padding: 5px 0 0 5px;
}

:deep(.is-icon-close) {
  width: 14px !important;
  color: var(--el-text-color-primary);
  // color: #000111 !important;
}

:deep(.el-tabs__item) {
  // color: #262626 !important;
  // background-color: #a8a29e !important;
  height: 30px !important;
  line-height: 30px;

  // margin-right: 3px;
  // border: 0 !important;

  &:nth-child(1) {
    & .is-icon-close {
      width: 0 !important;
      height: 0 !important;
    }
  }

  & .is-icon-close {
    right: 2px !important;
  }

  &.is-active {
    // border: 0 !important;
    // color: #a8a29e !important;
    // background-color: #404040 !important;
  }

  &:hover {
    left: 0 !important;
  }
}
</style>
