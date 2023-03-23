<template>
  <div>
    <input ref="excel_upload" class="excel-upload-input" type="file" accept=".xlsx, .xls" @change="handleClick">
    <div class="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
      将文件拖拽到这
      <el-button :loading="loading" style="margin-left:16px;" size='mini' type="primary" @click="handleUpload">
        点击上传
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>

import * as XLSX from 'xlsx'
import { commonStore } from '@/stores/common';
const { message } = commonStore()
const { beforeUpload, onSuccess } = defineProps(['beforeUpload', 'onSuccess'])


let loading = ref<boolean>(false)
let excel_upload = ref(null)
let excelData = reactive<{ header: any, results: any }>({
  header: null,
  results: null
})

function generateData(header: any, results: any) {
  excelData.header = header
  excelData.results = results
  onSuccess && onSuccess(excelData)
}

function handleDrop(e: DragEvent) {
  e.stopPropagation()
  e.preventDefault()
  if (loading.value) return
  if (!e.dataTransfer) return
  const files = e.dataTransfer.files
  if (files.length !== 1) {
    message('error', 'Only support uploading one file!')
    return
  }
  const rawFile = files[0] // only use files[0]

  if (!isExcel(rawFile)) {
    message('error', 'Only supports upload .xlsx, .xls, .csv suffix files!')
    return false
  }
  upload(rawFile)
  e.stopPropagation()
  e.preventDefault()
}

function handleDragover(e: DragEvent) {
  e.stopPropagation()
  e.preventDefault()
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = 'copy'
  }
}

function handleUpload() {
  (excel_upload.value as unknown as HTMLInputElement).click()
}

function handleClick(e: Event): void {
  const files = (e.target as HTMLInputElement).files
  if (files) {
    const rawFile = files[0] // only use files[0]
    upload(rawFile)
  }
}

function upload(rawFile: File) {
  (excel_upload.value as unknown as HTMLInputElement).value = '' // Fixes can't select the same excel
  if (!beforeUpload) {
    readerData(rawFile)
    return
  }
  const before = beforeUpload(rawFile)
  if (before) {
    readerData(rawFile)
  }
}

function readerData(rawFile: File) {
  loading.value = true
  const reader = new FileReader()
  reader.onload = e => {
    const data = (e.target as FileReader).result
    const workbook = XLSX.read(data, { type: 'array' })
    const firstSheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[firstSheetName]
    const header = getHeaderRow(worksheet)
    const results = XLSX.utils.sheet_to_json(worksheet)
    generateData(header, results)
    loading.value = false
  }
  reader.readAsArrayBuffer(rawFile)
}

function getHeaderRow(sheet: { [key: string]: any }) {
  const headers: string[] = []
  const range = XLSX.utils.decode_range(sheet['!ref'])
  const R = range.s.r
  // start in the first row
  for (let C = range.s.c; C <= range.e.c; ++C) { // walk every column in the range
    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
    // find the cell in the first row
    let hdr = ''
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
    if (hdr === '') {
      hdr = 'UNKNOWN ' + C // replace with your desired default
    }
    headers.push(hdr)
  }
  return headers
}

function isExcel(file: File) {
  return /\.(xlsx|xls|csv)$/.test(file.name)
}

</script>

<style lang="scss" scoped>
.excel-upload-input {
  display: none;
  z-index: -9999;
}

.drop {
  border: 2px dashed #bbb;
  width: 600px;
  height: 160px;
  line-height: 160px;
  margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
</style>
