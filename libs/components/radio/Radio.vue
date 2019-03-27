<template>
  <label :class="wrapClasses">
    <span :class="radioClasses">
      <span :class="innerClasses"></span>
      <input
        type="radio"
        :class="inputClasses"
        :disabled="disabled"
        :checked="currentValue"
        :name="groupName"
        @change="change"
        aria-hidden="true"
      >
    </span>
    <span>
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>
<script>
import { prefix } from '../../utils/common';
import { findComponentUpward } from '../../utils/assist';

const prefixCls = prefix + 'radio';

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
    radioClasses () {
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
  mounted () {
    if (this.parent) {
      this.group = true;
      if (this.name && this.name !== this.parent.name) {
        /* eslint-disable no-console */
        if (console.warn) {
          console.warn('[iview] Name does not match Radio Group name.');
        }
        /* eslint-enable no-console */
      } else {
        this.groupName = this.parent.name;
      }
    }

    if (this.group) {
      this.parent.updateValue();
    } else {
      this.updateValue();
    }
  },
  methods: {
    change (event) {
      if (this.disabled) {
        return false;
      }

      const checked = event.target.checked;
      this.currentValue = checked;

      const value = checked ? this.label : '';
      this.$emit('input', value);
    },
    updateValue () {
      this.currentValue = this.value === this.label;
      console.log(this.currentValue);
    }
  },
  watch: {
    value (val) {
      this.updateValue();
    }
  }
};
</script>
