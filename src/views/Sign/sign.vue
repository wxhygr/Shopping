<template>
  <div class="background">
    <div class="top">
      <div class="back">
        <div class="gou">
          <van-icon name="arrow-left" class="c" />
        </div>
      </div>
    </div>
    <div class="button">
      <div class="card">
        <div class="card-one">
          <div class="card-top">登录/注册</div>
          <van-cell-group>
            <van-field v-model="username" placeholder="username" class="usename" />
            <br />
            <van-field v-model="password" type="password" placeholder="Password" class="usename" />
            <br />
            <van-field v-model="phone" label="手机号:" placeholder="仅注册需要" class="usename" />
            <br />
            <van-field
              v-model="sms"
              center
              clearable
              label="短信验证码"
              placeholder="仅注册需要"
              class="usename"
            >
              <van-button slot="button" size="small" type="primary">发送验证码</van-button>
            </van-field>

            <br />
            <div class="nihao">
              <van-field
                v-model="code"
                center
                clearable
                label="验证码"
                placeholder="请输入验证码"
                class="usename"
              ></van-field>
              <!-- 点击验证码 验证码更换 -->
              <div class="code" v-html="codes" @click="clickcode"></div>
              <!-- <div class="code" @click="clickcode"> 
                     <img src="api/verify" ref="captcha">
              </div>-->
            </div>

            <div class="sign">
              <van-button type="primary" class="btn" @click="clicklogin">登录</van-button>
              <van-button type="danger" class="btn" @click="zhuce">注册</van-button>
            </div>
          </van-cell-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      phone: "",
      sms: "",
      code: "",
      codes: ""
    };
  },
  components: {},
  methods: {
    getVerity() {
      this.$api
        .getVerity()
        .then(res => {
          this.codes = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    clickcode() {
      // this.$refs.captcha.src = "/api/verify?time=" + Date.now();
      this.getVerity();
    },
    zhuce() {
      this.$api
        .register({
          nickname: this.username,
          password: this.password,
          verify: this.code
        })
        .then(res => {
          console.log(res);
         localStorage.setItem('usename',this.username)
         //this.$router.push({name:'home'})
        })
        .catch(err => {
          console.log(err);
        });
    },

    clicklogin() {
      this.$api
        .login({
          nickname: this.username,
          password: this.password,
          verify: this.code
        })
        .then(response => {
          console.log(response);
            localStorage.setItem('usename',this.username)
            this.$router.push({name:'my'})
        }).catch(err => {
            console.log(err);
        });
    }
  },
  mounted() {
    this.getVerity();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.background {
  background-image: cover;
  height: 667px;
  background: url("../../assets/img/1.gif") no-repeat;
}
.top {
  width: 375px;
  height: 200px;
}
.button {
  width: 375px;
  height: 450px;
  background-color: white;
}
.back {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background: #777778;
}
.c {
  color: white;
  margin: 11px 0 0 10px;
}
.card {
  width: 350px;
  height: 420px;
  margin: 10px auto;
  box-shadow: 0 0 10px #777778;
}
.card-one {
  width: 330px;
  height: 420px;
  margin: 0 auto;
}
.card-top {
  width: 330px;
  height: 50px;
  font-weight: bold;
  font-size: 25px;
  line-height: 50px;
}
.code {
  width: 130px;
  height: 40px;
}
.usename {
  border-bottom: 1px solid #d9d9d9;
}
.nihao {
  display: flex;
}
.sign {
  width: 330px;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.btn {
  width: 80px;
}
</style>