<template>
    <el-card>
        <echart id="chart3" :option="option"></echart>
    </el-card>
</template>
<script setup lang='ts'>
import echart from '@/components/echart/index.vue';
import { option3 } from '../chartOption'
type EChartsOption = echarts.EChartsOption;
const option: EChartsOption = option3;

</script>
<style scoped lang='scss'>

</style>