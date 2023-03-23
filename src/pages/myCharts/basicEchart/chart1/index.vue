<template>
    <el-card>
        <echart id="chart1" :option="option"></echart>
    </el-card>
</template>
<script setup lang='ts'>
import echart from '@/components/echart/index.vue';
import { option1_1 } from '../chartOption'
type EChartsOption = echarts.EChartsOption;
const option: EChartsOption = option1_1;

</script>
<style scoped lang='scss'>

</style>