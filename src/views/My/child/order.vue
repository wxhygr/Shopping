<template>
  <div>
    <div class="top">
      <div class="gou" @click="clickvan">
        <van-icon name="arrow-left" />
      </div>
      <div class="address">我的订单</div>
    </div>
    <div>
      <van-tabs :swipe-threshold="threshold">
        <van-tab title="全部">内容 1</van-tab>
        <van-tab title="待支付">内容 2</van-tab>
        <van-tab title="代发货">内容 2</van-tab>
        <van-tab title="待收货">内容 2</van-tab>
        <van-tab title="已完成">
          <div class="box" v-for="(item,index) in arr" :key="index">
            <div class="box1">
              <div class="title">
                <div class="title-text">订单编号：{{item.order_id}}</div>
                <div class="title-text1">交易完成</div>
              </div>
              <div class="comtent">
                <div v-for="(item1,index) in item.order_list" :key="index">
                  <div class="comtent1">
                    <div class="comtent-img">
                      <img :src="item1.image_path" width="100px" height="100px" />
                    </div>
                    <div class="comtent-title">{{item1.name}}</div>
                    <div class="text">
                      <div>￥{{item1.present_price}}</div>
                      <div>×{{item1.count}}</div>
                    </div>
                  </div>
                   </div>
              </div>
                  <div class="address1">
                    <div class="address2">创建时间：{{item.add_time}}</div>
                    <div class="address2">收货地址：{{item.address}}</div>
                    <div class="address2">一共{{item.order_list.length}}件商品 合计：{{item.mallPrice}}</div>
                  </div>
               
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      threshold: 5,
      arr: []
    };
  },
  components: {},
  methods: {
    clickvan() {
      this.$router.back();
    },
    getMyOrder() {
      this.$api
        .getMyOrder()
        .then(res => {
          this.arr = res.list;
          console.log(this.arr);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getMyOrder();
  },
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
.box {
  width: 375px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box1 {
  width: 350px;
}
.title {
  width: 350px;
  height: 30px;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title-text {
  font-size: 15px;
}
.title-text1 {
  font-size: 15px;
  color: red;
}
.comtent {
  width: 350px;
}
.comtent1 {
  width: 350px;
  height: 100px;
  display: flex;
}
.comtent-img {
  width: 100px;
  height: 100px;
}
.comtent-title {
  width: 200px;
  height: 100px;
  font-size: 15px;
}
.text {
  width: 50px;
  height: 100px;
  font-size: 15px;
}
.address1 {
  width: 350px;
  height: 90px;
}
.address2 {
  width: 350px;
  height: 30px;
  line-height: 30px;
  text-align: right;
  font-size: 15px;
}
</style>