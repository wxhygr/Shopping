<template>
  <div>
    <div class="box">
      <div class="back" @click="clickback">
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

      <div class="storefront">
        <div class="storefront-one">
          <div class="left">
            <div class="shop">
              <van-icon name="shop-collect-o" size="25px" class="shop" />
            </div>
            <div>有赞的店</div>
            <div>
              <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" class="btn">官方</van-button>
            </div>
          </div>
          <div class="right">进入店铺 ></div>
        </div>
      </div>
      <div>
        <van-tabs>
          <van-tab title="商品详情">商品详情</van-tab>
          <van-tab title="商品评论">商品评论</van-tab>
        </van-tabs>
      </div>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="cart-o" text="购物车" :info="this.crr" />
        <van-goods-action-icon icon="shop-o" text="店铺" info="6" />
        <van-goods-action-button type="warning" text="加入购物车" @click="clickshopping" />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </div>
  </div>                
</template>
 
<script>
export default {
  data() {
    return {
      goodsId: "",
      arr: {},
      goods_serlal_number: "",
      crr:'',
    };
  },
  components: {},
  methods: {
    goodOne() {
      this.$api
        .goodOne(this.goodsId)
        .then(res => {
          this.arr = res.goods.goodsOne;
          this.goods_serlal_number = res.goods.goodsOne.goods_serlal_number;
          // console.log(this.arr);
        })
        .catch(err => {
          console.log(err);
        });
    },
    isCollection() {
      this.$api
        .isCollection(this.goodsId)
        .then(res => {
        })
        .catch(err => {
          console.log(err);
        });
    },
    clickback() {
      this.$router.back();
    },
    clickshopping(){
           this.$api.addShop(this.goodsId).then(response => {
           }).catch(err => {
             console.log(err);
           })
    },
    getCard(){
      this.$api.getCard({}).then(res => {
        this.crr = res.shopList.length
        this.crr = Number(this.crr)
      }).catch(err => {
        console.log(err);
      })
    },

    clickxin() {}
  },
  mounted() {
    this.goodsId = this.$route.query.goodsId;
    this.goodOne();
    this.isCollection();
    this.getCard();
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
.storefront {
  width: 375px;
  height: 100px;
  display: flex;
  align-items: center;
}
.storefront-one {
  width: 375px;
  height: 40px;
  display: flex;
  justify-content: space-between;
}
.left {
  width: 200px;
  height: 40px;
  line-height: 40px;
  display: flex;
  .shop {
    margin-top: 3px;
  }
  .btn {
    width: 60px;
    height: 30px;
    line-height: 25px;
  }
}
.right {
  width: 100px;
  height: 40px;
  line-height: 40px;
}
</style>