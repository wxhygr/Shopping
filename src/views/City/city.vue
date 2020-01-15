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
        <van-search v-model="search" placeholder="请输入搜索关键词" />
      </form>
    </div>
    <div class="bottom">
      <div class="current">当前城市</div>
      <div class="current-city">
        <div class="current-city3">成都市</div>
      </div>

      <div class="current">热门城市</div>

      <div class="current-city2">
        <div class="current-city1" v-for="(item,index) in arr" :key="index">{{item.name}}</div>
      </div>

      <div v-if="searches === ''">
        <van-index-bar :index-list="indexList">
          <div v-for="(item) in indexList" :key="item.id">
            <van-index-anchor :index="item"></van-index-anchor>
            <div v-for="(item1,index) in crr" :key="item1.id">
              <div v-if="index === item">
                <div v-for="(item3) in item1" :key="item3.id">
                  <div class="city">{{item3.name}}</div>
                </div>
              </div>
            </div>
          </div>
        </van-index-bar>
      </div>

     <div v-else>
      <div v-for="(item,index) in searches" :key="index">
             {{item.name}}
               </div>
      </div>

    </div>
  </div>
</template>

<script>
// 引入城市的信息
import Vue from "vue";
import areaList from "../../city.js";
Vue.prototype.areaList = areaList;

export default {
  data() {
    return {
      search: "",
      areaList,
      arr: [],
      crr: {},
      indexList: [],
      Nlist: [],
    };
  },
  components: {},
  methods: {
    clickvan() {
      this.$router.back();
    }
  },
  mounted() {
    this.arr = areaList.data.hotCities;
    this.crr = areaList.data.cities;
    Object.keys(this.crr).map(item => {
      this.Nlist.push(...this.crr[item]);
    });
    // this.Nlist = areaList.data.cities
    console.log(this.Nlist);

    for (let i in this.crr) {
      this.indexList.push(i);
    }
  },
  watch: {},
  computed: {
    searches() {
      return this.Nlist.filter(item => {
        return JSON.stringify(item).includes(this.search);
      });
    }
  }
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
  width: 368px;
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
.current-city3 {
  width: 100px;
  height: 30px;
  border: 1px solid #666;
  margin-left: 10px;
  text-align: center;
  line-height: 30px;
}
.city {
  width: 360px;
  height: 20px;
  line-height: 20px;
  margin-left: 10px;
}
</style>