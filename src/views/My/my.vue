<template>
  <div>
    <div class="top">会员中心</div>
    <div class="portrait">
      <div class="setup">
        <van-icon name="setting-o" class="tubiao" is-link @click="showPopup" />
      </div>
      <van-popup v-model="show" position="bottom" :style="{ height: '100%' }">
        <div class="top-one">
          <div class="gou" @click="clickvan">
            <van-icon name="arrow-left" />
          </div>
          <div class="address">个人资料</div>
        </div>
        <div class="my">
          <div class="my-one">github:</div>
          <div class="my-two"></div>
        </div>

        <div class="my1">
          <div class="my-one1">头像:</div>
          <div class="my-two1"></div>
        </div>

        <div class="my">
          <div class="my-one">用户名:</div>
          <div class="my-two">
            <van-field v-model="this.usename" />
          </div>
        </div>

        <div class="my">
          <div class="my-one">昵称:</div>
          <div class="my-two">
            <van-field v-model="this.usename" />
          </div>
        </div>

        <div class="my">
          <div class="my-one">性别:</div>
          <div class="my-two">
            <van-field v-model="gender" placeholder="请输入性别" />
          </div>
        </div>

        <div class="my">
          <div class="my-one">邮箱:</div>
          <div class="my-two">
            <van-field v-model="email" placeholder="请输入邮箱" />
          </div>
        </div>

        <div class="my">
          <div class="my-one">出生年月:</div>
          <div class="my-two123">
            <van-datetime-picker
              v-model="currentDate"
              type="date"
              @confirm-button-text = "success" 
              :min-date="minDate"
              :max-date="maxDate"
               class="date"
            />
           </div>
        </div>
      </van-popup>
      <div class="sign">
        <div class="sign-one" v-if="this.usename === ''">
          <img src="../../assets/img/2.jpg" width="90px" height="90px" class="aa" />
        </div>
        <div class="sign-one" v-else-if="this.usename !== ''">
          <img src="../../assets/img/3.jpeg" width="90px" height="90px" class="aa" />
        </div>
      </div>
      <div></div>

      <div class="usename" v-if="this.usename === ''">欢迎您</div>
      <div class="usename" v-else-if="this.usename !== ''">欢迎您:{{this.usename}}</div>

      <div class="login" @click="clicklogin" v-if="this.usename === ''">请登录/注册</div>
      <div class="login" @click="clickloginout" v-else-if="this.usename !== ''">退出登录</div>
    </div>
    <div class="task">
      <div class="task-one">
        <van-icon name="coupon-o" size="45px" class="van" />
        <div class="text">待付款</div>
      </div>
      <div class="task-one">
        <van-icon name="idcard" size="45px" class="van" />
        <div class="text">待支付</div>
      </div>
      <div class="task-one">
        <van-icon name="logistics" size="45px" class="van" />
        <div class="text">待收货</div>
      </div>
      <div class="task-one" @click="evaluationcenter">
        <van-icon name="notes-o" size="45px" class="van" />
        <div class="text">评价</div>
      </div>
      <div class="task-one">
        <van-icon name="points" size="45px" class="van" />
        <div class="text">已完成</div>
      </div>
    </div>
    <div class="order" @click="clickall">
      <div class="left">
        <div>
          <van-icon name="records" size="25px" class="ss" />
        </div>全部订单
      </div>
      <div class="right">></div>
    </div>

    <div class="order" @click="collection">
      <div class="left">
        <div>
          <van-icon name="points" size="25px" class="ss" />
        </div>收藏商品
      </div>
      <div class="right">></div>
    </div>

    <div class="order" @click="clickaddress">
      <div class="left">
        <div>
          <van-icon name="gold-coin-o" size="25px" class="ss" />
        </div>地址管理
      </div>
      <div class="right">></div>
    </div>

    <div class="order">
      <div class="left">
        <div>
          <van-icon name="send-gift-o" size="25px" class="ss" />
        </div>最近浏览
      </div>
      <div class="right">></div>
    </div>
  </div>
</template>

<script>
import Calendar from "vant";
export default {
  data() {
    return {
      gender: "",
      email: "",
      value: "",
      usename: "",
      code: "",
      show: false,
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(2020, 10, 1),
      currentDate: "",
    };
  },
  components: {
    Calendar
  },
  methods: {
    clicklogin() {
      this.$router.push({ name: "sign" });
    },
    clickloginout() {
      this.$api
        .loginOut({})
        .then(res => {
          this.code = res.code;
          console.log(res);
          console.log(this.code);
        })
        .catch(err => {
          console.log(err);
        });
      localStorage.removeItem("usename");
      this.usename = "";
      //this.$router.push({name:"home"})
    },
    clickall() {
      this.$router.push({ name: "order" });
    },
    collection() {
      this.$router.push({ name: "collection" });
    },
    clickaddress() {
      this.$router.push({ name: "address" });
    },
    showPopup() {
      this.show = true;
    },
    clickvan() {
      this.show = false;
    },
    success(){
      
    },
    evaluationcenter(){
      this.$router.push({name:"evaluationcenter"})
    }
  },
  mounted() {
    if (localStorage.usename) {
      this.usename = localStorage.getItem("usename");
    }
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.top {
  width: 375px;
  height: 40px;
  text-align: center;
  line-height: 40px;
}
.portrait {
  width: 375px;
  height: 250px;
  background: #e30c7b;
}
.setup {
  width: 60px;
  height: 30px;
  margin-left: 310px;
}
.tubiao {
  color: white;
  font-size: 22px;
  margin: 5px 0 0 25px;
}
.sign {
  width: 375px;
  height: 90px;
}
.sign-one {
  width: 90px;
  height: 90px;
  border-radius: 90px;
  margin: 0 auto;
}
.aa {
  border-radius: 90px;
}
.usename {
  width: 375px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-weight: bold;
  font-size: 23px;
  color: white;
}
.login {
  width: 100px;
  height: 40px;
  margin: 0 auto;
  text-align: center;
  line-height: 40px;
  color: white;
  font-size: 17px;
}
.task {
  width: 375px;
  height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.task-one {
  width: 70px;
  height: 80px;
}
.van {
  margin: 0 0 0 14px;
}
.text {
  text-align: center;
}
.order {
  width: 375px;
  height: 40px;
  display: flex;
  .left {
    flex: 9;
    display: flex;
    line-height: 40px;
  }
  .right {
    flex: 1;
    line-height: 40px;
  }
  .ss {
    margin-top: 5px;
  }
}
.top-one {
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
.address {
  width: 100px;
  height: 40px;
  line-height: 40px;
  margin-left: 120px;
}
.my {
  width: 375px;
  height: 40px;
  display: flex;
  justify-content: space-around;
}
.my-one {
  width: 80px;
  height: 40px;
  line-height: 40px;
}
.my-two {
  width: 230px;
  height: 40px;
  line-height: 40px;
}
.my1 {
  width: 375px;
  height: 60px;
  display: flex;
  justify-content: space-around;
}
.my-one1 {
  width: 80px;
  height: 60px;
  line-height: 60px;
}
.my-two1 {
  width: 230px;
  height: 60px;
  line-height: 60px;
}
.date{
  display: none;
}
.my-two123 {
  width: 230px;
  height: 40px;
  line-height: 40px;
}
.my-two123:hover .date{
  display: block;
}
</style>