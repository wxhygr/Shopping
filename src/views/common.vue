<template>
  <div>
    <router-view></router-view>
     <van-tabbar route>
          <van-tabbar-item replace to="/home" icon="wap-home-o">商城</van-tabbar-item>
          <van-tabbar-item replace to="/category" icon="apps-o">分类</van-tabbar-item>
          <van-tabbar-item replace to="/shoppingcar" icon="shopping-cart-o">购物车</van-tabbar-item>
          <van-tabbar-item replace to="/my" icon="manager-o">我的</van-tabbar-item>
        </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>

</style>