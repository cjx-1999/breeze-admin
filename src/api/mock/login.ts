import request from '@/config/mockRequest'
export function login(params: any) {
  return request.post('/login', params)
}
export function loginCode() {
  return request.post('/login/code')
}
