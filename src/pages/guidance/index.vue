<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <el-alert title="对用户进行引导,使用Driver.js完成" type="success" effect="light" show-icon :closable="false"></el-alert>
      <el-button mt-4 type="primary" size="default" @click.prevent.stop="open">打开引导</el-button>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import Driver from "driver.js";
const driver = new Driver({
  allowClose: false, //禁止点击遮罩层关闭导引
});

let open = () => {
  driver.defineSteps(
    [{
      element: "#logo",
      popover: {
        title: "这里本项目的logo,可爱吧",
        description: "点击logo也可以返回首页哦",
        position: "right",
        offset: 20,
      }
    },
    {
      element: "#unfold-box",
      popover: {
        title: "切换菜单",
        description: "点击这个图标可以切换菜单或者收缩状态哦",
        position: "bottom",
        offset: 20,
      }
    },
    {
      element: "#switch-box",
      popover: {
        title: "按钮切换",
        description: "点击这里可以切换主题状态哦,感谢观看",
        position: "bottom",
        offset: 20,
      }
    }])
  driver.start();
};
</script>
<style lang="scss">
@import url("driver.js/dist/driver.min.css");
</style>