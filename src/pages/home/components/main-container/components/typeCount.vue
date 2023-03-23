<template>
    <div class="chart-wrapper" ref="typeCount"></div>
</template>

<script lang="ts" setup>
import { debounce } from "@/utils/index";
import { selectTypeData } from "@/api/mock/mockChart";
import { homeStore } from "@/stores/home";
import type { Router } from "vue-router";
const store = homeStore();
const echarts = inject<any>('echarts')
const router = inject<Router>('router')


const typeCount = ref(null);
let myChart = ref<any>(null);

const resizeHandler = debounce(() => {
    if (myChart) {
        myChart.resize();
    }
}, 200);

onMounted(() => {
    getPieData();
    window.addEventListener("resize", resizeHandler);
});
onBeforeUnmount(() => {
    window.removeEventListener("resize", resizeHandler);
});

//模拟接口，获取echarts数据
const getPieData = async () => {
    const data = await selectTypeData({
        abcode: store.abcode,
        year: store.year
    });
    let sum = data.reduce((t: number, c: { value: string; }) => parseFloat(c.value) + t, 0);
    sum = parseFloat(sum.toFixed(2));
    initEcharts(data, sum);
};

// //渲染echarts图
const initEcharts = (data: any[], sum: any) => {
    const colorList = [
        "#0278E6",
        "#6255FE",
        "#00C6FF",
        "#F0960E",
        "#34D160",
        "#87cefa",
        "#da70d6",
        "#32cd32",
        "#6495ed",
        "#9fe6b8",
        "#e7bcf3",
        "#0E7CE2",
        "#FF8352",
        "#E271DE",
        "#4AEAB0",
    ];

    myChart = echarts.init(typeCount.value);
    myChart.setOption(
        {
            color: colorList,
            title: [
                {
                    show: data.length === 0,
                    top: "center",
                    left: "center",
                    text: "暂无数据",
                    textStyle: {
                        color: "rgb(179, 239, 255)",
                        fontSize: 12,
                    },
                },
                {
                    text: sum,
                    left: "33%",
                    top: "center",
                    textStyle: {
                        fontSize: 12,
                        color: "rgb(179, 239, 255)",
                    },
                },
            ],
            tooltip: {
                trigger: "item",
                formatter: "销量 <br/>{b} : {c} ({d}%)",
                textStyle: {
                    fontSize: 12,
                },
            },
            legend: {
                orient: "vertical",
                top: "center",
                type: "scroll",
                right: "7%",
                itemWidth: 15,
                itemHeight: 13,
                pageIconColor: "#fff",
                pageIconSize: 10,
                pageTextStyle: {
                    color: "#fff",
                },
                data: data.map((item: { name: any; }, index: number) => {
                    return {
                        name: item.name,
                        textStyle: {
                            color: colorList[index],
                        },
                    };
                }),
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
                        name: store.year + "年销售种类",
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
                    name: "销售种类",
                    type: "pie",
                    radius: ["45%", "75%"],
                    center: ["40%", "50%"],
                    roseType: "radius",
                    data: data,
                    labelLine: {
                        normal: {
                            length: 0.000000001,
                        },
                    },
                    itemStyle: {
                        normal: {
                            color: function (params: { dataIndex: number; }) {
                                return colorList[params.dataIndex % colorList.length];
                            },
                            label: {
                                color: "#c5c6c9",
                                show: true,
                                formatter: "{d}%",
                            },
                        },
                    },
                },
            ],
        },
        true
    );

    myChart.getZr().off("click");
    myChart.getZr().on("click", (params: { offsetX: any; offsetY: any; }) => {
        const pointInPixel = [params.offsetX, params.offsetY];
        if (myChart.containPixel("series", pointInPixel) || data.length === 0) {
            router?.push("/home/more");
        }
    });
};

watch(
    () => store.year,
    (nl, ol) => {
        getPieData();
    }
);
watch(
    store.parentInfo,
    (nl, ol) => {
        getPieData();
    },
    { deep: true }
);

</script>
