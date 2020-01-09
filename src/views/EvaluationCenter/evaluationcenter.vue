<template>
  <div>
    <div class="top">
      <div class="gou" @click="clickvan">
        <van-icon name="arrow-left" />
      </div>
      <div class="adress">评价中心</div>
    </div>
    <div class="img">
      <img src="../../assets/img/evaluate.jpg" width="375px" height="180px" />
    </div>
    <van-tabs>
      <van-tab title="待评价">
        <div class="wait" v-for="(item,index) in list" :key="index" >
          <div class="wait-img">
            <img :src="item.image_path" width="100px" height="100px" />
          </div>
          <div class="wait-title">
            <div class="title">{{item.name}}</div>
            <div class="saidan" @click="clickone(item)">
              <div class="ss">
                <div>
                  <van-icon name="chat-o" color="#666" size="18" class="icon" />
                </div>
                <div class="text">评价晒单</div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <!-- //已评价 -->
      <van-tab title="已评价">
         
        <div class="wait" v-for="(item,index) in arr" :key="item._id +index" >
          <div class="wait-img">
            <img :src="item.goods[0].image" width="100px" height="100px" />
          </div>
          <div class="wait-title">
            <div class="title">{{item.content}}</div>
            <div class="saidan1" @click="clicktwo(item._id)">
              <div class="ss">
                <div>
                  <van-icon name="search" size="18" class="icon" />
                </div>
                <div class="text1">查看评价</div>
              </div>
            </div>
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
      list: [],
      arr: []
    };
  },
  components: {},
  methods: {
    clickvan() {
      this.$router.back();
    },
    tobeEvaluated() {
      this.$api
        .tobeEvaluated()
        .then(res => {
          this.list = res.data.list;
        })
        .catch(err => {
          console.log(err);
        });
    },
    clickone(val) {
      this.$router.push({ name: "center", query: { id: JSON.stringify(val) } });
    },
    alreadyEvaluated() {
      this.$api
        .alreadyEvaluated({})
        .then(res => {
          this.arr = res.data.list;
          console.log(this.arr);
        })
        .catch(err => {
          console.log(err);
        });
    },
    clicktwo(val) {
      this.$router.push({ name: "evaluationdetails", query: { id: JSON.stringify(val) } });
    }
  },
  mounted() {
    this.tobeEvaluated();
    this.alreadyEvaluated();
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
  height: 180px;
}
.wait {
  width: 375px;
  height: 100px;
  display: flex;
}
.wait-img {
  width: 100px;
  height: 100px;
}
.wait-title {
  width: 275px;
  height: 100px;
}
.title {
  width: 275px;
  height: 50px;
}
.saidan {
  width: 100px;
  height: 30px;
  border-radius: 30px;
  border: 1px solid red;
  margin: 15px 0 0 160px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ss {
  width: 80px;
  height: 20px;
  display: flex;
}
.icon {
  font-weight: bold;
}
.text {
  line-height: 20px;
  font-size: 14px;
  color: red;
  font-weight: bold;
}
.saidan1 {
  width: 100px;
  height: 30px;
  border-radius: 30px;
  border: 1px solid #666;
  margin: 15px 0 0 160px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.text1 {
  line-height: 20px;
  font-size: 14px;
  color: #666;
  font-weight: bold;
}
</style>