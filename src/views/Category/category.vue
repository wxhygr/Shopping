<template>
  <div>
    <div class="top">商品分类</div>
    <div class="top-one">
      <div class="top-three">
        <van-sidebar v-model="activeKey" @change="Onchange">
          <van-sidebar-item
            v-for="(item,index) in arr"
            :key="index"
            :title="item.mallCategoryName"
          />
        </van-sidebar>
      </div>

      <div class="top-two">
        <van-tabs v-model="active" @click="clickss">
          <div v-for="(item1,index) in mallSubName" :key="index">
            <van-tab :title="item1.mallSubName" :name="item1.mallSubId">
              <div v-for="(item2,index) in crr" :key="index">
                <div class="box" @click="clickdetail(item2.id)">
                  <div class="box-one">
                    <div class="box-one1">
                      <img :src="item2.image" width="75px" height="65px" />
                    </div>
                  </div>
                  <div class="box-two">
                    <div class="box-two1">{{item2.name}}</div>
                    <div class="box-two2">
                      <div class="present_price">￥{{item2.present_price}}</div>
                      <div class="orl_price">￥{{item2.orl_price}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </van-tab>
          </div>
        </van-tabs>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeKey: 0,
      active: 0,
      arr: [],
      mallSubName: [],
      mallSubId: "",
      crr: [],
      mallCategoryId: ""
    };
  },
  components: {},
  methods: {
    recommend() {
      // 获取所有商品的信息
      this.$api
        .recommend()
        .then(res => {
          this.arr = res.data.category;
          this.mallSubName = res.data.category[0].bxMallSubDto;
          if (res.code === 200) {
            this.Onchange(0);
          }
          if (this.$route.query.mallCategoryId > 0) {
            //获取到的下标小于0是，侧边栏的下边为1所以要减去1
            this.activeKey = this.$route.query.mallCategoryId - 1;
            // 重新获取上边的值
            this.mallSubName = this.arr[this.activeKey].bxMallSubDto;
            //监听侧边栏的下标，改变它的ID和值
            this.Onchange(this.activeKey);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 通过点击事件来获取顶部每一项的数据
    clickss(val) {
      this.$api
        .category(val)
        .then(res => {
          this.crr = res.dataList;
        })
        .catch(err => {
          console.log(err);
        });
    },
    Onchange(index) {
      this.active = 0;
      //获取侧边栏的下标
      this.mallSubName = this.arr[index].bxMallSubDto;
      //获取侧边栏的ID
      this.mallSubId = this.mallSubName[0].mallSubId;
      // 点击刷新每一项的值
      this.clickss(this.mallSubId);
    },
    clickdetail(val){
      this.$router.push({name:"detailspage",query:{goodsId:val}})
    }
  },
  mounted() {
    this.recommend();
    this.mallCategoryId = this.$route.query.mallCategoryId;
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.top {
  width: 375px;
  height: 40px;
  text-align: center;
  line-height: 40px;
}
.top-one {
  display: flex;
}
.top-two {
  width: 275px;
}
.top-three {
  width: 100px;
}
.box {
  width: 275px;
  height: 70px;
  display: flex;
}
.box-one {
  width: 80px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box-one1 {
  width: 80px;
  height: 65px;
}
.box-two {
  width: 195px;
  height: 70px;
}
.box-two1 {
  width: 195px;
  height: 40px;
  color: red;
}
.box-two2 {
  width: 195px;
  height: 30px;
  display: flex;
  line-height: 30px;
}
.present_price {
  color: red;
}
.orl_price {
  font-size: 14px;
  text-decoration: line-through;
  color: #666;
}
</style>