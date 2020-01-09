<template>
  <div>
    <div class="box">
      <div class="box-one">
        <div class="top">
          <div class="gou" @click="clickvan">
            <van-icon name="arrow-left" />
          </div>
          <div class="address">编辑地址</div>
        </div>

        <van-address-edit
          :area-list="areaList"
          show-delete
          show-set-default
          show-search-result
          :search-result="searchResult"
          :address-info="addressinfo"
          @save="onSave"
          @delete="onDelete"
        />
      </div>
    </div>
  </div>
</template>

<script>
// 引入城市的信息
import Vue from "vue";
import areaList from "../../area.js";
Vue.prototype.areaList = areaList;
import { Toast } from "vant";

export default {
  data() {
    return {
      areaList,
      searchResult: [],
      address: [],
      addressinfo: {}
    };
  },
  components: {},
  methods: {
    onSave(content) {
      if (this.$route.query.crr) {
        let obj = {
          name: content.name,
          tel: content.tel,
          isDefault: content.isDefault,
          province: content.province,
          city: content.city,
          county: content.county,
          addressDetail: content.addressDetail,
          id: this.addressinfo._id
        };
        this.$api
          .postAddress(obj)
          .then(res => {
            console.log(res);
            Toast.success("修改地址成功");
          })
          .catch(err => {
            console.log(err);
          });
        this.$router.push({ name: "address" });
      } else {
        this.$api
          .postAddress(content)
          .then(res => {
            console.log(res);
            Toast.success("新建地址成功");
          })
          .catch(err => {
            console.log(err);
          });
        this.$router.push({ name: "address" });
      }
    },
    onDelete() {
      this.$api
        .deleteAddress(this.addressinfo._id)
        .then(res => {
          console.log(res);
          this.$router.push({ name: "address" });
        })
        .catch(err => {
          console.log(err);
        });
    },
    clickvan() {
      this.$router.back();
    }
  },
  mounted() {
    if (this.$route.query.crr) {
      this.address = this.$route.query.crr;
      this.addressinfo = this.address[0];
    }
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.box {
  width: 375px;
  height: 667px;
}
.box-one {
  width: 360px;
  height: 667px;
  margin: 0 auto;
}
.top {
  width: 360px;
  height: 30px;
  border-bottom: 1px solid #d9d9d9;
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