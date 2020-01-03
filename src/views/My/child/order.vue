<template>
  <div>
    <div class="top">
      <div class="gou" @click="clickvan">
        <van-icon name="arrow-left" />
      </div>
      <div class="address">我的订单</div>
    </div>
    <div>
      <van-tabs  swipe-threshold = 5 >
        <van-tab title="全部" >内容 1</van-tab>
        <van-tab title="待支付" >内容 2</van-tab>   
        <van-tab title="代发货" >内容 2</van-tab>
        <van-tab title="待收货">内容 2</van-tab>
        <van-tab title="已完成"> 内容 2</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  components: {},
  methods: {
    clickvan() {
      this.$router.back();
    },
    
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.top {
  width: 375px;
  height: 50px;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
}
.gou {
  width: 30px;
  height: 50px;
  line-height: 50px;
}
.address {
  width: 100px;
  height: 50px;
  line-height: 45px;
  margin-left: 120px;
}

</style>