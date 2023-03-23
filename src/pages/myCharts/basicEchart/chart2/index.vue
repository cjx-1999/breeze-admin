<template>
    <el-card>
        <echart id="chart2" :option="option"></echart>
    </el-card>
</template>
<script setup lang='ts'>
import echart from '@/components/echart/index.vue';
import { option2 } from '../chartOption'
type EChartsOption = echarts.EChartsOption;
const option: EChartsOption = option2;

</script>
<style scoped lang='scss'>

</style>