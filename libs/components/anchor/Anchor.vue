<template>
  <component
    :is="wrapperComponent"
    :offset-top="offsetTop"
    :offset-bottom="offsetBottom"
    @on-change="handleAffixStateChange"
  >
    <div :class="wrapperCls" :style="wrapperStyle">
      <div :class="prefixCls">
        <div :class="inkCls">
          <span v-show="showInk" :class="inkBallCls" :style="inkBallStyle"></span>
        </div>
        <slot></slot>
      </div>
    </div>
  </component>
</template>
<script>
import {
  scrollTop,
  findComponentsDownward,
  sharpMatcherRegx
} from '../../utils/assist';
import { prefix } from '../../utils/common';
import { on, off } from '../../utils/dom';
const prefixCls = `${prefix}anchor`;

export default {
  name: prefixCls,
  provide () {
    return {
      anchorCom: this
    };
  },
  props: {
    affix: {
      type: Boolean,
      default: false
    },
    offsetTop: {
      type: Number,
      default: 0
    },
    offsetBottom: Number,
    bounds: {
      type: Number,
      default: 5
    },
    container: null,
    showInk: {
      type: Boolean,
      default: false
    },
    scrollOffset: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      prefixCls,
      isAffixed: false,
      inkTop: 0,
      animating: false,
      currentLink: '',
      currentId: '',
      scrollContainer: null,
      scrollElement: null,
      titlesOffsetArr: [],
      wrapperTop: 0,
      upperFirstTitle: true
    };
  },
  computed: {
    wrapperComponent () {
      return this.affix ? `${prefix}affix` : 'div';
    },
    wrapperCls () {
      return `${prefixCls}-wrapper`;
    },
    wrapperStyle () {
      return {
        maxHeight: this.offsetTop
          ? `calc(100vh - ${this.offsetTop}px)`
          : '100vh'
      };
    },
    inkCls () {
      return `${prefixCls}-ink`;
    },
    inkBallCls () {
      return `${prefixCls}-ink-ball`;
    },
    inkBallStyle () {
      return {
        top: `${this.inkTop}px`
      };
    },
    containerIsWindow () {
      return this.scrollContainer === window;
    }
  },
  watch: {
    $route () {
      this.handleHashChange();
      this.$nextTick(() => {
        this.handleScrollTo();
      });
    },
    container () {
      this.init();
    },
    currentLink (newHref, oldHref) {
      this.$emit('on-change', newHref, oldHref);
    }
  },
  mounted () {
    this.init();
  },
  beforeDestroy () {
    this.removeListener();
  },
  methods: {
    handleAffixStateChange (state) {
      this.isAffixed = this.affix && state;
    },
    handleScroll (e) {
      this.upperFirstTitle =
        e.target.scrollTop < this.titlesOffsetArr[0].offset;
      if (this.animating) return;
      this.updateTitleOffset();
      const scrollTop =
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        e.target.scrollTop;
      this.getCurrentScrollAtTitleId(scrollTop);
    },
    handleHashChange () {
      const url = window.location.href;
      const sharpLinkMatch = sharpMatcherRegx.exec(url);
      if (!sharpLinkMatch) return;
      this.currentLink = sharpLinkMatch[0];
      this.currentId = sharpLinkMatch[1];
    },
    handleScrollTo () {
      const anchor = document.getElementById(this.currentId);
      const currentLinkElementA = document.querySelector(
        `a[data-href="${this.currentLink}"]`
      );
      let offset = this.scrollOffset;
      if (currentLinkElementA) {
        offset = parseFloat(
          currentLinkElementA.getAttribute('data-scroll-offset')
        );
      }
      if (!anchor) return;
      const offsetTop = anchor.offsetTop - this.wrapperTop - offset;
      this.animating = true;
      scrollTop(
        this.scrollContainer,
        this.scrollElement.scrollTop,
        offsetTop,
        600,
        () => {
          this.animating = false;
        }
      );
      this.handleSetInkTop();
    },
    handleSetInkTop () {
      const currentLinkElementA = document.querySelector(
        `a[data-href="${this.currentLink}"]`
      );
      if (!currentLinkElementA) return;
      const elementATop = currentLinkElementA.offsetTop;
      const top = elementATop < 0 ? this.offsetTop : elementATop;
      this.inkTop = top;
    },
    updateTitleOffset () {
      const links = findComponentsDownward(this, `${prefixCls}-link`).map(
        link => link.href
      );
      // console.log('links', links)
      const idArr = links.map(link => {
        return link.split('#')[1];
      });
      let offsetArr = [];
      idArr.forEach(id => {
        const titleEle = document.getElementById(id);
        // console.log('title ele', titleEle)
        if (titleEle) {
          offsetArr.push({
            link: `#${id}`,
            offset: titleEle.offsetTop - this.scrollElement.offsetTop
          });
        }
      });
      // console.log('offsetArr', offsetArr)
      this.titlesOffsetArr = offsetArr;
    },
    getCurrentScrollAtTitleId (scrollTop) {
      let i = -1;
      let len = this.titlesOffsetArr.length;
      let titleItem = {
        link: '#',
        offset: 0
      };
      scrollTop += this.bounds;
      while (++i < len) {
        let currentEle = this.titlesOffsetArr[i];
        let nextEle = this.titlesOffsetArr[i + 1];
        if (
          scrollTop >= currentEle.offset &&
          scrollTop < ((nextEle && nextEle.offset) || Infinity)
        ) {
          titleItem = this.titlesOffsetArr[i];
          break;
        }
      }
      this.currentLink = titleItem.link;
      this.handleSetInkTop();
    },
    getContainer () {
      this.scrollContainer = this.container
        ? typeof this.container === 'string'
          ? document.querySelector(this.container)
          : this.container
        : window;
      this.scrollElement = this.container
        ? this.scrollContainer
        : document.documentElement || document.body;
    },
    removeListener () {
      off(this.scrollContainer, 'scroll', this.handleScroll);
      off(window, 'hashchange', this.handleHashChange);
    },
    init () {
      this.handleHashChange();
      this.$nextTick(() => {
        this.removeListener();
        this.getContainer();
        this.wrapperTop = this.containerIsWindow
          ? 0
          : this.scrollElement.offsetTop;
        this.handleScrollTo();
        this.handleSetInkTop();
        this.updateTitleOffset();
        this.upperFirstTitle =
          this.scrollElement.scrollTop < this.titlesOffsetArr[0].offset;
        on(this.scrollContainer, 'scroll', this.handleScroll);
        on(window, 'hashchange', this.handleHashChange);
      });
    }
  }
};
</script>
