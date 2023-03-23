<template>
    <div class="chart-wrapper" ref="liquidChart"></div>
</template>

<script lang="ts" setup>
// import * as echarts from 'echarts'
import 'echarts-liquidfill'
import { debounce } from "@/utils/index";
import { selectYearValue } from "@/api/mock/mockChart";
import { homeStore } from "@/stores/home";
import type { Router } from "vue-router";

const store = homeStore();
const echarts = inject<any>('echarts')
const router = inject<Router>('router')

const liquidChart = ref<HTMLElement | null>(null);
let myChart = ref<any>(null);

const resizeHandler = debounce(() => {
    if (myChart) {
        myChart.resize();
    }
}, 200);

onMounted(() => {
    getChartData();
    window.addEventListener("resize", resizeHandler);
});
onBeforeUnmount(() => {
    window.removeEventListener("resize", resizeHandler);
});

//模拟接口，获取echarts数据
const getChartData = async () => {
    const data = await selectYearValue({
        year: store.year,
    });

    initEcharts(data.value);
};

//渲染echarts图
const initEcharts = (data: string) => {
    myChart = echarts.init(liquidChart.value as HTMLElement);
    myChart.setOption(
        {
            series: [
                {
                    type: "liquidFill",
                    radius: "85%",
                    center: ["50%", "45%"],
                    data: [0.48, 0.48, 0.48, 0.48],
                    backgroundStyle: {
                        color: {
                            type: "linear",
                            x: 1,
                            y: 0,
                            x2: 0.5,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 1,
                                    color: "rgba(68, 145, 253, 0.55)",
                                },
                                {
                                    offset: 0.5,
                                    color: "rgba(68, 145, 253, 0.65)",
                                },
                                {
                                    offset: 0,
                                    color: "rgba(68, 145, 253, 1)",
                                },
                            ],
                            globalCoord: false,
                        },
                    },
                    outline: {
                        borderDistance: 0,
                        itemStyle: {
                            borderWidth: 5,
                            borderColor: {
                                type: "linear",
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: "rgba(53,142,215, 0)",
                                    },
                                    {
                                        offset: 0.5,
                                        color: "rgba(53,142,215, 0.45)",
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(53,142,215, 0.9)",
                                    },
                                ],
                                globalCoord: false,
                            },
                            shadowBlur: 10,
                            shadowColor: "rgba(53,142,215, 0.9)",
                        },
                    },
                    label: {
                        normal: {
                            formatter: data + "万",
                            textStyle: {
                                fontSize: 18,
                            },
                        },
                    },
                },
            ],
        },
        true
    );

    myChart.off("click");
    myChart.on("click", () => {
        router?.push("/home/more");
    });
};

watch(
    () => store.year,
    (nl, ol) => {
        getChartData();
    }
);

watch(
    store.parentInfo,
    (nl, ol) => {
        getChartData();
    },
    { deep: true }
);

</script>
  

<!-- <template>
    <div id="container" class="liquidfill-container"></div>
</template>

<script lang="ts" setup>
import * as  Echarts from 'echarts'
import 'echarts-liquidfill'

onMounted(() => {
    const data = [0.68] // 显示一个波浪
    const dom = document.getElementById('container')
    const chart = Echarts.init(dom)
    chart.setOption({
        series: [{
            type: 'liquidFill',
            data: data
        }]
    })
})

</script>

<style lang="scss" scoped>
.liquidfill-container {
    width: 100%;
    height: 100%;
}
</style> -->