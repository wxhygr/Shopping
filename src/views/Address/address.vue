<template>
  <div>
    <div class="box">
      <div class="box-one">
        <div class="top">
          <div class="gou">
            <van-icon name="arrow-left" @click="clickvan" />
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
      chosenAddressId: "",
      arr: [],
      list: [],
      num: 0,
      number: 0
    };
  },
  components: {},
  methods: {
    onAdd() {
      this.$router.push({ name: "addressAdit" });
    },

    onEdit(item, index) {
      let crr = [];
      crr = this.arr.filter(item1 => {
        return item1._id === item.id;
      });
      item._id;
      console.log(crr);
      this.$router.push({ name: "addressAdit", query: { crr: crr } });
    },
    getAddress() {
      this.$api
        .getAddress()
        .then(res => {
          this.arr = res.address;
          this.arr.map((item, index) => {
            this.list.push({
              id: item._id,
              name: item.name,
              tel: item.tel,
              address: `${item.province}${item.city}${item.county}${item.addressDetail}`,
              isDefault: item.isDefault
            });
            if (item.isDefault) {
              this.chosenAddressId = item._id;
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    clickvan() {
       if (this.number == 20) {
        this.$router.back();
        this.number = 10
      }
      let chose = [];
      chose = this.list.filter(item => {
        return this.chosenAddressId === item.id;
      });
      
      if (this.num === "1") {
        this.num = 0;
        this.$router.push({
          name: "shoppingpayment",
          query: { chooseids: chose }
        });
      }
       this.$store.state.chose = chose
      localStorage.setItem("chooseids", JSON.stringify(chose));
    }
  },
  mounted() {
    this.num = localStorage.getItem("num");
    this.number = this.$route.query.num;
     this.getAddress();
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
  line-height: 40px;
  margin-left: 120px;
}
</style>