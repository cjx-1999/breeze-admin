import data from './login.json'
export default [
  {
    url: '/login',
    type: 'post',
    response: () => {
      return {
        code: 200,
        data,
        msg: '登录成功'
      }
    }
  }
]
