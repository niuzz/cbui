<!-- header -->
<template>
  <div class="header">
    <div class="logo">
      <img src="../assets/logo.png" alt="logo">
      <span>星拥月 UI组件库</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {};
  },

  components: {},

  computed: {},

  mounted () {},

  methods: {}
};
</script>
<style lang='scss' scoped>
.header {
  width: 100%;
  height: 70px;
  background: #304f73;
  color: #fff;
}
.header .logo {
  float: left;
  margin-left: 60px;
}
.header .logo img {
  width: 70px;
  height: 70px;
}
.header .logo span {
  display: inline-block;
  vertical-align: top;
  height: 70px;
  line-height: 70px;
  font-weight: bold;
}
</style>
