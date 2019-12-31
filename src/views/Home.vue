<template>
  <div>
    <div class="wrapper" ref="wrapper">
      <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
        <div class="top">
          <div class="city" @click="clickcity">成都市</div>
          <div class="search">
            <van-search
              v-model="value"
              placeholder="请输入搜索关键词"
              show-action
              shape="round"
              @search="onSearch"
            >
              <div slot="action" @click="onSearch">搜索</div>
            </van-search>
          </div>
        </div>

        <chart></chart>
        <cation></cation>
      <commodity></commodity> 
        <floor></floor>







        <van-tabbar route>
          <van-tabbar-item replace to="/home" icon="wap-home-o">商城</van-tabbar-item>
          <van-tabbar-item replace to="/category" icon="apps-o">分类</van-tabbar-item>
          <van-tabbar-item replace to="/shoppingcar" icon="shopping-cart-o">购物车</van-tabbar-item>
          <van-tabbar-item replace to="/my" icon="manager-o">我的</van-tabbar-item>
        </van-tabbar>
        <router-view></router-view>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import chart from "../components/chart.vue";
import cation from "../components/classification.vue";
import commodity from "../components/commodity.vue"
import floor from "../components/floor.vue"
export default {
  data() {
    return {
      value: "",
      arr: [],
      count: 0,
      isLoading: false
    };
  },
  components: {
    chart,
    cation,
    commodity,
    floor,
  },
  methods: {
    onSearch() {
      this.$api
        .search({
          value: this.value,
          page: 1
        })
        .then(res => {
          this.arr = res.data.list;
          console.log(this.arr);
        })
        .catch(err => {
          console.log(err);
        });
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 500);
    },
    clickcity(){
      this.$router.push({name:"city"})
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
  display: flex;
}
.city {
  width: 100px;
  height: 50px;
  text-align: center;
  line-height: 50px;
}
.search {
  width: 275px;
  height: 50px;
}

</style>