<template>
  <div>
    <van-tabs>
      <van-tab title="商品详情">
        <div v-html="this.arr.detail"></div>
      </van-tab>
      <van-tab title="商品评论">
        <div class="box">
          <div v-for="(item,index) in comment" :key="index" class="both">
            <div class="title">
              <div class="titleone">
                <img :src="avatar" width="60px" height="60px" class="imgs" />
              </div>
              <div class="username">
                {{item.user[0].nickname}}
                <div>
                  <van-rate v-model="item.rate" size="14" color="red" />
                </div>
              </div>
              <div class="time">{{item.comment_time}}</div>
            </div>
            <div class="content">{{item.content}}</div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsId: "",
      arr: {},
      _id: "",
      comment: {},
      avatar: ""
    };
  },
  components: {},
  methods: {
    goodOne() {
      this.$api
        .goodOne(this.goodsId)
        .then(res => {
          this.comment = res.goods.comment;
          this.arr = res.goods.goodsOne;
          this._id = res.goods.goodsOne._id;
          this.avatar = res.goods.comment[0].user[0].avatar;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.goodsId = this.$route.query.goodsId;
    this.goodOne();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.box {
  width: 375px;
}
.both {
  width: 375px;
  height: 120px;
}
.title {
  width: 375px;
  height: 60px;
  display: flex;
}
.titleone {
  width: 60px;
  height: 60px;
}
.imgs {
  border-radius: 60px;
}
.username {
  width: 100px;
  height: 60px;
}
.time {
  width: 215px;
  height: 60px;
  text-align: right;
}
.comtent {
  width: 375px;
  height: 40px;
}
</style>