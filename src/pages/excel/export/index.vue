<template>
    <div>
        <el-card shadow="always" :body-style="{ padding: '20px' }">
            <el-button my-2 type="primary" size="default" @click="exportExcel">导出excel</el-button>
            <el-button my-2 type="primary" size="default" @click="exportExcel1">导出选中行的数据</el-button>
            <el-table @select="checkRow" :data="tableList">
                <el-table-column type="selection"></el-table-column>
                <el-table-column label="id" prop="id"></el-table-column>
                <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="描  述" prop="desc"></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
<script setup lang="ts">
import { formatJson } from '@/utils'
import { exportJson2Excel } from '@/utils/excel'
import { commonStore } from '@/stores/common';
const { message } = commonStore()
interface list {
    id: number,
    name: string,
    desc: string
}
const filename: string = 'export-excel'
const autoWidth = true
const bookType = 'xlsx'
let currentList = reactive<list[]>([])
const tableList = reactive<list[]>(
    [{
        id: 1,
        name: 'chenjiaxing',
        desc: '状态很好'
    },
    {
        id: 2,
        name: 'cjx',
        desc: 'very good'
    },
    {
        id: 3,
        name: 'chen',
        desc: 'very happy'
    }]
)
function exportExcel() {
    const tHeader = ['id', 'name', 'desc']
    const filterVal = ['id', 'name', 'desc']
    const list = tableList;
    const data = formatJson(filterVal, list)
    exportJson2Excel(tHeader, data, filename != '' ? filename : undefined, undefined, undefined, autoWidth, bookType)
}

function checkRow(selection: list[], row: list) {
    currentList = selection
}
function exportExcel1() {
    if (currentList.length != 0) {
        const tHeader = ['id', 'name', 'desc']
        const filterVal = ['id', 'name', 'desc']
        const list = currentList;
        const data = formatJson(filterVal, list)
        exportJson2Excel(tHeader, data, filename != '' ? filename : undefined, undefined, undefined, autoWidth, bookType)
    } else {
        message('warning', '选中的数据行为空')
    }
}
</script>
<style lang="scss">

</style>