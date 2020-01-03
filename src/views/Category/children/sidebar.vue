<template>
  <div>
    <van-sidebar v-model="activeKey">
      <van-sidebar-item  v-for="(item,index) in arr" :key="index" title="item.mallCategoryName" />
    </van-sidebar>
  </div>
</template>

<script>  
export default {
  data() {
    return {
      activeKey: 0,
      arr:[],
    };
  },
  components: {},
  methods: {
    recommend() {
      this.$api
        .recommend()
        .then(res => {
          // console.log(res);
          this.arr = res.data.category
          console.log(this.arr);
        })
        .catch(err => {
          console.log(err);
        });
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
</style>