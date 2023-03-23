<template>
  <div class="home-container px-2">
    <el-row :gutter="15">
      <el-col :span="7">
        <div class="echartList">
          <div class="chart-item">
            <box-container :boxTitle="year + '年销售额度排名'">
              <cityCount />
            </box-container>
          </div>
          <div class="chart-item">
            <box-container :boxTitle="year + '年销售种类占比'">
              <type-count />
            </box-container>
          </div>
          <div class="chart-item">
            <box-container :boxTitle="year + '年销售品牌占比'">
              <word-chart />
            </box-container>
          </div>
        </div>
      </el-col>
      <el-col :span="10">
        <count-to :value="sum" suffix="万" :speed="30" />
        <div style="width:100%;height:85%">
          <scatter-map />
        </div>
      </el-col>
      <el-col :span="7">
        <div class="echartList">
          <div class="chart-item">
            <box-container :boxTitle="year + '年客户年龄分布'">
              <funnel-chart />
            </box-container>
          </div>
          <div class="chart-item">
            <box-container :boxTitle="year + '年公司市值'">
              <liquid-chart />
            </box-container>
          </div>
          <div class="chart-item">
            <box-container :boxTitle="year + '年同行业销售额度对比'">
              <line-chart />
            </box-container>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import boxContainer from "@/components/boxContainer/index.vue";
import { homeStore } from "@/stores/home";
import countTo from "@/components/countTo/index.vue";
import {
  cityCount,
  typeCount,
  scatterMap,
  wordChart,
  funnelChart,
  lineChart,
  liquidChart,
} from "./components/index";
const store = homeStore();
const { year, sum } = toRefs(store);

</script>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  height: calc(99vh - 65px);
  overflow: hidden;
  position: relative;
  box-sizing: border-box;

  .echartList {
    width: 100%;
    height: calc(99vh - 65px);
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;

    .chart-item {
      height: 32.1%;
      width: 100%;
    }
  }
}
</style>
