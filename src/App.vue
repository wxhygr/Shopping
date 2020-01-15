<template>
  <div id="app">
  
<!-- 任意元素中加 v-wechat-title 指令 建议将标题放在 route 对应meta对象的定义中 -->
<div v-wechat-title="$route.meta.title"></div>
<!--或者-->
    <router-view v-wechat-title="$route.meta.title"/>
  </div>
</template>

<style lang="scss">
*{
  margin:0;
  padding: 0;
}
</style>
