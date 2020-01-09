<template>
  <div>
    <div class="top">
      <div class="gou" @click="clickvan">
        <van-icon name="arrow-left" />
      </div>
      <div class="address">我的收藏</div>
    </div>
    <div class="box" v-for="(item,index) in arr" :key="index">
      <div class="box-one">
           <img :src="item.image_path" width="100px" height="100px">
      </div>
      <div class="box-two">
         <div class="title">{{item.name}}</div>
         <div class="money">￥{{item.present_price}}</div>
         <div class="chengfa">
            <div></div>
            <div class="cha"><van-icon name="close" @click="clickdelete(item)"/></div>
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
      arr:[],
    };
  },
  components: {},
  methods: {
    getCollection() {
      this.$api
        .getCollection()  
        .then(res => {
          this.arr = res.data.list
          console.log(this.arr);
        })
        .catch(err => {
          console.log(err);
        });
    },
    clickvan() {
      this.$router.back();
    },
    clickdelete(val){
         this.$api
        .cancelCollection(val.cid)
        .then(res => {
          Toast.success("删除成功");
          this.getCollection();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getCollection();
  },
  watch: {},
  computed: {}
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
.box{
  width: 375px;
  height: 100px;
  display: flex;
}
.box-one{
  width: 100px;
  height: 100px;
}
.box-two{
  width: 275px;
  height: 100px;
}
.title{
  width: 275px;
  height: 50px;
}
.money{
  width: 275px;
  height: 20px;
  font-size: 15px;
  font-weight: bold;
  color:red;
}
.chengfa{
  width:275px;
  height:30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cha{
  width: 20px;
  height: 20px;
}
</style>