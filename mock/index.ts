import Mock from 'mockjs'

import chart from './chart'
import login from './login/login'
import type { MockParams } from './types'
// 需要遍历的请求
const mocks = [...chart, ...login]

// 设置200-2000毫秒延时请求数据
Mock.setup({
  timeout: '200-2000'
})

// 接口拦截
export function mockRequest() {
  let i: MockParams
  for (i of mocks) {
    Mock.mock(new RegExp(`${import.meta.env.VITE_MOCK_URL}${i.url}`), i.type || 'get', i.response)
  }
}
