import { ref } from 'vue'
function createBoolean() {
  return ref<boolean>(false)
}
let bol = createBoolean()
function changeBol() {
  bol.value = !bol.value
}
function getBol() {
  return unref(bol)
}
function bolTrue() {
  bol.value = true
}
function bolFalse() {
  bol.value = false
}

export { bol, changeBol, getBol, bolFalse, bolTrue }
