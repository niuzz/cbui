<template>
  <label :class="wrapClasses">
    <span :class="checkboxClasses">
      <span :class="innerClasses"></span>
      <input
        type="checkbox"
        :class="inputClasses"
        :disabled="disabled"
        :checked="currentValue"
        :name="groupName"
        @change="change"
        aria-hidden="true"
      >
    </span>
    <span>
      <!-- <slot>{{ label }}</slot> -->
    </span>
  </label>
</template>
<script>
import { prefix } from '../../utils/common';
import { findComponentUpward } from '../../utils/assist';

const prefixCls = prefix + 'checkbox';

export default {
  name: prefixCls,
  props: {
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    label: {
      type: [String, Number, Boolean]
    },
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    }
  },
  data () {
    return {
      currentValue: this.value,
      group: false,
      groupName: this.name,
      parent: findComponentUpward(this, 'RadioGroup')
    };
  },
  computed: {
    wrapClasses () {
      return [
        `${prefixCls}-wrapper`,
        {
          [`${prefixCls}-group-item`]: this.group,
          [`${prefixCls}-wrapper-checked`]: this.currentValue,
          [`${prefixCls}-wrapper-disabled`]: this.disabled
        }
      ];
    },
    checkboxClasses () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-checked`]: this.currentValue,
          [`${prefixCls}-disabled`]: this.disabled
        }
      ];
    },
    innerClasses () {
      return [`${prefixCls}-inner`];
    },
    inputClasses () {
      return `${prefixCls}-input`;
    }
  },
  mounted () {},
  methods: {}
};
</script>
