<template>
    <el-card>
        <echart id="chart4" :option="option"></echart>
    </el-card>
</template>
<script setup lang='ts'>
import echart from '@/components/echart/index.vue';
import { option4 } from '../chartOption'
type EChartsOption = echarts.EChartsOption;
const option: EChartsOption = option4;

</script>
<style scoped lang='scss'>

</style>