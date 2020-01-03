<template>
  <div>
    <div class="top">商品分类</div>
    <div>
      <sidebar></sidebar>
    </div>
  </div>
</template>

<script>
import sidebar from "../Category/children/sidebar.vue";
export default {
  data() {
    return {};
  },
  components: {
    sidebar
  },
  methods: {},
  mounted() {},
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
</style>