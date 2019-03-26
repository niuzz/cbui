
<template>
  <input type="checkbox" @click="handleClick" value="dianj" name="name">
</template>

<script>
/* eslint-disable */
import { prefix, oneOf } from "../../utils/common";
import Icon from "../icon";

const prefixCls = prefix + "checkbox";
export default {
  name: prefixCls,
  components: { Icon },
  computed: {
    iconcls() {
      return `${this.icon}`;
    },
    bodyCls() {
      return [
        `${prefixCls}`,
        `${prefixCls}-size-${this.size}`,
        `${prefixCls}-type-${this.type} `,
        {
          [`${prefixCls}-round`]: this.round, // 圆角
          [`${prefixCls}-circle`]: this.circle, // 圆形
          [`${prefixCls}-disabled`]: this.disabled // 禁用
        }
      ];
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      validator(value) {
        return oneOf(value, ["default", "small", "large"]);
      },
      default: "default"
    },
    type: {
      validator(value) {
        return oneOf(value, [
          "default",
          "primary",
          "error",
          "warning",
          "success"
        ]);
      },
      default: "default"
    },
    round: {
      type: Boolean,
      default: false
    },
    plain: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ""
    },
    customClasses: {
      type: [String, Array],
      default: ""
    }
  },
  data() {
    return {
      name: "",
      value: ""
    };
  },
  mounted() {
    // 是否需要不可点击？
    if (this.loading) {
      // this.disabled = true
    }
  },
  methods: {
    handleClick() {
      this.$emit("on-click", name, value);
    }
  }
};
</script>
