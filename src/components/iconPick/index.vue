<template>
  <el-popover
    placement="bottom-start"
    :visible="isShow"
    transition="el-zoom-in-top"
    :show-arrow="false"
    width="550px"
    trigger="focus"
  >
    <template #reference>
      <el-input
        id="iconInput"
        clearable
        style="width: 100%"
        class="mb-2 mr-2"
        text
        v-model="iconName"
        @click="isShow = !isShow"
        @clear="resetIcon"
        @blur="inputBlur"
      >
        <template #prepend px-10>
          <div class="w-30px flex justify-center items-center">
            <SvgIcon :name="iconName" size="18"></SvgIcon>
          </div>
        </template>
        <template #append>
          <el-button icon="Search" @click="iconFilter" />
        </template>
      </el-input>
    </template>
    <div id="iconBox" @click="elFocus('iconInput')">
      <el-tabs v-model="state.fontIconTabActive" @tab-click="onIconClick">
        <el-tab-pane label="阿里" name="阿里"> </el-tab-pane>
        <el-tab-pane label="饿了么" name="饿了么"> </el-tab-pane>
        <el-tab-pane label="Awesome" name="Awesome"> </el-tab-pane>
      </el-tabs>
      <div class="h-170px w-100% overflow-hidden overflow-y-auto">
        <div w-550px>
          <div
            v-for="(item, index) in nameList"
            :key="index"
            v-show="index + 1 == setPage.page"
            class="w-95% flex flex-wrap"
          >
            <div
              v-for="item in nameList[index]"
              :key="item"
              class="w-20px h-22px flex justify-center flex-wrap mb-4 mr-2 opacity-60 hover:opacity-100"
              @click="checkIcon(item)"
            >
              <div class="text-center w-20px mt-2">
                <SvgIcon :name="item" size="21"></SvgIcon>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div my-2>
        <el-pagination
          @current-change="changeSize"
          style="float: right; margin-top: 10px"
          layout="prev, pager, next"
          :current-page.sync="setPage.page"
          :page-size="setPage.pageSize"
          :total="setPage.total"
        />
      </div>
    </div>
  </el-popover>
</template>
<script setup lang="ts">
import initIconfont from '@/utils/getStyleSheets'
import { elFocus } from '@/utils/tools'
import type { TabsPaneContext } from 'element-plus'
const props = defineProps({
  name: {
    type: String,
    default: ''
  }
})
const iconName = ref<string>('')
interface iconType {
  ali: string[]
  ele: string[]
  awe: string[]
}
//分页
let setPage = reactive({
  total: 0,
  page: 1,
  pageSize: 80
})
//分组过后的数据保存
let nameList = ref<any>([])
//当前选中的图标名称列表
let currentNameList = reactive<string[]>([])
const state = reactive({
  fontIconTabActive: '阿里',
  fontIconList: <iconType>{
    ali: <string[]>[],
    ele: <string[]>[],
    awe: <string[]>[]
  }
})

function inputBlur() {
  setTimeout(() => {
    const activeEl = document.activeElement as HTMLElement
    if (activeEl.id != 'iconInput') {
      setTimeout(() => {
        isShow.value = false
      }, 300)
    }
  }, 300)
}
const emit = defineEmits(['checkIcon'])
//选中图标
const checkIcon = (text: string) => {
  iconName.value = text
  emit('checkIcon', iconName.value)
}
// 图标种类切换
const onIconClick = (pane: TabsPaneContext) => {
  const str = pane.paneName as string
  changeCurrentNameList(str)
}
//切换到下一页
const changeSize = (page: any) => {
  setPage.page = page
}

const isShow = ref<boolean>(false)
//监听
watch(isShow, (newval) => {
  changeCurrentNameList(state.fontIconTabActive)
  iconHander(currentNameList)
})
//监听 图标名称的变化
watch(
  () => props.name,
  (newval) => {
    iconName.value = props.name //初始赋值
  },
  { immediate: true }
)

// 初始化数据
const initFontIconData = async (name: string) => {
  // 阿里字体图标使用 `iconfont xxx`
  if (state.fontIconList.ali.length > 0) return
  await initIconfont.ali().then((res: any) => {
    state.fontIconList.ali = res.map((i: string) => `iconfont ${i}`)
  })
  // element plus 图标
  if (state.fontIconList.ele.length > 0) return
  await initIconfont.ele().then((res: any) => {
    state.fontIconList.ele = res
  })
  // fontawesome字体图标使用 `fa xxx`
  if (state.fontIconList.awe.length > 0) return
  await initIconfont.awe().then((res: any) => {
    state.fontIconList.awe = res.map((i: string) => `fa ${i}`)
  })
}
onMounted(() => {
  initFontIconData(state.fontIconTabActive)
})

function changeCurrentNameList(name: string) {
  switch (name) {
    case '阿里':
      currentNameList = state.fontIconList.ali
      break
    case '饿了么':
      currentNameList = state.fontIconList.ele
      break
    case 'Awesome':
      currentNameList = state.fontIconList.awe
      break
  }
  setPage.total = currentNameList.length
}

const iconFilter = () => {
  elFocus('iconInput')
  let arr = []
  let str = String(iconName.value.toLowerCase())
  arr = currentNameList.filter((item) => {
    let str2 = item.toLowerCase()
    if (str2.includes(str)) {
      return item
    }
  })
  nameList.value = []
  iconHander(arr)
  setPage.total = arr.length
}
//重置
function resetIcon() {
  iconName.value = ''
  emit('checkIcon', iconName.value)
  nameList.value = []
  iconHander(currentNameList)
  setPage.total = currentNameList.length
}
//图标分组
function iconHander(array: string[]) {
  let arr: string[] = []
  nameList.value = []
  array.forEach((item, index) => {
    // if (index == 0) arr.push(item);
    if (index % setPage.pageSize != 0) {
      arr.push(item)
    } else {
      if (arr.length > 0) nameList.value.push(arr)
      arr = []
      arr.push(item)
    }
    if (index == array.length - 1) {
      nameList.value.push(arr)
    }
  })
}
watch(
  () => state.fontIconTabActive,
  async (newval) => {
    if (newval == 'ali') {
      //首次加载 默认是ali的数据
      await initIconfont.ali().then((res: any) => {
        currentNameList = res.map((i: string) => `iconfont ${i}`)
      })
    }
    setPage.page = 1
    iconHander(currentNameList)
  },
  { immediate: true }
)
</script>
<style scoped lang="scss">
:deep(.el-input-group__prepend) {
  padding: 0 10px;
}

.box {
  position: fixed;
  top: 1.25rem;
  right: 100%;
  z-index: 99;
}
</style>
