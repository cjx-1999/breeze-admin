<template>
  <div class="min-w-2xl box flex">
    <div id="myChina" class="mx-auto"></div>
  </div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import '@/assets/jsResources/china.js' //中国地图资源
import { geoCoordMap } from '@/assets/jsResources/geoMap' //各个省份的经纬度 及名称
import { onMounted } from 'vue'
type EChartsOption = echarts.EChartsOption

//随机十六进制函数
const randomColor16 = () => {
  var r = Math.floor(Math.random() * 256)
  var g = Math.floor(Math.random() * 256)
  var b = Math.floor(Math.random() * 256)
  var color = '#' + r.toString(16) + g.toString(16) + b.toString(16)
  return color
}
const el = document.getElementsByClassName('box')[0] as HTMLElement
const wd = ref<string>('100%')

onMounted(() => {
  window.onresize = function () {
    wd.value = el.clientWidth / 16 + 'rem'
  }
  charInit()
})

const charInit = () => {
  let myChar = document.getElementById('myChina') as HTMLElement
  const chinaChar = echarts.init(myChar)
  window.onresize = function () {
    chinaChar.resize()
  }
  const citys = Object.keys(geoCoordMap)
  console.log(citys, 'citys')
  const data = citys.map((item) => {
    return {
      name: item,
      itemStyle: {
        // areaColor: randomColor16(),
        areaColor: '#bae6fd'
      },
      value: geoCoordMap[item]
    }
  })
  console.log(data, 'data')

  var option = {
    title: {
      text: '',
      subtext: '',
      x: 'center'
    },
    legend: {
      show: false,
      orient: 'horizontal', //图例的排列方向
      x: 'left',
      data: ['人口数据']
    },
    tooltip: {
      trigger: 'item',
      show: true,
      backgroundColor: 'rgba(0,0,0,0.8)',
      formatter: function (params: { value: string | any[]; name: string }) {
        if (params.value.length > 1) {
          return (
            '&nbsp;&nbsp;' +
            params.name +
            '&nbsp;&nbsp;&nbsp;' +
            params.value[2] +
            '万人&nbsp;&nbsp;'
          )
        } else {
          return (
            '&nbsp;&nbsp;' + params.name + '&nbsp;&nbsp;&nbsp;' + params.value + '万人&nbsp;&nbsp;'
          )
        }
      }
    },
    visualMap: {
      show: false,
      x: 'left',
      y: 'center',
      splitList: [
        { start: 8000, end: 12000 },
        { start: 5000, end: 8000 },
        { start: 4000, end: 5000 },
        { start: 3500, end: 4000 },
        { start: 2500, end: 3500 },
        { start: 800, end: 2500 },
        { start: 50, end: 800 }
      ],
      text: ['高', '低'],
      // color: ['#93CDE1', '#6EC2EE', '#2961AD']
      color: ['#2961AD', '#93CDE1', '#2961AD']
    },
    toolbox: {
      show: false,
      orient: 'vertical',
      x: 'right',
      y: 'center',
      feature: {
        //各工具配置项。
        mark: { show: true },
        dataView: { show: true, readOnly: false }, //数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新。
        restore: { show: true }, //配置项还原。
        saveAsImage: { show: true } //保存为图片。
      }
    },
    roamController: {
      //控制地图的上下左右放大缩小 图上没有显示
      show: true,
      x: 'right',
      mapTypeControl: {
        china: true
      }
    },
    series: [
      {
        name: '人口数量',
        type: 'map',
        mapType: 'china',
        roam: true, //是否开启鼠标缩放和平移漫游
        itemStyle: {
          //地图区域的多边形 图形样式
          normal: {
            //是图形在默认状态下的样式
            label: {
              show: true, //是否显示标签
              textStyle: {
                color: 'rgb(249, 249, 249)'
              }
            }
          },
          emphasis: {
            //是图形在高亮状态下的样式,比如在鼠标悬浮或者图例联动高亮时
            label: { show: true }
          }
        },
        // itemStyle: {
        //     normal: {
        //         areaColor: "#24CFF4",
        //         borderColor: "#53D9FF",
        //         borderWidth: 1.3,
        //         shadowBlur: 15,
        //         shadowColor: "rgb(58,115,192)",
        //         shadowOffsetX: 7,
        //         shadowOffsetY: 6,
        //         label: {
        //             show: true,
        //             color: "rgb(249, 249, 249)"
        //         }
        //     },
        //     emphasis: {
        //         areaColor: "#8dd7fc",
        //         borderWidth: 1.6,
        //         shadowBlur: 25,
        //     },
        // },
        top: '3%', //组件距离容器的距离
        data: [
          { name: '北京', value: 2154 },
          { name: '天津', value: 1560 },
          { name: '上海', value: 2424 },
          { name: '重庆', value: 3102 },
          { name: '河北', value: 7556 },
          { name: '河南', value: 9605 },
          { name: '云南', value: 4830 },
          { name: '辽宁', value: 4359 },
          { name: '黑龙江', value: 3773 },
          { name: '湖南', value: 6899 },
          { name: '安徽', value: 6324 },
          { name: '山东', value: 10047 },
          { name: '新疆', value: 2487 },
          { name: '江苏', value: 8051 },
          { name: '浙江', value: 5737 },
          { name: '江西', value: 4648 },
          { name: '湖北', value: 5971 },
          { name: '广西', value: 4926 },
          { name: '甘肃', value: 2637 },
          { name: '山西', value: 3718 },
          { name: '内蒙古', value: 2491 },
          { name: '陕西', value: 3864 },
          { name: '吉林', value: 2704 },
          { name: '福建', value: 3941 },
          { name: '贵州', value: 3600 },
          { name: '广东', value: 11346 },
          { name: '青海', value: 603 },
          { name: '西藏', value: 335 },
          { name: '四川', value: 8341 },
          { name: '宁夏', value: 688 },
          { name: '海南', value: 934 },
          { name: '台湾', value: 2359 },
          { name: '香港', value: 745 },
          { name: '澳门', value: 63 }
        ]
      }
    ]
  }
  chinaChar.on('click', function (params: { dataIndex: any }) {
    var dataIndex = params.dataIndex
    console.log(params, 'params')
  })

  if (myChar.clientWidth > 0) {
    chinaChar.setOption(option)
  }
}
</script>
<style scoped lang="scss">
.box {
  position: relative;

  #myChina {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: translate(0, 0);
    // width: calc(100vw - 200px);
    width: v-bind(wd);
    height: 88vh;
  }
}
</style>
