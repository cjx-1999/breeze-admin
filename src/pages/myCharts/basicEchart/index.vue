<template>
    <div p-2 min-w-2xl class=" h-auto">
        <echart1 v-loading2="{ wait: 1000 }" class="mb-2"></echart1>
        <div class="sm:flex mb-2">
            <echart2 v-loading2="{ wait: 1000, style: '2' }" class="sm:w-1/3 mr-2"></echart2>
            <echart3 v-loading2="{ wait: 1000 }" class="sm:w-1/3 mr-2"></echart3>
            <echart4 v-loading2="{ wait: 1000 }" class="sm:w-1/3 "></echart4>
        </div>
    </div>
</template>
<script setup lang="ts">
import echart1 from './chart1/index.vue'
import echart2 from './chart2/index.vue'
import echart3 from './chart3/index.vue'
import echart4 from './chart4/index.vue'

</script>
<style scoped>

</style>