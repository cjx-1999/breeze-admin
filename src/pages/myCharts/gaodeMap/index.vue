<template>
  <div v-if="reload" id="container" v-loading2="{ show: isLoding, style: 2 }">
    <div id="myPageTop">
      <label class="text-size-${20px}">搜索:</label>
      <input
        class="border border-dark-200 keyword"
        v-model="keyword"
        id="keyword"
        placeholder="请输入搜索位置"
      />
    </div>
    <div class="input-card absolute z-99 right-2.5 bottom-2.5 bg-[#262626] p-1">
      <div class="mt-2">
        <label class="text-light-100">请输入或点击地图获取经纬度：(经度,纬度)</label>
      </div>
      <div class="mt-3">
        <span class="inline-block text-right w-60px text-pink-300">经纬度:</span>
        <input
          id="lnglat"
          class="keyword border border-light-200"
          type="text"
          v-model="lnglatInput"
        />
      </div>
      <div class="mt-2"><label class="text-light-100">请输入容器像素坐标：(x,y)</label></div>
      <div class="mt-2">
        <span class="inline-block text-right w-60px text-pink-300">坐标:</span>
        <input
          id="pixel"
          class="keyword border border-light-200"
          v-model="pixelInput"
          type="text"
        />
      </div>
      <div class="mt-3 flex justify-center">
        <button
          @click="currentIndex = 1"
          class="btn"
          :class="{ isBtnActive: currentIndex == 1 }"
          id="lnglat2container"
        >
          经纬度->坐标
        </button>
        <button
          @click="currentIndex = 2"
          class="btn"
          :class="{ isBtnActive: currentIndex == 2 }"
          id="container2lnglat"
        >
          坐标->经纬度
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader'
import { reactive, ref, shallowRef } from 'vue'
let isLoding = ref<boolean>(true)
let reload = ref<boolean>(true)
const keyword = ref('')
let currentIndex = ref<number>(-1)
var lnglatInput = ref('116.611279,40.113257')
var pixelInput = ref<{ x: number; y: number } | string>()
// 存储搜索用的数据
let form = reactive<any>({
  address: ''
})
let map = ref<any>(null)
const ininMap = () => {
  AMapLoader.load({
    key: '627a453635c2cbf422e9d2802741afaa', //api服务key--另外需要在public中使用安全密钥！！！
    version: '1.4.15', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.PlaceSearch', 'AMap.AutoComplete'] // 需要使用的的插件列表
  })
    .then((AMap) => {
      map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: 15, // 地图显示的缩放级别
        center: [117.36217, 31.783267]
      })

      //搜索和输入联想
      AMap.plugin(
        ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Geocoder'],
        function (callback: ((this: MediaQueryList, ev: MediaQueryListEvent) => any) | null) {
          const autoOptions = {
            input: 'keyword' // 使用联想输入的input的id
          }
          const autocomplete = new AMap.Autocomplete(autoOptions)
          const placeSearch = new AMap.PlaceSearch({
            map: map
          })
          const geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: 'all'
          })
          AMap.event.addListener(
            autocomplete,
            'select',
            function (e: { poi: { adcode: any; name: any } }) {
              placeSearch.setCity(e.poi.adcode)
              placeSearch.search(
                e.poi.name,
                function (status: any, result: { poiList: { pois: any } }) {
                  const pois = result.poiList.pois
                  for (let i = 0; i < pois.length; i++) {
                    if (pois[i].name === e.poi.name) {
                      geocoder.getAddress(
                        [pois[i].location.lng, pois[i].location.lat],
                        function (
                          status: string,
                          result: { info: string; regeocode: { formattedAddress: any } }
                        ) {
                          console.log(result)
                          if (status === 'complete' && result.info === 'OK') {
                            form.address = result.regeocode.formattedAddress
                          } else {
                            form.address = ''
                          }
                        }
                      )
                    }
                  }
                }
              )
            }
          )
        }
      )
      //设置点位
      // 创建一个途径的 Icon
      var viaIcon = new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(100, 100),
        // 图标的取图地址
        image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png',
        // 图标所用图片大小
        imageSize: new AMap.Size(25, 34)
        // 图标取图偏移量
        // imageOffset: new AMap.Pixel(-13, -30)
      })
      // 以 icon URL 的形式创建一个途经点
      var viaMarker = new AMap.Marker({
        position: new AMap.LngLat(245.363047, 78.78514),
        icon: viaIcon,
        offset: new AMap.Pixel(-13, -30)
      })

      // 创建一个 Icon
      var startIcon = new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(25, 34),
        // 图标的取图地址
        image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
        // 图标所用图片大小
        imageSize: new AMap.Size(135, 40),
        // 图标取图偏移量
        imageOffset: new AMap.Pixel(-9, -3)
      })

      // 将 icon 传入 marker，起始位置
      var startMarker = new AMap.Marker({
        position: new AMap.LngLat(78.363098, 45.783814),
        icon: startIcon,
        offset: new AMap.Pixel(-13, -30)
      })

      // 创建一个 icon，结束位置
      var endIcon = new AMap.Icon({
        size: new AMap.Size(25, 34),
        image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
        imageSize: new AMap.Size(135, 40),
        imageOffset: new AMap.Pixel(-95, -3)
      })

      // 将 icon 传入 marker 结束位置
      var endMarker = new AMap.Marker({
        position: new AMap.LngLat(45.359557, 34.785285),
        icon: endIcon,
        offset: new AMap.Pixel(-13, -30)
      })

      // 将 markers 添加到地图
      map.add([viaMarker, startMarker, endMarker])

      // 经纬度坐标转成容器像素坐标
      function lnglat2container() {
        if (!lnglatInput.value) return
        var inputVal = lnglatInput.value.split(',')
        var lnglat = new AMap.LngLat(Number(inputVal[0]), Number(inputVal[1]))
        var pixel = map.lngLatToContainer(lnglat)
        pixelInput.value = pixel.round()
      }
      lnglat2container()

      // 容器像素坐标转成经纬度坐标
      function container2lnglat() {
        if (!pixelInput.value) return
        pixelInput.value = pixelInput.value as { x: number; y: number }
        var pixel = new AMap.Pixel(pixelInput.value.x, pixelInput.value.y)
        var lnglat = map.containerToLngLat(pixel)
        lnglatInput.value = lnglat
      }
      map.on('click', function (e: { lnglat: { toString: () => string } }) {
        lnglatInput.value = e.lnglat.toString()
      })
      // 绑定点击事件
      const lnglat2Container = document.getElementById('lnglat2container') as HTMLElement
      lnglat2Container.onclick = lnglat2container
      const container2Lnglat = document.getElementById('container2lnglat') as HTMLElement
      container2Lnglat.onclick = container2lnglat
    })
    .catch((e) => {})
  isLoding.value = false
}
onMounted(() => {
  setTimeout(() => {
    ininMap()
  }, 2000)
})
</script>
<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100%;
  position: relative;
}

#myPageTop {
  position: absolute;
  top: 0;
  z-index: 99;
  left: 10px;
  color: #fff;
  background: #262626 none repeat scroll 0 0;
  border: 1px solid #ccc;
  opacity: 0.9;
  margin: 0 auto 0 auto;
  padding: 6px;
  font-family: 'Microsoft Yahei', '微软雅黑', 'Pinghei';
  font-size: 14px;
}

.keyword {
  height: 20px;
  border-radius: 5px;
  padding: 5px;
  margin-left: 5px;
}

.input-card {
  .btn {
    height: 35px !important;
    border-radius: 5px;
    margin: 5px;
    padding: 8px;
    color: #262626;
    background-color: #a8a29e;
    border: 0 !important;
    opacity: 1;
  }

  .isBtnActive {
    color: #262626 !important;
    background-color: #fff !important;
  }
}
</style>
