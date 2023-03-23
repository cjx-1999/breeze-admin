<template>
  <div>
    <el-card shadow="hover" :body-style="{ padding: '20px' }">
      <IconPick :isShow="iconPickShow" @checkIcon="pickName"></IconPick>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import IconPick from '@/components/iconPick/index.vue'
const iconName = ref<string>('')
let iconPickShow = ref<boolean>(true)
const pickName = (val: string) => {
  iconName.value = val
}
const changeShow = () => {
  iconPickShow.value = !iconPickShow.value
}
</script>
<style lang="scss"></style>
