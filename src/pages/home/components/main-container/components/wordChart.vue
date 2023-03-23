<template>
    <div class="chart-wrapper" ref="wordChart"></div>
</template>

<script lang="ts" setup>
import "echarts-wordcloud";
import { debounce } from "@/utils/index";
import { selectWordData } from "@/api/mock/mockChart";
import { homeStore } from "@/stores/home";
import type { Router } from "vue-router";
const store = homeStore();
const echarts = inject<any>('echarts')
const router = inject<Router>('router')

const wordChart = ref(null);
let myChart = ref<any>(null);

const resizeHandler = debounce(() => {
    if (myChart) {
        myChart.resize();
    }
}, 200);

onMounted(() => {
    getWordData();
    window.addEventListener("resize", resizeHandler);
});
onBeforeUnmount(() => {
    window.removeEventListener("resize", resizeHandler);
});

//模拟接口，获取echarts数据
const getWordData = async () => {
    const data = await selectWordData({
        abcode: store.abcode,
        year: store.year
    });
    initEcharts(data);
};

// //渲染echarts图
const initEcharts = (data: string | any[]) => {
    // const colorList = ["#28CAD8", "#E5A214", "#01D2D1", "#F69F73", "#39E569"];
    const colorList = ["#28CAD8", "#684298", "#01D2D1", "#97ad45", "#39E569"];
    myChart = echarts.init(wordChart.value);
    myChart.setOption(
        {
            title: {
                show: data.length === 0,
                top: "center",
                left: "center",
                text: "暂无数据",
                textStyle: {
                    color: "rgb(179, 239, 255)",
                    fontSize: 12,
                },
            },
            tooltip: {
                trigger: "item",
                formatter: "销量 <br/>{b} : {c} 万",
                textStyle: {
                    fontSize: 12,
                },
            },
            toolbox: {
                feature: {
                    dataView: {
                        show: false,
                    },
                    magicType: {
                        show: false,
                    },
                    restore: {
                        show: false,
                    },
                    saveAsImage: {
                        show: true,
                        name: store.year + "销售品牌",
                        pixelRatio: 2,
                    },
                },
                iconStyle: {
                    normal: {
                        borderColor: "#1990DA",
                    },
                },
                top: 0,
                right: 5,
            },
            series: [
                {
                    type: "wordCloud",
                    sizeRange: [12, 26],
                    rotationRange: [0, 0],
                    textStyle: {
                        color: () => {
                            return colorList[
                                Math.floor(Math.random() * colorList.length)
                            ];
                        }
                    },
                    data: data,
                },
            ],
        },
        true
    );

    myChart.off("click");
    myChart.on("click", () => {
        router?.push("/more");
    });
};

watch(
    () => store.year,
    (nl, ol) => {
        getWordData();
    }
);

watch(
    store.parentInfo,
    (nl, ol) => {
        getWordData();
    },
    { deep: true }
);

</script>
