<template>
    <div :id="id" ref="echar" class="box"
        :style="{ 'width': props.width || '100%', 'height': props.height || '350px' }">
    </div>
</template>
<script setup lang='ts'>
import { onMounted } from 'vue';
import walden from './theme/walden.json';
import dark from './theme/dark.json';
import { useDark } from '@vueuse/core';
const isDark = useDark();
let echarts = inject<any>("echarts")
const proxy = inject<any>('proxy');
echarts.registerTheme('walden', walden) // 注册主题
echarts.registerTheme('dark', dark) // 注册主题
type EChartsOption = echarts.EChartsOption;
type myProps = {
    width?: string | number,
    height?: string | number,
    id: string,
    option: EChartsOption
}
let chart = ref<any>('');
let echar = ref<any>('');
let props = defineProps<myProps>()
let { id, height, option } = props
proxy.$Bus.on('changeDark', (val: any) => {
    initChart(val.value);
})
onMounted(() => {
    initChart(isDark.value);
    window.addEventListener('resize', () => {
        setTimeout(() => {
            chart.resize()
        }, 30)
    })
})
const initChart = ((val?: any) => {
    // const dom = document.getElementById(id) as HTMLElement;
    echarts.init(echar.value).dispose(); //切换主题之前需要对之前的渲染进行清除
    if (val) {
        chart = echarts.init(echar.value, 'dark');
    } else {
        chart = echarts.init(echar.value, 'walden');
    }
    chart.resize();
    chart.setOption(option)
})
watch(
    () => props.width,
    (newVal, oldVal) => {

    },
    { deep: true }
)

defineExpose({ initChart, chart })
</script>
<style scoped lang='scss'>

</style>