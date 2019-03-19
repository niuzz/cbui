<template>
    <div :class="wrapperCls">
        <a
            :href="href"
            :class="linkCls"
            :data-scroll-offset="scrollOffset"
            :data-href="href"
            :title="title"
            @click.prevent="goAnchor">
            {{ title }}
        </a>
        <slot></slot>
    </div>
</template>
<script>
import { prefix } from '../../utils/common'
const prefixCls = `${prefix}anchor-link`

export default {
    name: prefixCls,
    inject: ['anchorCom'],
    props: {
        href: String,
        title: String,
        scrollOffset: {
            type: Number,
            default () {
                return this.anchorCom.scrollOffset
            }
        }
    },
    computed: {
        wrapperCls () {
            return [
                `${prefixCls}`,
                this.anchorCom.currentLink === this.href ? `${prefixCls}-active` : ''
            ]
        },
        linkCls () {
            return `${prefixCls}-title`
        }
    },
    methods: {
        goAnchor () {
            this.currentLink = this.href
            this.anchorCom.handleHashChange()
            this.anchorCom.handleScrollTo()
            this.anchorCom.$emit('on-select', this.href)
            this.$router ? this.$router.push(this.href) : window.location.href = this.href
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.anchorCom.init()
        })
    }
}
</script>
