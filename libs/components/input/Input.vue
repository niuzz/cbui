<template>
  <div :class="wrapClasses">
    <template v-if="type !== 'textarea'">
      <input
        :autocomplete="autocomplete"
        ref="input"
        :type="type"
        :class="inputClasses"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxlength"
        :readonly="readonly"
        :name="name"
        :value="currentValue"
        :number="number"
        :autofocus="autofocus"
        @keyup.enter="handleEnter"
        @keyup="handleKeyup"
        @keypress="handleKeypress"
        @keydown="handleKeydown"
        @focus="handleFocus"
        @blur="handleBlur"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
        @input="handleInput"
        @change="handleChange"
      >
    </template>
    <textarea
      v-else
      :wrap="wrap"
      :autocomplete="autocomplete"
      :spellcheck="spellcheck"
      ref="textarea"
      :class="textareaClasses"
      :style="textareaStyles"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      :maxlength="maxlength"
      :readonly="readonly"
      :name="name"
      :value="currentValue"
      :autofocus="autofocus"
      @keyup.enter="handleEnter"
      @keyup="handleKeyup"
      @keypress="handleKeypress"
      @keydown="handleKeydown"
      @focus="handleFocus"
      @blur="handleBlur"
      @compositionstart="handleComposition"
      @compositionupdate="handleComposition"
      @compositionend="handleComposition"
      @input="handleInput"
    ></textarea>
  </div>
</template>
<script>
import { prefix, oneOf } from '../../utils/common';
import calcTextareaHeight from '../../utils/calcTextareaHeight';

const prefixCls = prefix + 'input';

export default {
  name: prefixCls,
  props: {
    type: {
      validator (value) {
        return oneOf(value, [
          'text',
          'textarea',
          'password',
          'url',
          'email',
          'date',
          'number',
          'tel'
        ]);
      },
      default: 'text'
    },
    value: {
      type: [String, Number],
      default: ''
    },
    size: {
      validator (value) {
        return oneOf(value, ['small', 'large', 'default']);
      },
      default () {
        return !this.$IVIEW || this.$IVIEW.size === ''
          ? 'default'
          : this.$IVIEW.size;
      }
    },
    placeholder: {
      type: String,
      default: ''
    },
    maxlength: {
      type: Number
    },
    disabled: {
      type: Boolean,
      default: false
    },
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    rows: {
      type: Number,
      default: 2
    },
    readonly: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    },
    number: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    spellcheck: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      validator (value) {
        return oneOf(value, ['on', 'off']);
      },
      default: 'off'
    },
    wrap: {
      validator (value) {
        return oneOf(value, ['hard', 'soft']);
      },
      default: 'soft'
    }
  },
  data () {
    return {
      currentValue: this.value,
      prefixCls: prefixCls,
      textareaStyles: {},
      isOnComposition: false
    };
  },
  computed: {
    wrapClasses () {
      return [`${prefixCls}-wrapper`];
    },
    inputClasses () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`${prefixCls}-disabled`]: this.disabled
        }
      ];
    },
    textareaClasses () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-disabled`]: this.disabled
        }
      ];
    }
  },
  methods: {
    handleEnter (event) {
      this.$emit('on-enter', event);
      if (this.search) this.$emit('on-search', this.currentValue);
    },
    handleKeydown (event) {
      this.$emit('on-keydown', event);
    },
    handleKeypress (event) {
      this.$emit('on-keypress', event);
    },
    handleKeyup (event) {
      this.$emit('on-keyup', event);
    },
    handleIconClick (event) {
      this.$emit('on-click', event);
    },
    handleFocus (event) {
      this.$emit('on-focus', event);
    },
    handleBlur (event) {
      this.$emit('on-blur', event);
    },
    handleComposition (event) {
      if (event.type === 'compositionstart') {
        this.isOnComposition = true;
      }
      if (event.type === 'compositionend') {
        this.isOnComposition = false;
        this.handleInput(event);
      }
    },
    handleInput (event) {
      if (this.isOnComposition) return;

      let value = event.target.value;
      if (this.number && value !== '') {
        value = Number.isNaN(Number(value)) ? value : Number(value);
      }
      this.$emit('input', value);
      this.setCurrentValue(value);
      this.$emit('on-change', event);
    },
    handleChange (event) {
      this.$emit('on-input-change', event);
    },
    setCurrentValue (value) {
      if (value === this.currentValue) return;
      this.$nextTick(() => {
        this.resizeTextarea();
      });
      this.currentValue = value;
    },
    resizeTextarea () {
      const autosize = this.autosize;
      if (!autosize || this.type !== 'textarea') {
        return false;
      }

      const minRows = autosize.minRows;
      const maxRows = autosize.maxRows;

      this.textareaStyles = calcTextareaHeight(
        this.$refs.textarea,
        minRows,
        maxRows
      );
    },
    focus () {
      if (this.type === 'textarea') {
        this.$refs.textarea.focus();
      } else {
        this.$refs.input.focus();
      }
    },
    blur () {
      if (this.type === 'textarea') {
        this.$refs.textarea.blur();
      } else {
        this.$refs.input.blur();
      }
    },
    handleClear () {
      const e = { target: { value: '' } };
      this.$emit('input', '');
      this.setCurrentValue('');
      this.$emit('on-change', e);
    },
    handleSearch () {
      if (this.disabled) return false;
      this.$refs.input.focus();
      this.$emit('on-search', this.currentValue);
    }
  },
  watch: {
    value (val) {
      this.setCurrentValue(val);
    }
  },
  mounted () {
    this.resizeTextarea();
  }
};
</script>
