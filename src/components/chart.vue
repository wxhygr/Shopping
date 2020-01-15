<template>
  <div>
    <div class="img">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image.image" class="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: []
    };
  },
  components: {},
  methods: {
    recommend() {
      this.$api
        .recommend()
        .then(res => {
          this.images = res.data.slides;
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
.img {
  width: 373px;
  height: 250px;
  margin-top: 5px;
}
.image {
  width: 373px;
  height: 250px;
}
</style>