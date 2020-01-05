<template>
  <div>
    <div class="top">
      <div class="gou" @click="clickvan">
        <van-icon name="arrow-left" />
      </div>
      <div class="address">城市列表</div>
    </div>

    <div class="search">
      <form action="/">
        <van-search v-model="value" placeholder="请输入搜索关键词" />
      </form>
    </div>
    <div class="bottom">
      <div class="current">当前城市</div>
      <div class="current-city">
        <div class="current-city1">成都市</div>
      </div>

      <div class="current">热门城市</div>

       <div class="current-city2">
        <div class="current-city1">成都市</div>
         <div class="current-city1">成都市</div>
          <div class="current-city1">成都市</div>
           <div class="current-city1">成都市</div>
            <div class="current-city1">成都市</div>
             <div class="current-city1">成都市</div>
            
       </div>


    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: ""
    };
  },
  components: {},
  methods: {
    clickvan() {
      this.$router.back();
    }
  },
  mounted() {},
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
  line-height: 40px;
}
.address {
  width: 100px;
  height: 40px;
  line-height: 35px;
  margin-left: 120px;
}
.bottom {
  width: 375px;
  height: 667px;
  border: 1px solid red;
}
.search {
  width: 375px;
  height: 50px;
  background: #f2f2f2;
}
.current {
  width: 375px;
  height: 20px;
  line-height: 20px;
}
.current-city {
  width: 375px;
  height: 50px;
  display: flex;
  align-items: center;
}
.current-city2 {
  width: 375px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
.current-city1 {
  width: 100px;
  height: 30px;
  border: 1px solid #666;
  margin-top: 5px;
  text-align: center;
  line-height: 30px;
}
</style>