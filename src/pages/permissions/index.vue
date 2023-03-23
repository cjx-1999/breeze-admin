<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <el-alert type="success" effect="light" :closable="false">
        <template #title>
          admin是超级管理员,没有权限限制。<br /><br />
          其他用户的菜单会根据自身的角色获取菜单。<br /><br />
          拥有root角色的用户可以分配用户的菜单和角色,没有该角色无法进行分配。
        </template>
      </el-alert>
      <br />
      <span>当前用户：{{ store.userInfo.username }}</span
      ><br />
      <span>用户角色：{{ role }}</span
      ><br />
      <!-- <el-button mt-2 type="primary" size="default" @click="changeUser">切换用户为cjx</el-button>
            <el-button mt-2 type="primary" size="default" @click="">重置</el-button> -->
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { commonStore } from '@/stores/common'
let store = commonStore()
const role = store.getRole('role', store.userInfo)

const loginForm = reactive({
  username: 'cjx',
  password: '123456',
  code: '',
  phone: ''
})
</script>
<style lang="scss"></style>
