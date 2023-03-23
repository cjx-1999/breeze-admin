//
let mode = ref<Storage>(sessionStorage)
function changeMode(obj: Storage) {
  mode.value = obj
}
/**
 * 设置本地存储
 * @param name 名称
 * @param data 数据
 * @param type 类型 对象或者基本类型
 */
function setStorage(name: string, data: any, type?: string) {
  let data1 = type == 'obj' ? JSON.stringify(data) : data
  mode.value.setItem(name, data1)
}

/**
 * 获取本地存储
 * @param name 名称
 * @param data 数据
 * @param type 类型 对象或者基本类型
 */
function getStorage(name: string, type?: string) {
  const data = mode.value.getItem(name)
  const data1 = data && type == 'obj' ? JSON.parse(data) : data
  return data1
}

/**
 * 移除本地存储
 *  @param name 名称
 */
function removeStorage(name: string) {
  mode.value.removeItem(name)
}
export { changeMode, getStorage, setStorage, removeStorage }
