import * as echarts from 'echarts';
type EChartsOption = echarts.EChartsOption;

//option1
const option1: EChartsOption = {
    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    title: {
        text: 'Gradient Stacked Area Chart'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: 'Line 1',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(128, 255, 165)'
                    },
                    {
                        offset: 1,
                        color: 'rgb(1, 191, 236)'
                    }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: [140, 232, 101, 264, 90, 340, 250]
        },
        {
            name: 'Line 2',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(0, 221, 255)'
                    },
                    {
                        offset: 1,
                        color: 'rgb(77, 119, 255)'
                    }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: [120, 282, 111, 234, 220, 340, 310]
        },
        {
            name: 'Line 3',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(55, 162, 255)'
                    },
                    {
                        offset: 1,
                        color: 'rgb(116, 21, 219)'
                    }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: [320, 132, 201, 334, 190, 130, 220]
        },
        {
            name: 'Line 4',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(255, 0, 135)'
                    },
                    {
                        offset: 1,
                        color: 'rgb(135, 0, 157)'
                    }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: [220, 402, 231, 134, 190, 230, 120]
        },
        {
            name: 'Line 5',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            label: {
                show: true,
                position: 'top'
            },
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(255, 191, 0)'
                    },
                    {
                        offset: 1,
                        color: 'rgb(224, 62, 76)'
                    }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: [220, 302, 181, 234, 210, 290, 150]
        }
    ]
};
//option1_1
const option1_1: EChartsOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                width: 1,
                color: '#019680',
            },
        },
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [...new Array(18)].map((_item, index) => `${index + 6}:00`),
        splitLine: {
            show: true,
            lineStyle: {
                width: 1,
                type: 'solid',
                color: 'rgba(226,226,226,0.5)',
            },
        },
        axisTick: {
            show: false,
        },
    },
    yAxis: [
        {
            type: 'value',
            max: 80000,
            splitNumber: 4,
            axisTick: {
                show: false,
            },
            splitArea: {
                show: true,
                areaStyle: {
                    color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)'],
                },
            },
        },
    ],
    grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
    series: [
        {
            smooth: true,
            data: [
                111, 222, 4000, 18000, 33333, 55555, 66666, 33333, 14000, 36000, 66666, 44444, 22222,
                11111, 4000, 2000, 500, 333, 222, 111,
            ],
            type: 'line',
            areaStyle: {},
            itemStyle: {
                color: '#5ab1ef',
            },
        },
        {
            smooth: true,
            data: [
                33, 66, 88, 333, 3333, 5000, 18000, 3000, 1200, 13000, 22000, 11000, 2221, 1201, 390,
                198, 60, 30, 22, 11,
            ],
            type: 'line',
            areaStyle: {},
            itemStyle: {
                color: '#019680',
            },
        },
    ],
}
//option1_2
const option1_2: EChartsOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                width: 1,
                color: '#019680',
            },
        },
    },
    grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
    xAxis: {
        type: 'category',
        data: [...new Array(12)].map((_item, index) => `${index + 1}月`),
    },
    yAxis: {
        type: 'value',
        max: 8000,
        splitNumber: 4,
    },
    series: [
        {
            data: [3000, 2000, 3333, 5000, 3200, 4200, 3200, 2100, 3000, 5100, 6000, 3200, 4800],
            type: 'bar',
            barMaxWidth: 80,
        },
    ],
}

//option2
const option2: EChartsOption = {
    tooltip: {
        trigger: 'item',
    },

    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
            data: [
                { value: 500, name: '电子产品' },
                { value: 310, name: '服装' },
                { value: 274, name: '化妆品' },
                { value: 400, name: '家居' },
            ].sort(function (a, b) {
                return a.value - b.value;
            }),
            roseType: 'radius',
            animationType: 'scale',
            animationEasing: 'exponentialInOut',
            animationDelay: function () {
                return Math.random() * 400;
            },
        },
    ],
}
// option3
const option3: EChartsOption = {
    legend: {
        bottom: 0,
        data: ['访问', '购买'],
    },
    tooltip: {},
    radar: {
        radius: '60%',
        splitNumber: 8,
        indicator: [
            {
                name: '电脑',
            },
            {
                name: '充电器',
            },
            {
                name: '耳机',
            },
            {
                name: '手机',
            },
            {
                name: 'Ipad',
            },
            {
                name: '耳机',
            },
        ],
    },
    series: [
        {
            type: 'radar',
            symbolSize: 0,
            areaStyle: {
                shadowBlur: 0,
                shadowColor: 'rgba(0,0,0,.2)',
                shadowOffsetX: 0,
                shadowOffsetY: 10,
                opacity: 1,
            },
            data: [
                {
                    value: [90, 50, 86, 40, 50, 20],
                    name: '访问',
                    itemStyle: {
                        color: '#b6a2de',
                    },
                },
                {
                    value: [70, 75, 70, 76, 20, 85],
                    name: '购买',
                    itemStyle: {
                        color: '#5ab1ef',
                    },
                },
            ],
        },
    ],
}

//option4
const option4: EChartsOption = {
    tooltip: {
        trigger: 'item',
    },
    legend: {
        bottom: '1%',
        left: 'center',
    },
    series: [
        {
            color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2,
            },
            label: {
                show: false,
                position: 'center',
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '12',
                    fontWeight: 'bold',
                },
            },
            labelLine: {
                show: false,
            },
            data: [
                { value: 1048, name: '搜索引擎' },
                { value: 735, name: '直接访问' },
                { value: 580, name: '邮件营销' },
                { value: 484, name: '联盟广告' },
            ],
            animationType: 'scale',
            animationEasing: 'exponentialInOut',
            animationDelay: function () {
                return Math.random() * 100;
            },
        },
    ],
}
export {
    option1,
    option1_1,
    option1_2,
    option2,
    option3,
    option4
}