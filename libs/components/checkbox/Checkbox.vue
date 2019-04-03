<template>
    <label :class="warpCls">
        <span :class="checkbboxLeftClass">
            <span :class="innerCls"></span>
            <input
                :class="prefixCls + '-input'"
                type="checkbox"
                :value="value"
                :checked="checked"
                :disabled="disabled"
                @change="change"
            />
        </span>
        <slot>{{label}}</slot>
    </label>
</template>

<script>
import { prefix } from '../../utils/common';
import Emitter from '../../mixins/emitter';

const prefixCls = prefix + 'checkbox';
export default {
    name: prefixCls,
    mixins: [Emitter],
    data () {
        return {
            checked: this.value,
            showSlot: true,
            prefixCls
        };
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: ''
        },
        indeterminate: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        value (checked) {
            this.checked = checked;
        }
    },
    computed: {
        checkbboxLeftClass () {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-checked`]: this.checked,
                    [`${prefixCls}-disabled`]: this.disabled,
                    [`${prefixCls}-indeterminate`]: this.indeterminate
                }
            ];
        },
        innerCls () {
            return [
                `${prefixCls}-inner`
            ];
        },
        warpCls () {
            return [
                `${prefixCls}-warpper`
            ];
        }
    },
    mounted () {
        this.showSlot = this.$slots.default !== undefined;
    },
    methods: {
        change (e) {
            if (this.disabled) return;
            this.checked = e.target.checked;
            if (this.$parent.$options.name === prefix + 'checkboxGroup') {
                this.$parent.change(this.label, this.checked);
                return;
            }
            this.$emit('input', this.checked);
            this.$emit('on-change', this.checked);
            this.dispatch(prefix + 'form-item', 'on-form-change', this.checked);
        }
    }
};
</script>
