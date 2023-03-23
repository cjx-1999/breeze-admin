<template>
  <div class="chart-wrapper" ref="scatterMap"></div>
</template>

<script lang="ts" setup>
import { debounce, getGeoJson } from '@/utils/index'
import { selectCityData } from '@/api/mock/chart'
import { homeStore } from '@/stores/home'
import { cityData, provinceAdcode } from '@/assets/jsResources/geoMap'
import { pTypes } from '@/types/common'
const _ = inject<any>(pTypes._)
const store = homeStore()
const echarts = inject<any>('echarts')
const cityAdcode = provinceAdcode
const { abcode, parentInfo, year } = toRefs(store)
let myChart = ref<any>(null)
let geoJson = ref<any>(null)
const scatterMap = ref<any>(null)
const timeData = reactive<number[]>([2018, 2019, 2020, 2021, 2022])

const resizeHandler = debounce(() => {
  if (myChart) {
    myChart.resize()
  }
}, 200)

onMounted(() => {
  getMapJson()
  window.addEventListener('resize', resizeHandler)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler)
})

//通过高德获取geoJson数据
const getMapJson = async () => {
  geoJson.value = await getGeoJson(abcode.value, geoJson.value)
  getMapData()
}

//模拟接口，获取echarts数据
const getMapData = async () => {
  // let data = cityData
  let { data } = await selectCityData(store.abcode, store.year)
  let sum = data.reduce((t, c) => t + parseFloat(c.value), 0)
  store.setSum(parseFloat(sum.toFixed(1)))

  data = data.sort(function (a, b) {
    return a.value - b.value
  })

  initEcharts(data)
}

//渲染echarts图
const initEcharts = (data: string | any[]) => {
  myChart = echarts.init(scatterMap.value)

  if (parentInfo.value.length === 1) {
    echarts.registerMap('china', geoJson.value) //注册
  } else {
    echarts.registerMap('map', geoJson.value) //注册
  }
  var min = parseFloat(data[0].value)
  var max = parseFloat(data[data.length - 1].value)
  if (data.length === 1) {
    min = 0
  }
  var option = {
    timeline: {
      data: timeData,
      axisType: 'category',
      autoPlay: true,
      playInterval: 8000,
      left: '10%',
      right: '10%',
      bottom: '0%',
      width: '80%',
      label: {
        normal: {
          textStyle: {
            color: 'rgb(179, 239, 255)'
          }
        },
        emphasis: {
          textStyle: {
            color: '#fff'
          }
        }
      },
      currentIndex: timeData.indexOf(year.value),
      symbolSize: 10,
      lineStyle: {
        color: '#8df4f4'
      },
      checkpointStyle: {
        borderColor: '#8df4f4',
        color: '#53D9FF',
        borderWidth: 2
      },
      controlStyle: {
        showNextBtn: true,
        showPrevBtn: true,
        normal: {
          color: '#53D9FF',
          borderColor: '#53D9FF'
        },
        emphasis: {
          color: 'rgb(58,115,192)',
          borderColor: 'rgb(58,115,192)'
        }
      }
    },
    baseOption: {
      animation: true,
      animationDuration: 900,
      animationEasing: 'cubicInOut',
      animationDurationUpdate: 900,
      animationEasingUpdate: 'cubicInOut',

      title: {
        left: 'center',
        top: 0,
        text:
          year.value +
          '年' +
          parentInfo.value[parentInfo.value.length - 1].cityName +
          '销售额统计图',
        textStyle: {
          color: 'rgb(179, 239, 255)',
          fontSize: 16
        }
      },
      tooltip: {
        trigger: 'item',
        // backgroundColor: 'rgba(0,0,0,0.8)',
        formatter: (p: { value: number; name: string }) => {
          let val = p.value
          if (p.name == '南海诸岛') return
          if (window.isNaN(val)) {
            val = 0
          }
          let txtCon =
            "<div style='text-align:left'>" +
            p.name +
            ':<br />销售额：' +
            val.toFixed(2) +
            '万</div>'
          return txtCon
        }
      },
      toolbox: {
        feature: {
          restore: {
            show: false
          },
          dataView: {
            show: false
          },
          saveAsImage: {
            name: '销售额统计图'
          },
          dataZoom: {
            show: false
          },
          magicType: {
            show: false
          }
        },
        iconStyle: {
          normal: {
            borderColor: '#1990DA'
          }
        },
        top: 0,
        right: 0
      },
      visualMap: {
        show: true,
        min: min,
        max: max,
        left: '0%',
        bottom: '0%',
        calculable: true,
        inRange: {
          color: ['#24CFF4', '#2E98CA', '#1E62AC']
        },
        textStyle: {
          color: '#24CFF4'
        }
      },
      series: [
        {
          name: year.value + '销售额度',
          type: 'map',
          map: parentInfo.value.length === 1 ? 'china' : 'map',
          roam: true,
          zoom: 1.25,
          top: '15%',
          tooltip: {
            trigger: 'item',
            formatter: (p: { value: any; name: string }) => {
              let val = p.value
              if (p.name == '南海诸岛') return
              if (window.isNaN(val)) {
                val = 0
              }
              let txtCon =
                "<div style='text-align:left'>" +
                p.name +
                '</div>' +
                '<div>销售额：' +
                val.toFixed(2) +
                '万</div>'
              return txtCon
            }
          },
          label: {
            normal: {
              show: true,
              color: 'rgb(249, 249, 249)', //省份标签字体颜色
              formatter: (p: { name: string }) => {
                switch (p.name) {
                  case '内蒙古自治区':
                    p.name = '内蒙古'
                    break
                  case '西藏自治区':
                    p.name = '西藏'
                    break
                  case '新疆维吾尔自治区':
                    p.name = '新疆'
                    break
                  case '宁夏回族自治区':
                    p.name = '宁夏'
                    break
                  case '广西壮族自治区':
                    p.name = '广西'
                    break
                  case '香港特别行政区':
                    p.name = '香港'
                    break
                  case '澳门特别行政区':
                    p.name = '澳门'
                    break
                  default:
                    break
                }
                return p.name
              }
            },
            emphasis: {
              show: true,
              color: '#f75a00'
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#24CFF4',
              borderColor: '#53D9FF',
              borderWidth: 1.3,
              shadowBlur: 15,
              shadowColor: 'rgb(58,115,192)',
              shadowOffsetX: 7,
              shadowOffsetY: 6
            },
            emphasis: {
              areaColor: '#8dd7fc',
              borderWidth: 1.6,
              shadowBlur: 25
            }
          },
          data: data
        }
      ]
    }
  }
  myChart.off('timelinechanged')
  myChart.on('timelinechanged', (params: { currentIndex: number }) => {
    const year = timeData[params.currentIndex]
    store.setYear(year)
    getMapData()
  })
  myChart.off('click')
  myChart.on('click', function (params: { [x: string]: any; name: any }) {
    console.log(params, 'params')
    if (params.data) {
      const data = params.data
      if (!_.find(store.mapInfo, { cityName: data.name })) {
        store.addInfo({
          cityName: data.name,
          code: data.adcode
        })
      }
      getMapJson()
    } else {
      if (parentInfo.value.length === 1) {
        return
      }
      store.removeInfo(parentInfo.value.length - 1)
    }
    // }
    // var name: string = params.name;
    // if (name) {
    //     let index: number = -1;
    //     cityAdcode.forEach((item, i) => {
    //         if (name.includes(item.name)) {
    //             index = i;
    //             return
    //         }
    //     })
    //     if (cityAdcode[index]) {
    //         if (
    //             parentInfo.value[parentInfo.value.length - 1].code ==
    //             cityAdcode[index].adcode
    //         ) {
    //             return;
    //         }
    //         console.log(cityAdcode[index].name, cityAdcode[index].adcode);

    //         store.addInfo({
    //             cityName: cityAdcode[index].name,
    //             code: cityAdcode[index].adcode
    //         })
    //         getMapJson();
    //     }

    // } else {
    //     if (parentInfo.value.length === 1) {
    //         return;
    //     }
    //     store.removeInfo(parentInfo.value.length - 1)
    // }
  })
  myChart.setOption(option)
}

watch(
  store.parentInfo,
  (nl, ol) => {
    getMapJson()
  },
  { deep: true }
)
</script>
