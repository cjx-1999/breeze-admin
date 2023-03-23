<template>
  <div class="switch" @click="changeLocation"></div>
</template>
<script setup lang="ts">
import { commonStore } from '@/stores/common'
const { changeDark, getDrak } = commonStore()
interface myProps {
  bg_color?: string
  bg_color2?: string
  location: string
}
//设置默认值
const props = withDefaults(defineProps<myProps>(), {
  bg_color: 'black',
  bg_color2: 'white'
})
let _left = ref<string>('')
const location = toRef(props, 'location')
let _location = ref<string>(location.value)
let _bg_color = ref<string>('')
let _bg_color2 = ref<string>('')
_bg_color.value = props.bg_color ? props.bg_color : ''
_bg_color2.value = props.bg_color2 ? props.bg_color2 : ''

const emit = defineEmits(['update:location'])
function changeLocation() {
  let loca = _location.value == 'left' ? 'right' : 'left'
  changeDark()
  emit('update:location', loca)
}
watch(
  _location,
  (val: string) => {
    if (val == 'left') {
      _left.value = '1px'
      _bg_color.value = '#ea2465'
      _bg_color2.value = '#fff'
    } else {
      _left.value = 'calc(100% - 1.1rem - 1px)'
      _bg_color.value = '#525252'
      _bg_color2.value = '#fff'
    }
  },
  { immediate: true }
)
watch(
  getDrak(),
  (val) => {
    if (val) {
      _location.value = 'right'
    } else {
      _location.value = 'left'
    }
  },
  { immediate: true }
)
</script>
<style scoped lang="scss">
.switch {
  width: 2.8rem;
  height: 1.2rem;
  border-radius: 1.2rem;
  position: relative;
  background-color: v-bind(_bg_color);

  &::before {
    top: 50%;
    transform: translate(0, -50%);
    transition: all 0.5s;
    left: v-bind(_left);
    content: '';
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 50%;
    position: absolute;
    background-color: v-bind(_bg_color2);
  }
}
</style>
