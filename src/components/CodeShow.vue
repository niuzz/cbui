<template>
  <div class="code-box">
    <div :style="{height: isExpand ? 'auto' : '0'}" class="code-container">
      <slot name="highlight"></slot>
    </div>
    <span class="code-taggle" @click="toggle">{{isExpand ? '隐藏代码' : '显示代码'}}</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isExpand: false
    };
  },
  methods: {
    toggle () {
      this.isExpand = !this.isExpand;
    }
  }
};
</script>

<style lang="scss">
@import "../../libs/styles/common/color";

.code-container {
  width: 100%;
  height: auto;
  overflow: hidden;
  box-sizing: border-box;
  @include _background($Background);
  font-family: Source Code Pro, Monaco, Inconsolata, monospace;
  pre {
    padding: 10px 0;
  }
  code {
    line-height: 22px;
    border: none;
    .hljs-tag {
      @include _color($LightPrimary);
    }
    .hljs-attr {
      @include _color($Badge);
    }
    .hljs-string {
      @include _color($Success);
    }
  }
}

.code-taggle {
  width: 100%;
  text-align: center;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  padding: 10px 0;
  @include _background($Background);
  &:hover {
    @include _color($LightPrimary);
  }
}
</style>
