<template>
  <div>
    <div class="box">
      <div class="title">商品推荐</div>
      <div class="commodity">
        <div class="person-wrap" ref="personWrap">
          <ul class="person-list" ref="personTab">
            <li class="person-item" v-for="(item,index) in arr" :key="index">
              <div @click="clickimg(item.goodsId)">
                <img :src="item.image" width="120px" height="150px" />
              </div>
              <div class="text">{{item.goodsName}}</div>
              <div class="money">
                <div>￥{{item.price}}</div>
                <div class="mallprice">￥{{item.mallPrice}}</div>
              </div>
              <div class="shopping" @click="clickshop(item.goodsId)">
                <div class="shop">
                  <van-icon name="cart-o" />
                </div>
                <div class="details" @click="clickimg(item.goodsId)">查看详情</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { Toast } from 'vant';
export default {
  data() {
    return {
      arr: []
    };
  },
  created() {
    this.$nextTick(() => {
      this.personScroll();
    });
  },
  components: {},
  methods: {
    personScroll() {
      // 默认有六个li子元素，每个子元素的宽度为120px
      let width = 17 * 120;
      this.$refs.personTab.style.width = width + "px";
      // this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.personWrap, {
            startX: 0,
            click: true,
            scrollX: true,
            // 忽略竖直方向的滚动
            scrollY: false,
            eventPassthrough: "vertical"
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    recommend() {
      this.$api
        .recommend()
        .then(res => {
          this.arr = res.data.recommend;
        })
        .catch(err => {
          console.log(err);
        });
    },
    clickshop(val) {
      this.$api
        .addShop(val)
        .then(response => {
        })
        .catch(err => {
          console.log(err);
        });
         Toast.success('加入购物车成功');
    },
    clickimg(val) {
      this.$router.push({ name: "detailspage", query: { goodsId: val } });
    }
  },
  mounted() {
    this.recommend();
    this.personScroll();
  },

  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.box {
  width: 375px;
}
.title {
  width: 375px;
  height: 30px;
  font-size: 18px;
  line-height: 30px;
}
.commodity {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.person-wrap {
  width: 100%;
  overflow: hidden;
}
.person-list {
  display: flex;
}
.text {
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.money {
  display: flex;
}
.mallprice {
  font-size: 13px;
  color: #666;
  text-decoration: line-through;
}
.shopping {
  width: 100px;
  height: 30px;
  display: flex;
}
.shop {
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  background: #feca3a;
  color: white;
}
.details {
  width: 70px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: white;
  font-size: 14px;
  background: #ff4c38;
}
</style>