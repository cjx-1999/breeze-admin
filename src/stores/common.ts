import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import type { UserInfo } from './type'
import type { EpPropMergeType } from 'element-plus/es/utils'

import { useDark, useToggle } from '@vueuse/core'
import type { Menu } from '@/types/store'

export const commonStore = defineStore('commonStore', {
  state: () => ({
    userInfo: <UserInfo>{}, //用户信息
    cardShow: <boolean>true, //切换注册与登录
    isExpand: false, //是否展开菜单
    roleList: <string[]>[], //角色列表
    menuList: <Menu[]>[]
  }),
  getters: {},
  actions: {
    /**
     *  切换展开或者关闭状态
     * @param state 展开/关闭 的状态
     */
    changExpand(state: boolean): void {
      this.isExpand = state
    },
    /**
     *  切换暗模式/亮模式 的状态
     * @param state 暗模式/亮模式 的状态
     */
    changeDark() {
      const isDark = useDark()
      useToggle(isDark)()
    },
    getDrak() {
      return useDark()
    },
    //提示信息
    message<
      T extends
        | EpPropMergeType<StringConstructor, 'success' | 'warning' | 'info' | 'error', unknown>
        | undefined,
      P
    >(type: T, message: any) {
      ElMessage({
        type,
        message
      })
    },
    /**
     * 指定字段进行返回
     * @param list
     * @param attr
     * @param type
     * @returns
     */
    map<T, P extends keyof T>(list: T[], attr: P, type?: string): Array<any> {
      const arr = list.map((item) => {
        if (type == 'object') {
          return { attr: item[attr] }
        }
        return item[attr]
      })
      return arr
    },
    digui(arr1: any[], pidName: string) {
      // console.log(arr1, 'arr1');

      let children1 = []
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].hasOwnProperty('children')) {
          this.digui(arr1[i].children, pidName)
        }
        for (let j = 0; j < arr1.length; j++) {
          if (j == i) continue
          if (arr1[i].id == arr1[j][pidName]) {
            //存在与父id相同的子id时，将
            children1.push(arr1[j])
          }
          if (j == arr1.length - 1) {
            if (children1.length != 0) {
              arr1[i].children = children1
              // console.log(children1, 'children1');
              children1 = []
            }
          }
        }
      }
      return arr1.filter((item) => item[pidName] == '0')
    },
    //数组去重
    // 创建一个空Map数据结构，遍历需要去重的数组，把数组的每一个元素作为key存到Map中
    // 由于Map中不会出现相同的key值，所以最终得到的就是去重后的结果
    setArr<T>(arr: Array<T>) {
      let map = new Map()
      let newArr = []
      for (let i = 0; i < arr.length; i++) {
        const key = arr[i] instanceof Object ? JSON.stringify(arr[i]) : arr[i]
        if (map.has(key)) {
          map.set(key, true) // true 或 false都没影响
        } else {
          map.set(key, false)
          newArr.push(key)
        }
      }
      return newArr
    }
  },
  persist: {
    enabled: true //开启缓存，默认会话存储
  }
})
