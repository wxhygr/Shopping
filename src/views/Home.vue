<template>
  <div>
    <div class="wrapper" ref="wrapper">
      <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
        <div class="top">
          <div class="city" @click="clickcity">成都市</div>
          <div class="search">
            <van-search
              placeholder="请输入搜索关键词"
              show-action
              shape="round"
              @search="onSearch"
              @focus="showPopup"
              @input="onSearch"
              is-link
              v-model="value"
            >
              <div slot="action" v-if="this.show === false">搜索</div>
              <div slot="action" v-else-if="this.show === true" @click="clickquxiao">取消</div>
            </van-search>
            <van-popup :overlay="overlay" v-model="show" position="left" :style="{ height: '85%' }">
              <div class="neirong">
                <div class="neirong-one" v-for="(item,index) in arr" :key="index" @click="clickcomtent(item.id)">
                  <div class="img">
                    <div class="img-one">
                      <img :src="item.image" width="58px" height="50px" />
                    </div>
                  </div>
                  <div class="comtent" >
                    <div class="comtent-one">{{item.name}}</div>
                    <div class="comtent-two">
                      <div class="sale-four">￥{{item.orl_price}}</div>
                      <div class="sale-five">￥{{item.present_price}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </van-popup>
          </div>
        </div>

        <chart></chart>
        <cation></cation>
        <commodity></commodity>
        <floor></floor>

        <router-view></router-view>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import chart from "../components/chart.vue";
import cation from "../components/classification.vue";
import commodity from "../components/commodity.vue";
import floor from "../components/floor.vue";
export default {
  data() {
    return {
      show: false,
      value: "",
      arr: [],
      count: 0,
      isLoading: false,
      overlay: false
    };
  },
  components: {
    chart,
    cation,
    commodity,
    floor
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
        })
        .catch(err => {});
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 500);
    },
    clickcity() {
      this.$router.push({ name: "city" });
    },
    showPopup() {
      this.show = true;
    },
    clickquxiao() {
      this.show = false;
      this.value = "";
    },
    clickcomtent(val){
      this.$router.push({name:"detailspage",query:{goodsId:val}})
    }
  },
  mounted() {
    
  },
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
.neirong {
  width: 375px;
}
.neirong-one {
  width: 375px;
  height: 60px;
  line-height: 40px;
  font-size: 14px;
  display: flex;
  .img {
    width: 100px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .comtent {
    width: 275px;
    height: 60px;
    .comtent-one {
      width: 275px;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
       font-size: 15px;
    }
    .comtent-two {
      width: 275px;
      height: 30px;
      display: flex;
    }
  }
}
.img-one {
  width: 50px;
  height: 50px;
}
.sale-four {
  font-size: 15px;
  color: red;
  line-height: 30px;
}
.sale-five {
  font-size: 13px;
  color: #666;
  line-height: 30px;
  text-decoration: line-through;
}
</style>