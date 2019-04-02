<template>
  <form :class="classes" :autocomplete="autocomplete">
    <slot></slot>
  </form>
</template>
<script>
import { prefix, oneOf } from '../../utils/common';

const prefixCls = prefix + 'form';
export default {
    data () {
        return {
            fields: []
        };
    },
    provide () {
        return {
            form: this
        };
    },
    name: prefixCls,
    props: {
        model: {
            type: Object
        },
        rules: {
            type: Object
        },
        inline: {
            type: Boolean,
            default: false
        },
        labelPosition: {
            validator (value) {
                return oneOf(value, ['left', 'right', 'top']);
            },
            default: 'right'
        },
        showMessage: {
            type: Boolean,
            default: true
        },
        autocomplete: {
            validator (value) {
                return oneOf(value, ['on', 'off']);
            },
            default: 'off'
        },
        labelWidth: {
            type: Number
        }
    },
    methods: {
    // 对整个表单进行校验
        validate (callback) {
            let isValid = true;
            let count = 0;
            let length = this.fields.length;
            this.fields.forEach(field => {
                // '' 标识校验每一个FormItem的所有规则
                field.validate('', errorMsg => {
                    if (errorMsg) {
                        isValid = false;
                    }
                    if (++count === length) {
                        if (typeof callback === 'function') {
                            callback(isValid);
                        }
                    }
                });
            });
        },

        // 对部分表单进行校验的方法
        validateField (prop, cb) {
            let field = this.fields.filter(field => field.prop === prop)[0];
            if (!field) {
                throw new Error('[cb warn]: must call validateField with valid prop string!');
            }
            field.validate('', cb);
        },

        // 对整个表单进行重置，将所有字段值重置为空并移除校验结果
        resetFields () {
            this.fields.forEach(field => {
                field.resetField();
            });
        }
    },
    watch: {
        rules () {
            this.validate();
        }
    },
    computed: {
        classes () {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-inline`]: this.inline,
                    [`${prefixCls}-label-${this.labelPosition}`]: this.labelPosition
                }
            ];
        }
    },
    mounted () {},
    created () {
        this.$on('on-form-item-add', field => {
            if (field) {
                this.fields.push(field);
            }
        });
    },
    beforeDestroy () {
        this.$on('on-form-item-remove', field => {
            if (field.prop) {
                this.fields.splice(this.fields.indexOf(field), 1);
            }
        });
    }
};
</script>
