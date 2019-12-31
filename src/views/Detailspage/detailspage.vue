<template>
  <div>
    <div class="box">
      <div class="back">
        <van-icon name="arrow-left" class="c" />
      </div>
      <div class="lunbo">
        <van-swipe :autoplay="3000" indicator-color="#666">
          <van-swipe-item>
            <img :src="arr.image" width="350px" height="300px" />
          </van-swipe-item>
          <van-swipe-item>
            <img :src="arr.image_path" width="350px" height="300px" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="title">{{arr.name}}</div>
      <div class="money">￥{{arr.orl_price}}</div>
      <div class="freight">
        <div class="freight-one">运费：{{arr.__v}}</div>
        <div class="freight-one">剩余：{{arr.amount}}</div>
        <div class="freight-two">
          收藏：
          <van-icon name="like-o" class="xin" @click="clickxin" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsId: "",
      arr: {}
    };
  },
  components: {},
  methods: {
    goodOne() {
      this.$api
        .goodOne(this.goodsId)
        .then(res => {
          this.arr = res.goods.goodsOne;
            // console.log(this.arr);
        })
        .catch(err => {
          console.log(err);
        });
    },
    isCollection(){
        this.$api.isCollection(this.goodsId).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    },
    
    clickxin() {}
  },
  mounted() {
    this.goodsId = this.$route.query.goodsId;
    this.goodOne();
    this.isCollection()
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.box {
  width: 373px;
  height: 325px;
}
.back {
  width: 25px;
  height: 25px;
  border-radius: 25px;
  background: #777778;
}
.c {
  color: white;
  margin: 5px 0 0 4px;
}
.lunbo {
  width: 375px;
  height: 300px;
}
.title {
  width: 375px;
  height: 30px;
  font-size: 18px;
}
.money {
  width: 375px;
  height: 20px;
  font-size: 15px;
  color: red;
}
.freight {
  width: 375px;
  height: 25px;
  display: flex;
}
.freight-one {
  width: 125px;
  height: 25px;
  line-height: 25px;
  font-size: 15px;
  color: #666;
}
.freight-two {
  width: 125px;
  height: 25px;
  line-height: 25px;
  font-size: 15px;
  color: #666;
}
</style>