<template>
  <div class="my-container">
    <navBar></navBar>
    <div class="main-container">
      <router-view v-slot="{ Component }">
        <keep-alive include="main">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import navBar from './components/navbar/index.vue'
const Component = ref<string>('mainContainer')
</script>
<style lang="scss">
.my-container {
  width: 100%;
  overflow: hidden;
  height: 100vh;
  position: relative;
  background: url('@/assets/image/6.jpg') no-repeat center center;
  background-size: cover;
  box-sizing: border-box;
}

.main-container {
  height: calc(100% - 65px);
  box-sizing: border-box;
  padding-bottom: 10px;
  width: 100%;
}
</style>
