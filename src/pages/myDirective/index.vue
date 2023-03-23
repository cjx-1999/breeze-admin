<template>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
        <el-alert my-2 title="自定义指令 v-loading" type="success" effect="light" :closable="false"></el-alert>
        <el-button m-2 type="primary" size="default" @click="show = !show">启动/禁用loading</el-button>
        <el-button m-2 type="primary" size="default" @click="show2 = !show2">启动/禁用loading2</el-button>
        <br /><br />
        <div style="width:100px;height:100px;" mx-2 class="inline-block border" v-loading2="{ show: show, style: '1' }">
        </div>
        <div style="width:100px;height:100px;" mx-2 class="inline-block border"
            v-loading2="{ show: show2, style: '2' }">
        </div>
        <el-alert my-2 title="自定义指令 v-copy,借助vueUse实现" type="success" effect="light" :closable="false"></el-alert>
        <el-input style="width:500px" v-model="value" type="text" placeholder="" size="normal" clearable></el-input>
        <el-button m-2 v-copy="value">复制</el-button>
        <el-alert my-2 title="自定义指令 v-fullscreen,实现页面全屏的效果" type="success" effect="light" :closable="false"></el-alert>
        <el-icon size="25px" ml-2>
            <el-tooltip content="全屏" placement="bottom" v-if="!isFullscreen">
                <div class="i-ic-sharp-fullscreen" v-fullscreen="isFullscreen" @click="changeFullScreen"
                    style="color:var(--el-color-primary)">
                </div>
            </el-tooltip>
            <el-tooltip content="退出全屏" placement="bottom" v-else>
                <div class="i-ic-sharp-fullscreen-exit" v-fullscreen="isFullscreen" @click="changeFullScreen"
                    style="color:var(--el-color-primary)"></div>
            </el-tooltip>
        </el-icon>
    </el-card>
</template>
<script setup lang="ts">
const value = ref('')
const show = ref(true)
const show2 = ref(true)
const isFullscreen = ref<Boolean>(false)
function changeFullScreen() {
    isFullscreen.value = !isFullscreen.value
}
</script>
<style lang="scss">

</style>