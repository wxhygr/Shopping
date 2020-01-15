<template>
  <div>
    <div class="top">
      <div class="gou" @click="clickvan">
        <van-icon name="arrow-left" />
      </div>
      <div class="adress">订单结算</div>
    </div>

    <!-- <div class="address" >
      <van-contact-card :type="cardType" add-text="添加地址" @click="clickaddress" />
    </div> -->
    <div v-if="this.chose.length === 0">
    <div class="address" >
      <div class="Icon">
        <div class="Icon-one">
          <van-icon name="location-o" size="28" />
        </div>
      </div>
      <div class="comtent"  >
        <div class="comtent-one">
          <div class="name">收货人：{{this.crr.name}}</div>
          <div class="tel">{{this.crr.tel}}</div>
        </div>
        <div class="comtent-two">收货地址：{{this.address}}</div>
        <div class="comtent-three">(收货不便时，可选免费带收货服务)</div>
      </div>

      <div class="Icon">
        <div class="Icon-one">
          <van-icon name="arrow" size="20" @click="clickarrow" />
        </div>
      </div>
    </div>
    <div class="xian"></div>
</div>
     <div v-else>
    <div class="address" >
      <div class="Icon">
        <div class="Icon-one">
          <van-icon name="location-o" size="28" />
        </div>
      </div>
      <div class="comtent" v-for="(item,index) in chose" :key="index">
        <div class="comtent-one">
          <div class="name">收货人：{{item.name}}</div>
          <div class="tel">{{item.tel}}</div>
        </div>
        <div class="comtent-two">收货地址：{{item.address}}</div>
        <div class="comtent-three">(收货不便时，可选免费带收货服务)</div>
      </div>

      <div class="Icon">
        <div class="Icon-one">
          <van-icon name="arrow" size="20" @click="clickarrow" />
        </div>
      </div>
    </div>
    <div class="xian"></div>
</div>

    <!-- 购物车购买的东西 -->
    <div class="shopping">
      <div class="shop" v-for="(item,index) in lists" :key="index">
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
import { Toast } from "vant";
import { longStackSupport } from "q";
export default {
  data() {
    return {
      list: [],
      idDirect: false,
      crr:{},
      address:'',
    };
  },
  components: {},
  methods: {
    clickvan() {
      this.$router.go(-1);
      localStorage.removeItem("chooseids");
    },
    onSubmit() {
      if ( address === '') {
        Toast("请添加地址");
      } else {
        let Id = [];
        let number = 0;
        let count = 0;
        this.lists.map(item => {
          Id.push(item.cid);
          number += item.present_price * item.count;
          count += item.count;
        });
        let address = "";
        address = this.chose[0].address;
        this.$api
          .placeOrder({ 
            orderId: Id,
            totalPrice: number,
            count: count,
            address: address,
            idDirect: this.idDirect
          })
          .then(res => {
            localStorage.removeItem("crr");
            this.$router.push({ name: "home" });
            localStorage.removeItem("chooseids");
            console.log(res);
          })
          .catch(err => {
            console.log(res);
          });
      }
    },
    clickaddress() {
      let num = 1;
      this.$router.push({ name: "address" });
      localStorage.setItem("num", num);
    },
    clickarrow() {
      this.$router.push({ name: "address" });
      localStorage.removeItem("chooseids");
    },
    getDefaultAddress() {
      this.$api
        .getDefaultAddress()
        .then(res => {
           this.crr = res.defaultAdd
           this.address =  `${res.defaultAdd.province}${res.defaultAdd.city}${res.defaultAdd.county}${res.defaultAdd.addressDetail}`
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
   this.getDefaultAddress()
    console.log(this.chose);
  },
  watch: {},
  computed: {
    num() {
      let num = 0;
      this.lists.map(item => {
        num += item.present_price * item.count;
      });
      return num * 100;
    },
    cardType() {},
    lists() {
      if (this.$store.state.list.length > 0) {
        return this.$store.state.list;
      } else {
        return this.$store.state.shopping;
      }
    },
    chose(){
      return this.$store.state.chose
    }
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
.xian {
  width: 375px;
  border: 1px solid #666;
}
</style>