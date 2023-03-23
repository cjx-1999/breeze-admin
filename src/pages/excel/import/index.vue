<template>
    <div class="app-container">
        <el-card>
            <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
            <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
                <el-table-column v-for="(item, index) of tableHeader" :key="item" :prop="tableHeader[index]"
                    :label="tableHeader[index]" />
            </el-table>
        </el-card>
    </div>
</template>
  
<script setup lang="ts">
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { commonStore } from '@/stores/common';
const { message } = commonStore()

let tableData = reactive<any[]>([])
let tableHeader = reactive<string[]>([])

function beforeUpload(file: File) {
    const isLt1M = file.size / 1024 / 1024 < 1
    if (isLt1M) {
        return true
    }
    message('warning', '上传文件大小不能超过1M')
    return false
}

function handleSuccess({ results, header }: { results: any, header: string[] }) {
    tableData = [...results]
    console.log(tableData);

    tableHeader = header
    console.log(tableHeader[0]);
}
</script>
  