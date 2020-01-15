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
        <div class="freight-two" v-if="code===true">
          收藏：
          <van-icon name="like-o" class="xin" @click="clickxin" />
        </div>
        <div class="freight-two" v-else>
          取消收藏：
          <img src="../../assets/img/111.png" width="25px" height="18px" @click="clickquxiao" />
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
        <detailsaa></detailsaa>
      </div>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="cart-o" text="购物车" :info="this.crr" />
        <van-goods-action-icon icon="shop-o" text="店铺" info="6" />
        <van-goods-action-button type="warning" text="加入购物车" @click="clickshopping" />
        <van-goods-action-button type="danger" text="立即购买" @click="clickliji" />
      </van-goods-action>
      <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
        <div class="show">
          <div class="show-img">
            <img :src="arr.image" width="100px" height="100px" />
          </div>
          <div class="show-title">
            <div class="title">
              <div class="title-one">{{arr.name}}</div>
              <div class="title-two">
                <van-icon name="close" @click="clickcha" />
              </div>
            </div>
            <div class="show-money">￥{{arr.orl_price}}</div>
          </div>
        </div>
        <div class="count">
          <div class="count-title">购买数量：</div>
          <div class="count-shu">
            <div class="count1">剩余：{{arr.amount}}</div>
            <div class="count2">每人限购50件</div>
            <div class="count3">
              <van-stepper v-model="value" />
            </div>
          </div>
        </div>
        <van-button type="danger" class="button" @click="purchase">立即购买</van-button>
      </van-popup>
    </div>
  </div>
</template>
 
<script>
import { Toast } from "vant";
import detailsaa from "../Detailspage/shop/details.vue";
export default {
  data() {
    return {
      goodsId: "",
      arr: {},
      goods_serlal_number: "",
      crr: "",
      code: false,
      show: false,
      value: 1,
      list: []
    };
  },
  components: {
    detailsaa
  },
  methods: {
    goodOne() {
      this.$api
        .goodOne(this.goodsId)
        .then(res => {
          this.arr = res.goods.goodsOne;
          this.goods_serlal_number = res.goods.goodsOne.goods_serlal_number;
          this.list.push(this.arr);
          localStorage.setItem("history", JSON.stringify(this.list));
        })
        .catch(err => {
          console.log(err);
        });
    },
    clickback() {
      this.$router.back();
    },
    clickshopping() {
      this.$api
        .addShop(this.goodsId)
        .then(response => {
          if (response.code === 200) {
            Toast.success("加入购物车成功");
          }
            
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCard() {
      this.$api
        .getCard({})
        .then(res => {
          this.crr = res.shopList.length;
          this.crr = Number(this.crr);
        })
        .catch(err => {
          console.log(err);
        });
    },
    isCollection() {
      this.$api
        .isCollection({ id: this.goodsId })
        .then(res => {
          if (res.isCollection === 0) {
            this.code = true;
          } else if (res.isCollection === 1) {
            this.code = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    clickxin() {
      this.$api
        .collection(this.arr)
        .then(res => {
          if (res.code === 200) {
            Toast.success("收藏成功");
            this.isCollection();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    clickquxiao() {
      this.$api
        .cancelCollection(this.arr.id)
        .then(res => {
          Toast.success("取消收藏成功");
          this.isCollection();
        })
        .catch(err => {
          console.log(err);
        });
    },
    clickliji() {
      this.show = true;
    },
    clickcha() {
      this.show = false;
    },
    purchase() {
      let obj = [
        {
          cid: this.arr.id,
          name: this.arr.name,
          present_price: this.arr.present_price,
          image_path: this.arr.image,
          count: this.value
        }
      ];
      this.$store.state.list = obj;
      this.$router.push({ name: "shoppingpayment" });
    }
  },
  mounted() {
    this.goodsId = this.$route.query.goodsId;
    this.goodOne();
    this.isCollection();
    this.getCard();

    let str = JSON.parse(localStorage.getItem("history"));
    str.map(item => {
      this.list.push(item);
    });
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
.xin1 {
  color: red;
}
.show {
  width: 375px;
  height: 100px;
  display: flex;
}
.show-img {
  width: 100px;
  height: 100px;
}
.show-title {
  width: 275px;
  height: 100px;
}
.title {
  width: 275px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title-one {
  width: 200px;
  height: 40px;
  font-size: 15px;
}
.title-two {
  width: 30px;
  height: 30px;
}
.show-money {
  width: 275px;
  height: 30px;
  color: red;
  font-size: 15px;
}
.count {
  width: 375px;
  height: 60px;
  margin-top: 10px;
}
.count-title {
  width: 375px;
  height: 20px;
}
.count-shu {
  width: 375px;
  height: 40px;
  display: flex;
}
.count1 {
  width: 100px;
  height: 40px;
  font-size: 15px;
  line-height: 40px;
  color: #666;
}
.count2 {
  width: 100px;
  height: 40px;
  font-size: 15px;
  line-height: 40px;
  color: red;
}
.count3 {
  width: 175px;
  height: 40px;
}
.button {
  width: 375px;
  margin-top: 50px;
}
</style>