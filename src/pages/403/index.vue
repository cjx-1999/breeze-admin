<template>
    <div class="box">
        <div>
            <h1>403</h1>
            <el-link>你没有访问权限！！！</el-link><br />
            <el-link ml-10>你没有访问权限！！！</el-link><br />
            <el-link ml-20>你没有访问权限！！！</el-link><br />
            <el-link mt-2 ml-30 @click="$router.replace(currentTab)">返回上一页</el-link>
        </div>
    </div>
</template>
<script setup lang='ts'>
import type { Router } from 'vue-router';
import { tabStore } from '@/stores/tabs'
const { currentTab } = tabStore()

</script>
<style scoped lang="scss">
.box {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    // background: #ccc;
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
