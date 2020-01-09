<template>
  <div>
    <div class="top">
      <div class="gou" @click="clickvan">
        <van-icon name="arrow-left" />
      </div>
      <div class="adress">评论详情</div>
    </div>
    <div class="user">
      <div class="img">
        <img :src='this.avatar' width="80px" height="80px" class="img-one" />
      </div>
      <div class="star">
        <div class="title">{{this.uses}}</div>
        <div class="stars">
          <van-rate v-model="arr.rate" />
        </div>
      </div>
      <div class="time">
        <div class="time-text">{{arr.comment_time}}</div>
      </div>
    </div>
    <div class="comtent">评价内容：{{arr.content}}</div>

    <div class="comtents">
        <div class="comtents-img"><img :src="this.imgs" width="80px" height="80px"></div>
        <div class="comtents-title">{{this.name}} </div>
        <div class="shopcar">
            <div class="shopcar-one">
                 <img src="../../assets/img/shop.png" width="30px" height="30px" class="img-sss" @click="clickshop">
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      id: {},
      arr: {},
      uses: "",
      imgs: "",
      imgages:'',
      avatar:'',
      name:"",
    };
  },
  components: {},
  methods: {
    clickvan() {
      this.$router.back();
    },
    evaluateOne() {
      this.$api
        .evaluateOne(this.id)
        .then(res => {
          this.arr = res.evaluateOne;
          this.imgs = res.evaluateOne.goods[0].image;
          this.uses = res.evaluateOne.user[0].nickname;
          this.avatar = res.evaluateOne.user[0].avatar;
          this.name = res.evaluateOne.goods[0].name;
        })
        .catch(err => {
          console.log(err);
        });
    },
    clickshop(){
        this.$api
        .addShop(this.arr.cid)
        .then(response => {
          if (response.code === 200) {
            Toast.success("加入购物车成功");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.id = JSON.parse(this.$route.query.id);
    this.evaluateOne();
  },
  watch: {},
  computed: {}
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
.user {
  width: 375px;
  height: 80px;
  display: flex;
}
.img {
  width: 80px;
  height: 80px;
  border-radius: 80px;
}
.img-one {
  border-radius: 80px;
}
.star {
  width: 130px;
  height: 80px;
}
.title {
  width: 130px;
  height: 20px;
}
.stars {
  margin-top: 15px;
}
.time {
  width: 165px;
  height: 80px;
  display: flex;
  align-items: center;
}
.time-text {
  font-size: 15px;
}
.comtent {
  width: 375px;
  height: 60px;
}
.comtents{
    width: 375px;
    height: 80px;
    display: flex;
}
.comtents-img{
    width: 80px;
    height: 80px;
}
.comtents-title{
    width: 200px;
    height: 80px;
}
.shopcar{
    width: 95px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.shopcar-one{
    width: 60px;
    height: 60px;
    border-radius: 60px;
    background: #FFE6E2;
}
.img-sss{
    margin:15px 0 0 15px;
}
</style>