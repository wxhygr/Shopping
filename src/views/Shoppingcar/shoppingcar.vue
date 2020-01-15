<template>
  <div>
    <div class="top">
      <div class="gou"></div>
      <div class="address">购物车</div>
    </div>
    <div class="content" v-if="this.usename ===''">
      <div class="denglu">
        <div class="top-one">
          <div class="top-img">
            <img src="../../assets/img/shop.png" width="100px" height="100px" class="top-img2" />
          </div>
        </div>
        <div class="toptitle" @click="clickdenglu">
          <div class="toptitle2">亲，请先去登录</div>
        </div>
      </div>
    </div>

    <div class="content" v-if="this.usename !==''">
      <div class="checkall">
        <div class="checkbox">
          <div class="btn">
            <van-checkbox v-model="checkall" shape="square" checked-color="red" @click="checkAll">全选</van-checkbox>
          </div>
        </div>
        <div class="checkbox-one">
          <div class="checkbox-a">
            <div>合计:</div>
            <div class="checkbox-b">￥{{num}}</div>
          </div>
          <div class="checkbox-a">
            <div>请确认订单</div>
          </div>
          <div class="checkbox-c">
            <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="clickdelete">删除</van-button>
            <van-button
              color="linear-gradient(to right, #4bb0ff, #6149f6)"
              @click="shoppingpayment"
            >去结算</van-button>
          </div>
        </div>
      </div>
      <div class="checkbox-d" v-for="(item,index) in arr" :key="index">
        <div class="checkbox1">
          <div class="butt">
            <van-checkbox
              name="1"
              shape="square"
              checked-color="red"
              v-model="item.check"
              @click="changeone(index)"
            ></van-checkbox>
          </div>
        </div>
        <div class="checkbox2">
          <div class="checkbox21">
            <img :src="item.image_path" width="90px" height="80px" />
          </div>
          <div class="checkbox22">
            <div class="checkbox23">{{item.name}}</div>
            <div class="checkbox24">
              <div class="checkbox25">￥{{item.present_price}}</div>
              <div class="checkbox26">
                <van-stepper
                  v-model="item.count"
                  @change="editCart(item.count,item.cid,item.mallPrice)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      usename: "",
      checkall: false,
      arr: [],
      crr: []
    };
  },
  components: {},
  methods: {
    clickdenglu() {
      this.$router.push({ name: "sign" });
    },
    getCard() {
      this.$api
        .getCard({})
        .then(res => {
          this.arr = res.shopList;
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkAll() {
      this.checkall = !this.checkall;
      this.arr.filter(item => {
        item.check = this.checkall;
      });
    },
    changeone(index) {
      this.arr[index].check = !this.arr[index].check;
      this.checkall = this.arr.every(item => item.check);
    },
    clickdelete() {
      let id = [];
      this.arr.map(item => {
        if (item.check === true) {
          id.push(item.cid);
          Dialog.confirm({
            title: "提示",
            message: "确认删除商品吗？"
          })
            .then(() => {
              // 点击确认键时执行
              this.$api
                .deleteShop(id)
                .then(res => {
                  this.getCard();
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(() => {
              // 点击取消键时执行
              return;
            });
        }
      });
    },
    editCart(val, id, price) {
      this.$api
        .editCart(val, id, price)
        .then(res => {
          this.getCard();
        })
        .catch(err => {
          console.log(err);
        });
    },
    shoppingpayment() {
      this.arr.map(item => {
        if (item.check === true) {
          this.crr.push({
            image_path: item.image_path,
            name: item.name,
            present_price: item.present_price,
            count: item.count,
            cid: item.cid
          });
        }
      });
      this.$store.state.shopping = this.crr
      // localStorage.setItem("crr", JSON.stringify(this.crr));
      // console.log(this.crr);
      this.$router.push({ name: "shoppingpayment" });
    }
  },
  mounted() {
    if (localStorage.usename) {
      this.usename = localStorage.getItem("usename");
    }

    this.getCard();
  },
  watch: {},
  computed: {
    num() {
      let num = 0;
      this.arr.map(item => {
        if (item.check === true) {
          num += item.present_price * item.count;
        }
      });
      return num;
    }
  }
};
</script>

<style scoped lang='scss'>
.top {
  width: 375px;
  height: 40px;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
}
.gou {
  width: 30px;
  height: 40px;
  line-height: 45px;
}
.address {
  width: 100px;
  height: 40px;
  line-height: 40px;
  margin-left: 120px;
}

.checkall {
  width: 375px;
  height: 120px;
  display: flex;
  justify-content: space-around;
}
.checkbox {
  width: 160px;
  height: 120px;
}
.btn {
  margin-top: 50px;
}
.checkbox-one {
  width: 180px;
  height: 120px;
}
.checkbox-a {
  width: 180px;
  height: 30px;
  line-height: 30px;
  display: flex;
}
.checkbox-b {
  color: red;
}
.checkbox-c {
  width: 180px;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.checkbox-d {
  width: 375px;
  height: 80px;
  display: flex;
}
.checkbox1 {
  width: 50px;
  height: 80px;
}
.checkbox2 {
  width: 325px;
  height: 80px;
  display: flex;
}
.butt {
  margin: 27px 0 0 10px;
}
.checkbox21 {
  width: 90px;
  height: 80px;
}
.checkbox22 {
  width: 325px;
  height: 80px;
}
.checkbox23 {
  width: 235px;
  height: 50px;
  color: red;
  font-size: 15px;
}
.checkbox24 {
  width: 235px;
  height: 30px;
  display: flex;
  justify-content: space-between;
}
.checkbox25 {
  width: 100px;
  height: 30px;
  line-height: 30px;
  color: red;
}
.checkbox26 {
  width: 100px;
  height: 30px;
  line-height: 30px;
}
.top-one {
  width: 375px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.top-img {
  width: 150px;
  height: 150px;
  border-radius: 150px;
  background: pink;
}
.top-img2 {
  margin: 20px 0 0 20px;
}
.toptitle {
  width: 375px;
  height: 30px;
  display: flex;
  justify-content: center;
}
.toptitle2 {
  width: 150px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  background: skyblue;
}
</style>