<template>
  <div>
    <div class="floor">
      <div class="loucen">1F</div>
      <div class="tuijian">休闲食品</div>
    </div>

    <div v-for="(item,index) in arr" :key="index">
      <img :src="item.image" class="imgea" v-if="index === 0" @click="clickarr(item.goodsId)" />
      <img :src="item.image" class="imga" v-if="index !== 0" @click="clickarr(item.goodsId)" />
    </div>

    <div class="floor">
      <div class="loucen">2F</div>
      <div class="tuijian">新鲜水果</div>
    </div>

    <div v-for="(item,index) in list" :key="index + 'imga'">
      <img :src="item.image" class="imgea" v-if="index === 0" @click="clicklist(item.goodsId)" />
      <img :src="item.image" class="imga" v-if="index !== 0" @click="clicklist(item.goodsId)" />
    </div>

    <div class="floor">
      <div class="loucen">3F</div>
      <div class="tuijian">营养奶品</div>
    </div>

    <div v-for="(item,index) in crr" :key="index + 'imgea'">
      <img :src="item.image" class="imgea" v-if="index === 0"  @click="clickcrr(item.goodsId)" />
      <img :src="item.image" class="imga" v-if="index !== 0"  @click="clickcrr(item.goodsId)" />
    </div>

    <div class="floor">
      <div class="tuijian">热销产品</div>
    </div>

    <div class="product">
      <div class="sale" v-for="(item,index) in hrr" :key="index + 'sale'">
        <div class="sale-one" @click="clickhrr(item.goodsId)">
          <img :src="item.image" width="100%" height="160px" />
        </div>
        <div class="sale-two">{{item.name}}</div>
        <div class="sale-three">
          <div class="sale-four">￥{{item.price}}</div>
          <div class="sale-five">￥{{item.mallPrice}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [],
      list: [],
      crr: [],
      hrr: []
    };
  },
  components: {},
  methods: {
    recommend() {
      this.$api
        .recommend()
        .then(res => {
          this.arr = res.data.floor1;
          this.list = res.data.floor2;
          this.crr = res.data.floor3;
          console.log(this.crr);
          this.hrr = res.data.hotGoods;
        })
        .catch(err => {
          console.log(err);
        });
    },
    clickarr(val) {
      this.$router.push({ name: "detailspage", query: { goodsId: val } });
    },
    clicklist(val) {
      this.$router.push({ name: "detailspage", query: { goodsId: val } });
    },
    clickcrr(val) {
      this.$router.push({ name: "detailspage", query: { goodsId: val } });
    },
    clickhrr(val){
       this.$router.push({ name: "detailspage", query: { goodsId: val } });
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
.floor {
  width: 375px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  background: #ededed;
}
.loucen {
  width: 25px;
  height: 25px;
  border-radius: 25px;
  text-align: center;
  line-height: 25px;
  font-size: 13px;
  background: red;
  color: white;
}
.tuijian {
  width: 100px;
  height: 25px;
  line-height: 25px;
  font-size: 18px;
  color: red;
}
.imgea {
  float: left;
  width: 187px;
  height: 230px;
}
.imga {
  float: left;
  width: 187px;
  height: 120px;
}
.product {
  width: 375px;
  display: flex;
  flex-wrap: wrap;
}
.sale {
  width: 185px;
  height: 200px;
  border-bottom: 1px solid #f5f5f5;
  border-right: 1px solid #f5f5f5;
}
.sale-one {
  width: 100%;
  height: 160px;
}
.sale-two {
  width: 100%;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: red;
  font-size: 15px;
}
.sale-three {
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: center;
}
.sale-four {
  font-size: 15px;
  color: red;
  line-height: 20px;
}
.sale-five {
  font-size: 13px;
  color: #666;
  line-height: 20px;
  text-decoration: line-through;
}
</style>