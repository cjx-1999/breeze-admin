<template>
  <div class="chart-wrapper" ref="funnelChart"></div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { debounce } from '@/utils/index'
import { selectBoxChartData } from '@/api/mock/mockChart'
import { homeStore } from '@/stores/home'
import type { Router } from 'vue-router'
const store = homeStore()
const echarts = inject<any>('echarts')
const funnelChart = ref(null)
const router = inject<Router>('router')
let myChart = ref<any>(null)
const resizeHandler = debounce(() => {
  if (myChart) {
    myChart.resize()
  }
}, 200)

onMounted(() => {
  getBoxData()
  window.addEventListener('resize', resizeHandler)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler)
})

// //模拟接口，获取echarts数据
const getBoxData = async () => {
  const data = await selectBoxChartData({
    abcode: store.abcode,
    year: store.year
  })
  initEcharts(data)
}
const colorList = ['#01E1FF', '#ef8347', '#11AAFF', '#B9FFFF', '#3064F3', '#e7d465']
//渲染echarts图
const initEcharts = (data: string | any[]) => {
  myChart = echarts.init(funnelChart.value)
  // myChart.setOption(
  //   {
  //     color: colorList,
  //     //标题
  //     title: {
  //       show: data.length === 0,
  //       top: 'center',
  //       left: 'center',
  //       text: '暂无数据',
  //       textStyle: {
  //         color: 'rgb(179, 239, 255)',
  //         fontSize: 12
  //       }
  //     },
  //     //悬浮框
  //     tooltip: {
  //       trigger: 'item',
  //       formatter: '{a} <br/>{b} : {c} 人'
  //     },
  //     series: [
  //       {
  //         name: '客户年龄',
  //         type: 'funnel',
  //         left: '10%',
  //         top: '5%',
  //         width: '70%',
  //         height: '85%',
  //         label: {
  //           normal: {
  //             formatter: '{b}'
  //           },
  //           emphasis: {
  //             position: 'inside'
  //           }
  //         },
  //         labelLine: {
  //           normal: {
  //             length: 10,
  //             lineStyle: {
  //               width: 1,
  //               type: 'solid'
  //             }
  //           }
  //         },
  //         itemStyle: {
  //           normal: {
  //             label: {
  //               color: '#c5c6c9'
  //             },
  //             borderWidth: 0
  //           }
  //         },
  //         data: data
  //       }
  //     ]
  //   },
  //   true
  // )

  let roseData = data as Array<any>
  console.log(roseData, 'roseData')

  const colors = [
    '#9fe6b8',
    '#32c5e9',
    '#5eb5fc',
    '#1d9dff',
    '#8378ea',
    '#aa6eff',
    '#e7bcf3',
    '#fb7293',
    '#ff9f7f',
    '#ffdb5c'
  ]
  for (let index = 0; index < roseData.length; index++) {
    roseData[index].itemStyle = {
      color: colors[index]
    }
  }

  const originDataLen = roseData.length
  const spanAngle = 180 // 需要显示的角度
  const repeatedMultiple = 360 / spanAngle
  // 这里根据要显示的角度 计算了需要插入的数据量
  const addDataLen = parseInt(String((repeatedMultiple - 1) * originDataLen))
  for (let index = 0; index < addDataLen; index++) {
    roseData.push({
      name: null,
      // 这里给数据置零，即在视觉上不显示
      value: 0,
      // 这里保证了异常情况下(数据都为0时)作为占位的数据在视觉上仍为不可见状态。
      itemStyle: {
        color: '#fff'
      },
      tooltip: {
        show: false,
        formatter: '{a} <br/>{b} : {c} 人'
      }
    })
  }

  const option = {
    series: [
      {
        name: '面积模式',
        type: 'pie',
        roseType: 'area',
        radius: '110%',
        center: ['50%', '90%'],
        startAngle: 180,
        label: {
          show: false
        },
        data: roseData
      },
      {
        type: 'gauge',
        radius: '110%',
        center: ['50%', '90%'],
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 1,
        splitNumber: 20,
        axisLine: {
          lineStyle: {
            width: 1,
            color: [[1, '#fff']]
          }
        },
        axisTick: {
          show: false,
          length: 18,
          lineStyle: {
            color: 'auto',
            width: 1
          }
        },
        splitLine: {
          length: '0',
          lineStyle: {
            color: 'auto',
            width: 1
          }
        },
        axisLabel: {
          color: '#fff',
          fontSize: 14,
          distance: -70,
          formatter: function (value: number) {
            if (value === 0.05) {
              return '18岁以下'
            } else if (value === 0.15) {
              return '18-25'
            } else if (value === 0.35) {
              return '25-35'
            } else if (value === 0.55) {
              return '35-50'
            } else if (value === 0.75) {
              return '50-65'
            } else if (value === 0.95) {
              return '65以上'
            }
          }
        },
        title: {
          offsetCenter: [0, '-20%'],
          fontSize: 30
        },
        detail: {
          fontSize: 50,
          offsetCenter: [0, '0%'],
          valueAnimation: true,
          color: 'auto'
        },
        data: []
      },
      {
        type: 'gauge',
        radius: '110%',
        center: ['50%', '90%'],
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 1,
        splitNumber: 10,
        axisLine: {
          lineStyle: {
            width: 1,
            color: [[1, '#fff']]
          }
        },
        axisTick: {
          show: false,
          distance: 0,
          lineStyle: {
            color: 'auto',
            width: 1
          }
        },
        splitLine: {
          distance: 0,
          length: '100%',
          lineStyle: {
            color: 'auto',
            width: 1
          }
        },
        axisLabel: {
          show: false
        },
        data: []
      },
      {
        type: 'gauge',
        radius: '88%',
        center: ['50%', '90%'],
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 1,
        splitNumber: 10,
        axisLine: {
          lineStyle: {
            width: 1,
            color: [[1, '#ffff']]
          }
        },
        axisTick: {
          show: false,
          length: 18,
          lineStyle: {
            color: 'auto',
            width: 1
          }
        },
        splitLine: {
          length: '80%',
          lineStyle: {
            color: 'auto',
            width: 1
          }
        },
        axisLabel: {
          color: '#464646',
          fontSize: 20
        },
        title: {
          offsetCenter: [0, '-20%'],
          fontSize: 30
        },
        detail: {
          fontSize: 50,
          offsetCenter: [0, '0%'],
          valueAnimation: true,
          color: 'auto'
        },
        data: []
      },
      {
        type: 'gauge',
        radius: '66%',
        center: ['50%', '90%'],
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 1,
        splitNumber: 10,
        axisLine: {
          lineStyle: {
            width: 1,
            color: [[1, '#213d85']]
          }
        },
        axisTick: {
          show: false,
          length: 18,
          lineStyle: {
            color: 'auto',
            width: 2
          }
        },
        splitLine: {
          length: '80%',
          lineStyle: {
            color: 'auto',
            width: 1
          }
        },
        axisLabel: {
          show: false,
          color: '#464646',
          fontSize: 20,
          distance: -60
        },
        data: []
      },
      {
        type: 'gauge',
        radius: '44%',
        center: ['50%', '90%'],
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 1,
        splitNumber: 10,
        axisLine: {
          lineStyle: {
            width: 1,
            color: [[1, '#213d85']]
          }
        },
        axisTick: {
          show: false,
          length: 18,
          lineStyle: {
            color: 'auto',
            width: 2
          }
        },
        splitLine: {
          length: '80%',
          lineStyle: {
            color: 'auto',
            width: 1
          }
        },
        axisLabel: {
          show: false,
          color: '#464646',
          fontSize: 20,
          distance: -60
        },
        data: []
      },
      {
        type: 'gauge',
        radius: '22%',
        center: ['50%', '90%'],
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 1,
        splitNumber: 10,
        axisLine: {
          lineStyle: {
            width: 1,
            color: [[1, '#213d85']]
          }
        },
        axisTick: {
          show: false,
          length: 18,
          lineStyle: {
            color: 'auto',
            width: 2
          }
        },
        splitLine: {
          length: '80%',
          lineStyle: {
            color: 'auto',
            width: 1
          }
        },
        axisLabel: {
          show: false,
          color: '#464646',
          fontSize: 20,
          distance: -60
        },
        data: []
      }
    ]
  }
  myChart.setOption(option, true)

  myChart.off('click')
  myChart.on('click', () => {
    router?.push('/home/more')
  })
}

watch(
  () => store.year,
  (nl, ol) => {
    getBoxData()
  }
)

watch(
  store.parentInfo,
  (nl, ol) => {
    getBoxData()
  },
  { deep: true }
)
</script>
