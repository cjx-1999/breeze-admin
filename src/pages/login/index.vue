<template>
  <div class="h-100% h-100vh flex justify-center items-center">
    <el-card
      v-show="store.cardShow == true"
      w-350px
      pr-3
      class="animate__animated animate__flipInY"
    >
      <el-header
        bg-gradient-to-r
        from-indigo-500
        via-purple-500
        to-pink-500
        class="text text-center text-size-1.5rem"
        ><span>登录</span></el-header
      >
      <el-form label-width="70px" :model="loginForm">
        <el-form-item label="账号" :required="true">
          <el-input v-model="loginForm.username" />
        </el-form-item>
        <el-form-item label="密码" :required="true">
          <el-input type="password" v-model="loginForm.password" show-password />
        </el-form-item>
        <!-- <el-form-item label="验证码" v-if="codeShow" :required="true">
          <div style="display: flex">
            <el-input v-model="loginForm.code" />
            <img @click="resetCode" :src="codeUrl" alt="" />
          </div>
        </el-form-item> -->
      </el-form>
      <div class="flex justify-end">
        <el-button type="primary" @click="submit">登录</el-button>
        <el-link class="ml-2" @click="store.$patch({ cardShow: false })"
          >还没有账户？去注册</el-link
        >
      </div>
    </el-card>
    <el-card v-show="store.cardShow == false" pr-4 class="animate__animated animate__flipInY">
      <el-header
        bg-gradient-to-r
        from-indigo-500
        via-purple-500
        to-pink-500
        class="text text-center text-size-1.5rem"
        ><span>注册</span></el-header
      >
      <el-form
        :rules="rulesRegister"
        label-width="70px"
        :model="registerForm"
        style="max-width: 460px"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model.trim="registerForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            placeholder="密码6到8位"
            v-model.trim="registerForm.password"
            show-password
          />
        </el-form-item>
        <el-form-item label="密码" prop="password1">
          <el-input
            type="password"
            placeholder="再次输入密码"
            v-model.trim="registerForm.password1"
            show-password
          />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input type="phone" v-model.trim="registerForm.phone" />
        </el-form-item>
      </el-form>
      <div class="flex justify-end">
        <el-button class="" type="primary" @click="register">注册</el-button>
        <el-link class="ml-2" @click="store.$patch({ cardShow: true })">已有账户？去登录</el-link>
      </div>
    </el-card>
    <bg class="z--1"></bg>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, inject } from 'vue'
import type { Router } from 'vue-router'
import { commonStore } from '@/stores/common'
import bg from '@/components/bg/index.vue'
import { baseUrl } from '@/config/baseUrl'
import { ElNotification, type FormRules } from 'element-plus'
import { login, loginCode } from '@/api/mock/login'
import { setStorage } from '@/hooks'

let store = commonStore()
const proxy = inject<any>('proxy')
const router = inject<Router>('router')
const codeUrl = ref<string>(`${baseUrl}/login/code`)
let codeShow = ref(true)
const resetCode = async () => {
  codeUrl.value = codeUrl.value + '?' + Math.random()
}

//手机号验证
let checkPhone = (
  rule: any,
  value: string,
  callback?: (arg0?: Error | undefined) => void
): void | string => {
  let reg = /^1[345789]\d{9}$/
  let msg: string = ''
  if (!reg.test(value)) {
    callback ? callback(new Error('请输入11位手机号')) : (msg = '请输入11位手机号')
  } else {
    callback ? callback() : ''
  }
  return msg
}
//验证与第一次的密码是否相同
let checkPassword = (
  rule: any,
  val: string,
  callback: (error?: string | Error | undefined) => void
) => {
  if (!registerForm.password) {
    callback(new Error('请先输入上一行的密码'))
  } else {
    if (val !== registerForm.password) {
      callback(new Error('两次密码输入不一致,请检查后输入'))
    } else {
      callback()
    }
  }
}

const rulesRegister = reactive<FormRules>({
  username: { type: 'string', message: '用户名不能为空', trigger: 'blur', required: true },
  password: {
    type: 'string',
    min: 6,
    max: 8,
    message: '密码不能小于6位',
    trigger: 'blur',
    required: true
  },
  password1: { type: 'string', validator: checkPassword, trigger: 'blur', required: true },
  phone: { type: 'number', validator: checkPhone, trigger: 'blur' }
})

const loginForm = reactive({
  username: 'admin',
  password: '123456',
  code: '',
  phone: ''
})
const registerForm = reactive({
  username: '',
  password: '',
  password1: '',
  phone: ''
})
const resetFrom = reactive({ ...registerForm })
onMounted(() => {
  if (!store.cardShow) {
    loginForm.username = ''
    loginForm.password = ''
  }
})
//登录
const submit = async () => {
  //模拟数据 百分百有数据 所以这里直接解构
  const { token, userInfo, roleList, menuList } = await login(loginForm)
  store.$patch({
    userInfo,
    roleList,
    menuList
  })
  setStorage('token', token)
  router?.replace('/home')
  ElNotification({
    title: '登录成功',
    message: '欢迎回来！',
    duration: 2000
  })
}

//注册
const register = async () => {
  let msg = checkPhone('', registerForm.phone)
  if (msg) {
    store.message('error', msg)
    return false
  }
  store.message('success', '注册成功啦')
}
</script>

<style scoped>
.el-link {
  font-size: 10px;
}
</style>
