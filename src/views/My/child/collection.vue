<template>
  <div>
    <div class="top">
      <div class="gou" @click="clickvan">
        <van-icon name="arrow-left" />
      </div>
      <div class="address">我的收藏</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1
    };
  },
  components: {},
  methods: {
    getCollection() {
      this.$api
        .getCollection()
        .then(res => {

          console.log(res);
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
    this.getCollection();
  },
  watch: {},
  computed: {}
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
  line-height: 45px;
}
.address {
  width: 100px;
  height: 40px;
  line-height: 40px;
  margin-left: 120px;
}
</style>