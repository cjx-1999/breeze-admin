<template>
    <div class="box">
        <div>
            <h1>404</h1>
            <el-link>找不到页面了！！！！！</el-link><br />
            <el-link>找不到页面了！！！！！</el-link><br />
            <el-link>找不到页面了！！！！！</el-link><br />
            <router-link to="/">返回首页</router-link>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { ref, reactive } from 'vue'

</script>
<style scoped lang="scss">
.box {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ccc;
    z-index: 9;
    position: fixed;
    top: 0;

    div {
        text-align: center;
    }

    h1 {
        font-size: 100px;
    }
}
</style>
