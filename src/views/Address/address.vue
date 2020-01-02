<template>
  <div>
    <div class="box">
      <div class="box-one">
        <div class="top">
          <div class="gou">
            <van-icon name="arrow-left" />
          </div>
          <div class="address">地址列表</div>
        </div>
        <van-address-list
          v-model="chosenAddressId"
          :list="list"
          default-tag-text="默认"
          @add="onAdd"
          @edit="onEdit"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chosenAddressId: "1",
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室"
        },
        {
          id: "2",
          name: "李四",
          tel: "1310000000",
          address: "浙江省杭州市拱墅区莫干山路 50 号"
        }
      ]
    };
  },
  components: {},
  methods: {
    onAdd() {
      this.$router.push({ name: "addressAdit" });
    },

    onEdit(item, index) {
      this.$router.push({ name: "addressAdit" });
    },
    getAddress(){
      this.$api.getAddress().then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    }
  },
  mounted() {
    this.getAddress()
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.box {
  width: 375px;
}
.box-one {
  width: 360px;
  margin: 0 auto;
}
.top {
  width: 360px;
  height: 30px;
  border-bottom:1px solid #d9d9d9;
  display: flex;
 
}
.gou {
  width: 30px;
  height: 30px;
  line-height: 30px;
}
.address {
  width: 100px;
  height: 30px;
  line-height: 25px;
  margin-left: 120px;
}
</style>