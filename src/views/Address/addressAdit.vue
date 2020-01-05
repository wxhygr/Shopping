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
          :area-columns-placeholder="['请选择', '请选择', '请选择']"
          @save="onSave"
          @delete="onDelete"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import areaList from "../../area.js"
Vue.prototype.areaList = areaList


export default {
  data() {
    return {
          areaList,
      searchResult: []
    };
  },
  components: {},
  methods: {
      
      onSave(content) {
       let len = this.searchResult.length + 1;
       this.$api.postAddress(`/address`,{
           id:len,
           name:content.name,
           tel:content.tel,
           province:content.province,
           city:content.city,
           county:content.county,
           is_default:content.is_default,
           address:content.province + content.city + content.county + content.address_detail,
            }).then(res => {
           console.log(res);
           }).catch(err => {
               console.log(err);
           })
    },
    onDelete() {
          this.$api.deleteAddress({
              id:this.len,
          }).then(res => {
              console.log(res);
          }).catch(err => {
              console.log(err);
          })
    },
    clickvan(){
        this.$router.back()
    }
  },
  mounted() {
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