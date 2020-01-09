<template>
  <div>
    <div class="top">
      <div class="gou" @click="clickvan">
        <van-icon name="arrow-left" />
      </div>
      <div class="adress">评价中心</div>
    </div>
    <div class="img">
      <div class="img-one">
        <img :src="arr.image_path" width="120px" height="120px" />
      </div>
      <div class="title">
        <div>商品评分</div>
        <div class="star">
          <div>
            <van-rate v-model="value" />
          </div>
        </div>
      </div>
    </div>
    <div class="niuyan">
      <van-cell-group>
        <van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="150"
          placeholder="谈谈您的购买感受吧！ 亲"
          show-word-limit
        />
      </van-cell-group>
    </div>
    <div class="imgage">
      <van-uploader v-model="fileList" multiple />
    </div>
    <div class="anonymous">
      <div>
        <van-switch v-model="checked" size="24px" />
      </div>
      <div class="text">匿名评价</div>
    </div>
    <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" size="large" class="btn" @click="submission">提交</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [],
      value: 5,
      message: "",
      fileList: [],
      checked: false
    };
  },
  components: {},
  methods: {
    clickvan() {
      this.$router.back();
    },
    submission(){
        let obj = {
           id:this.arr.cid,
           rate:this.value,
           content:this.message,
           anonymous:this.checked,
           _id:this.arr._id,
           order_id:this.arr.order_id,
           image:this.fileList,
       }
       this.$api.comment(obj).then(res => {
             this.$router.push({name:"evaluationcenter"})
       }).catch(err => {
           console.log(err);
       })
    },
  },
  mounted() {
    this.arr = JSON.parse(this.$route.query.id);
    console.log(this.arr);
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
.img {
  width: 375px;
  height: 120px;
  display: flex;
}
.img-one {
  width: 120px;
  height: 120px;
}
.title {
  width: 255px;
  height: 120px;
}
.star {
  width: 255px;
  height: 80px;
  display: flex;
  align-items: center;
}
.niuyan {
  width: 375px;
  height: 120px;
  margin-top: 10px;
}
.imgage {
  width: 375px;
}
.anonymous {
  width: 375px;
  height: 30px;
  display: flex;
}
.text {
  line-height: 30px;
}
.btn {
  margin-top: 20px;
}
</style>