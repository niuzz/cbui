<template>
  <div id="app">
    <main-header></main-header>
    <div class="content clearfix" ref="content">
      <menu-nav class="nav"></menu-nav>
      <div class="nav-right" v-if="anchors.length"></div>
      <router-view class="doc"/>
    </div>
  </div>
</template>

<script>
import mainHeader from './components/Header';
import menuNav from './components/Nav';

export default {
  name: 'App',
  components: {
    mainHeader,
    menuNav
  },
  data () {
    return {
      anchors: []
    };
  },
  watch: {
    '$route.path' () {
      this.$nextTick(() => {
        // 兼容 IE11 浏览器，将 NodeList 类似数组转成数组
        let h3s = Array.prototype.slice.call(
          this.$refs.content.querySelectorAll('h3')
        );
        this.anchors = h3s;
        h3s.forEach((el, index) => {
          el.id = `title${index}`;
        });
      });
    }
  }
};
</script>

<style lang="scss">
#app {
  margin: 0 auto;
}

.content {
  width: 1400px;
  padding: 0;
  margin: 0 auto;
  box-shadow: rgba(223, 225, 230, 0.5) 0px 4px 30px 0px;
  height: auto;
  position: relative;
}

.nav {
  float: left;
  width: 200px;
}

.nav-right {
  position: absolute;
  top: 0;
  left: 1400px;
  z-index: 10000;
}

.doc {
  min-width: 1000px;
  float: left;
  border-left: 1px solid #eaeefb;
  padding: 20px;
}
</style>
