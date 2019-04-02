<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
import { prefix } from '../../utils/common';
import Emitter from '../../mixins/emitter';

const prefixCls = prefix + 'checkboxGroup';
export default {
    name: prefixCls,
    mixins: [Emitter],
    data () {
        return {
        };
    },
    props: {
        value: {
            type: Array,
            default: () => []
        }
    },
    computed: {

    },
    watch: {
        value: {
            handler: function () {
                this.renderChecked();
            },
            deep: true
        }
    },
    mounted () {
        this.renderChecked();
    },
    methods: {
        renderChecked () {
            this.$children.map((item) => {
                item.checked = false;
                this.value.map((valueItem) => {
                    if (item.label === valueItem) {
                        item.checked = true;
                    }
                });
            });
        },
        change (label, checked) {
            let value = this.value;
            let index = this.value.indexOf(label);
            if (index < 0) {
                value.push(label);
            } else {
                value.splice(index, 1);
            }
            this.$emit('input', value);
            this.$emit('on-change', value);
            this.dispatch(prefix + 'form-item', 'on-form-change', value);
        }
    }
};
</script>
