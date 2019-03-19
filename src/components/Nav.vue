<!-- nav -->
<template>
  <div class='nav'>
      <div v-for="(title, index) in Object.keys(data)" :key="index" class="nav-container">
          <p class="nav-title">{{ title }}</p>
          <template v-for="nav in data[title]">
                <div
                    class="nav-items"
                    :key="nav.name"
                    v-if="nav.title">
                    <router-link
                        :to="{name: nav.name}"
                        v-if="nav.name"
                        :class="$route.name===nav.name ? 'active' : ''">
                        {{nav.title}}
                    </router-link>
                    <p v-else class="nav-group">{{nav.title}}</p>
                    <div v-for="item in nav.items" :key="item.name">
                        <router-link
                            :to="{name: item.name}"
                            :class="$route.name===item.name? 'active': ''"
                            class="nav-component">{{item.title}}
                        </router-link>
                    </div>
                </div>
            </template>
      </div>
  </div>
</template>

<script>
import menu from '../json/menu.json'

export default {
  data () {
    return {
      data: menu
    }
  },

  components: {},

  computed: {},

  mounted () {
  },

  methods: {}
}

</script>
<style lang='scss' scoped>
@import "../../libs/styles/common/color";

    .nav {
        padding: 0;
        height: 100%;
        .nav-container {
            margin-bottom: 20px;
        }
        .nav-title {
            font-weight: bold;
            font-size: 16px;
            margin: 8px 0;
            padding-left: 15px;
        }
        .nav-items {
            font-size: 14px;
            font-weight: normal;
            line-height: 1.8;
            .active {
                color: $LightPrimary;
            }
        }
        a {
            display: block;
            padding: 8px 24px;
            position: relative;
            line-height: 1.5;
            cursor: pointer;
            font-weight: normal;
        }

        .nav-group {
            display: block;
            position: relative;
            padding: 6px 0px 6px 24px;
            font-size: 14px;
            font-weight: bold;
        }
        .nav-component {
            display: block;
            position: relative;
            padding: 6px 24px 6px 32px;
            font-size: 14px;
            &:hover {
                color: $LightPrimary;
            }
        }
    }
</style>
