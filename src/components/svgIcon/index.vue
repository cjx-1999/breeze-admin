<template>
    <i v-show="iconShow == 1" class="el-icon" :style="setIconSvgStyle">
        <component :is="iconName" />
    </i>
    <i v-show="iconShow == 2" :class="getIconName" :style="setIconSvgStyle">
    </i>
    <div v-show="iconShow == 3">
        <svg :class="getIconName" class="svg-icon" :style="{
            width: getSize + 'px',
            height: getSize + 'px'
        }">
            <use :xlink:href="'#' + getIconName" :fill="color" />
        </svg>
    </div>

</template>

<script setup lang="ts">
import { computed } from "vue";

type svgProps = {
    name: string,
    color?: string,
    size?: number | string
}
// const iconShow = ref<number>(1)
const props = defineProps<svgProps>()
//获取数据名称
const getIconName = computed(() => {
    return props.name;
})
const getSize = computed(() => {
    return props?.size ?? 16;
})
// 设置图标样式
const setIconSvgStyle = computed(() => {
    return `font-size: ${getSize.value}px;color: ${props?.color};`;
});
const iconName = ref<string>('')
//ele 开头的是element-ui的图片
//fa awesome的图标 iconfont是阿里图标 i-ic是icons中的谷歌图标
const iconList = ['fa', 'iconfont']
//判断是不是传入的以上述字符开头的图标
const filterIconList = computed(() => {
    return iconList.find((str) => getIconName.value.startsWith(str)) ?? []
});
const iconShow = computed(() => {
    if (getIconName.value.includes('ele-')) {
        iconName.value = unref(getIconName).split('-')[1]
        return 1
    } else if (filterIconList.value?.length > 0) {
        return 2
    } else {
        return 3
    }
})


</script>

​
<style scoped>
.svg-icon {
    fill: currentColor;
    vertical-align: middle;
}
</style>