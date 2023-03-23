<template>
  <component
    v-for="item in data"
    :route="item.path"
    :index="String(item.menuname)"
    :is="item.children != undefined ? 'el-sub-menu' : 'el-menu-item'"
  >
    <el-icon v-if="item?.icon && item.children == undefined">
      <SvgIcon :name="item?.icon"></SvgIcon>
    </el-icon>
    <template #title>
      <el-icon v-if="item?.icon && item.children != undefined" size="20px">
        <SvgIcon :name="item?.icon"></SvgIcon>
      </el-icon>
      <span>{{ item.menuname }}</span>
    </template>
    <TreeMenu
      @tree-nodeClick="treeClick"
      v-if="JSON.stringify(item.children) !== '[]'"
      :data="item.children"
    >
    </TreeMenu>
  </component>
</template>
<script lang="ts" setup>
import type { Menu } from '@/stores/type'
import TreeMenu from '@/components/treeMenu/index.vue'

type props = {
  data?: Menu[]
}

const emit = defineEmits(['tree-nodeClick'])
const treeClick = (treeList: Menu) => {
  emit('tree-nodeClick', treeList)
}

defineProps<props>()
</script>
<style scoped></style>
