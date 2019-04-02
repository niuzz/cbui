<template>
  <div :class="classes">
    <label :for="labelFor" v-if="label || $slots.label"
           :class="[prefixCls + '-label']" :style="labelStyle">
      <slot name="label">{{label}}</slot>
    </label>
    <div :class="[prefixCls + '-content']" :style="contentStyle">
      <slot></slot>
      <transition name="fade">
        <div :class="[prefixCls + '-error-tip']" v-if="validateState === 'error' && showMessage && form.showMessage">
          {{errorTipMessage}}
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import AsyncValidator from 'async-validator';
import Emitter from '../../mixins/emitter';
import { prefix } from '../../utils/common';
import { deepCopy } from '../../utils/assist';

const prefixCls = prefix + 'form-item';

export default {
    data () {
        return {
            prefixCls: prefixCls,
            isRequired: false,
            validateDisabled: false, // 校验是否失效
            validateState: '', // 校验状态
            errorTipMessage: '' // 错误提示信息
        };
    },
    name: prefixCls,
    inject: ['form'],
    mixins: [Emitter],
    methods: {
        fieldValue () {
            if (!this.form.model || !this.prop) {
                return;
            }
            return this.form.model[this.prop];
        },
        resetField () {
            this.validateState = '';
            this.errorTipMessage = '';
            this.validateDisabled = true;
            this.form.model[this.prop] = this.initValue;
        },
        getRules () {
            let formRules = this.form.rules;
            const selfRules = this.rules;

            formRules = formRules ? formRules[this.prop] : [];
            return [].concat(selfRules || formRules || []);
        },
        getFilteredRule (trigger) {
            const rules = this.getRules();

            return rules.filter(rule => (!rule.trigger || rule.trigger.indexOf(trigger) !== -1));
        },
        validate (trigger, callback = function () {}) {
            const rules = this.getFilteredRule(trigger);
            if (!rules || rules.length === 0) {
                callback();
                return true;
            }

            this.validateState = 'validating';

            let descriptor = {};
            descriptor[this.prop] = rules;

            const validator = new AsyncValidator(descriptor);
            let model = {};

            model[this.prop] = this.fieldValue();

            validator.validate(model, {firstFields: true}, errors => {
                this.validateState = !errors ? 'success' : 'error';
                this.errorTipMessage = errors ? errors[0].message : '';
                callback(this.errorTipMessage);
            });
            this.validateDisabled = false;
        },
        onFieldBlur () {
            this.validate('blur');
        },
        onFieldChange () {
            if (this.validateDisabled) {
                this.validateDisabled = false;
                return;
            }
            this.validate('change');
        },
        handleInitValue () {
            return deepCopy(this.fieldValue());
        }
    },
    props: {
        label: { // label标签
            type: String,
            default: ''
        },
        labelWidth: { // 标签的宽度
            type: Number
        },
        showMessage: { // 是否展示错误提示信息
            type: Boolean,
            default: true
        },
        prop: { // 是否校验此字段，对应Form的model的key
            type: String
        },
        error: { // 错误提示信息
            type: String,
            default: ''
        },
        rules: { // 此FormItem的校验规则
            type: [Array, Object]
        },
        labelFor: { // 对应原生label的for属性
            type: String
        },
        required: { // 此字段是否是必填的
            type: Boolean,
            default: false
        }
    },
    watch: {
        error (newVal) {
            this.errorTipMessage = newVal;
            this.validateState = newVal !== '' ? 'error' : '';
        }
    },
    computed: {
        classes () {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-required`]: this.required || this.isRequired,
                    [`${prefixCls}-error`]: this.validateState === 'error',
                    [`${prefixCls}-validating`]: this.validateState === 'validating'
                }
            ];
        },
        contentStyle () {
            let result = {};
            let labelWidth = this.labelWidth || this.form.labelWidth;
            if (labelWidth) {
                result.marginLeft = `${labelWidth}px`;
            }
            return result;
        },
        labelStyle () {
            let result = {};
            let labelWidth = this.labelWidth || this.form.labelWidth;
            if (labelWidth) {
                result.width = `${labelWidth}px`;
            }
            return result;
        }
    },
    mounted () {

    },
    created () {
        if (this.prop) {
            this.dispatch(this.form.$options.name, 'on-form-item-add', this);
            Object.defineProperty(this, 'initValue', {
                value: this.handleInitValue()
            });
            let rules = this.getRules();
            if (rules.length) {
                // 意思就是只有有一个required为true,那么就是必填的
                rules.every(rule => {
                    if (rule.required) {
                        this.isRequired = true;
                        return false;
                    }
                });
            }
            this.$on('on-form-blur', this.onFieldBlur);
            this.$on('on-form-change', this.onFieldChange);
        }
    },
    beforeDestroy () {
        this.dispatch(this.form.$options.name, 'on-form-item-remove', this);
    }
};
</script>
