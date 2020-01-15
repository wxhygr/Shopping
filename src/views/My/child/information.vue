<template>
  <div>
    <div class="my">
      <div class="my-one">github:</div>
      <div class="my-two">
        <van-field v-model="ruleform.github" placeholder="请输入github" />
      </div>
    </div>

    <div class="my1">
      <div class="my-one1">头像:</div>
      <div class="my-two1">
         <img :src="this.ruleform.avatar"  width="60px" height="60px;">
         
      </div>
    </div>

    <div class="my">
      <div class="my-one">用户名:</div>
      <div class="my-two">
        <van-field v-model="ruleform.nickname" placeholder="请输入用户名" />
      </div>
    </div>

    <div class="my">
      <div class="my-one">昵称:</div>
      <div class="my-two">
        <van-field v-model="ruleform.username" placeholder="请输入昵称" />
      </div>
    </div>

    <div class="my">
      <div class="my-one">性别:</div>
      <div class="my-two">
        <van-field v-model="ruleform.gender" placeholder="请输入性别" />
      </div>
    </div>

    <div class="my">
      <div class="my-one">邮箱:</div>
      <div class="my-two">
        <van-field v-model="ruleform.email" placeholder="请输入邮箱" />
      </div>
    </div>

    <div class="my">
      <div class="my-two123">
        <van-cell title="选择日期" :value="ruleform.date" @click="show = true" />
        <!-- <van-calendar v-model="show" @confirm="onConfirm" /> -->
        <van-calendar v-model="show" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm"/>
      </div>
    </div>
    <div class="button">
      <div class="button-one"><van-button type="primary" size="large" @click="preservation">保存</van-button></div>
    </div>
    <div class="button3">
      <div class="button-one"><van-button  size="large" @click="clickquxiao">取消</van-button></div>
    </div>



  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      minDate: new Date(2019, 7, 1),
      maxDate: new Date(2020, 12, 31),
      ruleform: {
        github: "",
        nickname: "",
        username: "",
        gender: "",
        email: "",
        avatar: "",
        day:'',
        month:"",
        year:'',
        date: "",
      },
     
    };
  },
  components: {},
  methods: {
    success() {},
    formatDate(date) {
      this.ruleform.month = date.getMonth() + 1
      this.ruleform.day = date.getDate()
      this.ruleform.year = date.getFullYear()
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      this.show = false;
      this.ruleform.date = this.formatDate(date);
    },
    user(){
      this.$api.user({}).then(res => {
        this.ruleform = res.userInfo
        this.ruleform.date = `${res.userInfo.year}/${res.userInfo.month}/${res.userInfo.day}`
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    },
    preservation(){
      this.$api.saveUser({
        gender:this.ruleform.gender,
        email:this.ruleform.email,
        year:this.ruleform.year,
        month:this.ruleform.month,
        day:this.ruleform.day,
        id:this.ruleform._id,
        nickname:this.ruleform.nickname,
      }).then(res => {
        console.log(res);
      }).then(err => {
        console.log(err);
      })
    },
    clickquxiao(){
      
    }
  },
  mounted() {
     this.user()
    if (localStorage.usename) {
      this.ruleform.usename = localStorage.getItem("usename");
    }
   
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
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
.date {
  display: none;
}
.my-two123 {
  width: 375px;
  height: 40px;
  margin-top: 10px;
}
.button{
  width: 375px;
  height: 60px;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.button-one{
  width: 300px;
  height: 45px;
}
.button3{
  width: 375px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>