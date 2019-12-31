<template>
  <div>
    <div class="cation">
      <div class="img">
        <div class="box">
          <div class="comtent" v-for="(item,index) in arr" :key="index">
              <img :src="item.image" width="55px" height="55px">
              <div class="box1">{{item.mallCategoryName}}</div>
          </div>
        </div>
      </div>
      <div class="car">
           <img :src="list.PICTURE_ADDRESS" width="355px" height="35px">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        arr:[],
        list:{},
    };
  },
  components: {},
  methods: {
    recommend() {
      this.$api
        .recommend()
        .then(res => {
         this.arr = res.data.category
         this.list = res.data.advertesPicture
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.recommend();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.cation {
  width: 373px;
  height: 150px;
  margin-top: 10px;
}
.img {
  width: 355px;
  height: 100px;
  margin: 5px auto;
  border-radius: 10px;
  box-shadow: 0 0 5px #666;
}
.box {
  width: 355px;
  height: 75px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.comtent {
  width: 58px;
  height: 55px;
}
.box1 {
  font-size: 14px
}
.car{
    width: 355px;
    height: 35px;
    margin:7px auto;
}
</style>