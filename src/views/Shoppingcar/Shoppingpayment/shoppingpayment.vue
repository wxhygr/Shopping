<template>
  <div>
    <div class="top">
      <div class="gou" @click="clickvan">
        <van-icon name="arrow-left" />
      </div>
      <div class="adress">订单结算</div>
    </div>

    <div class="address">
      <van-contact-card :type="cardType" add-text="添加地址" @click="clickaddress" />

      <!-- <div class="Icon">
        <div class="Icon-one">
          <van-icon name="location-o" size="28" />
        </div>
      </div>
      <div class="comtent">
        <div class="comtent-one">
          <div class="name">收货人：</div>
          <div class="tel">12312341234</div>
        </div>
        <div class="comtent-two">收货地址：</div>
        <div class="comtent-three">(收货不便时，可选免费带收货服务)</div>
      </div>

      <div class="Icon">
        <div class="Icon-one">
          <van-icon name="arrow" size="20" />
        </div>
      </div>-->
    </div>
    <!-- 购物车购买的东西 -->
    <div class="shopping">
      <div class="shop" v-for="(item,index) in arr" :key="index">
        <div class="img">
          <div>
            <img :src="item.image_path" width="90px" height="90px" />
          </div>
        </div>
        <div class="shop-text">
          <div class="text">{{item.name}}</div>
          <div class="money">
            <div class="money-one">￥{{item.present_price}}</div>
            <div class="count">×{{item.count}}</div>
          </div>
        </div>
      </div>
    </div>

    <van-submit-bar :price="num" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: []
    };
  },
  components: {},
  methods: {
    clickvan() {
      this.$router.back();
    },
    onSubmit() {
      let Id = [];
      let number = 0;
      let count = 0;
      this.arr.map(item => {
        Id.push(item.cid);
        number += item.present_price * item.count;
        count += item.count;
      });
      this.$api
        .placeOrder({
          orderId: Id,
          totalPrice: number,
          count: count,
          idDirect: true
        })
        .then(res => {
          localStorage.removeItem("crr");
          this.arr = '',
          this.$router.push({name:"home"})
          console.log(res);
        })
        .catch(err => {
          console.log(res);
        });
    },

    clickaddress() {
      this.$router.push({ name: "address" });
    }
  },
  mounted() {
    if (this.$route.query.obj) {
      this.arr = this.$route.query.obj;
    } else if (JSON.parse(localStorage.getItem("crr"))) {
      this.arr = JSON.parse(localStorage.getItem("crr"));
    }

    console.log(this.arr);
    console.log(this.num);
  },
  watch: {},
  computed: {
    num() {
      let num = 0;
      this.arr.map(item => {
        num += item.present_price * item.count;
      });
      return num * 100;
    },
    cardType() {}
  }
};
</script>

<style scoped lang='scss'>
.top {
  width: 360px;
  height: 40px;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
}
.gou {
  width: 30px;
  height: 40px;
  line-height: 40px;
}
.adress {
  width: 100px;
  height: 40px;
  line-height: 40px;
  margin-left: 120px;
}
.address {
  width: 375px;
  height: 100px;
  display: flex;
}
.Icon {
  width: 30px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.Icon-one {
  width: 25px;
  height: 25px;
}
.comtent {
  width: 315px;
  height: 100px;
}
.comtent-one {
  width: 315px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.name {
  width: 120px;
  height: 30px;
  line-height: 30px;
}
.tel {
  width: 120px;
  height: 30px;
  line-height: 30px;
}
.comtent-two {
  width: 315px;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
}
.comtent-three {
  width: 315px;
  height: 30px;
  line-height: 30px;
  color: skyblue;
  font-size: 15px;
}
.shopping {
  width: 375px;
}
.shop {
  width: 375px;
  height: 100px;
  display: flex;
}
.img {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.shop-text {
  width: 275px;
  height: 100px;
}
.text {
  width: 275px;
  height: 60px;
  color: red;
}
.money {
  width: 275px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.money-one {
  width: 100px;
  height: 30px;
  line-height: 30px;
  color: red;
  font-weight: bold;
}
.count {
  width: 50px;
  height: 30px;
  line-height: 30px;
  font-size: 15px;
}
</style>