<template>
  <div>
    <div v-loading></div>
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import { useDark } from '@vueuse/core'
import { getCurrentInstance } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import _ from 'lodash'
import { provide } from 'vue'

const instance = getCurrentInstance()
const isDark = useDark({
  valueDark: 'dark',
  valueLight: 'light'
})
provide('echarts', echarts)
provide('isDark', isDark)
provide('proxy', instance?.proxy)
provide('router', useRouter())
provide('route', useRoute())
provide('_', _)
</script>

<style scoped></style>
