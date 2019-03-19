<template>
    <div :style="backgroundStyle" class="b-color-box">
        <div class="b-color-body">
            <div class="b-color-name" :style="fontColor">{{type}}</div>
            <div class="b-color-desc" :style="fontColor">{{colorName}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'color-show',
    props: {
        type: {
            type: String,
            default: 'Parimary'
        },
        color: {
            type: String,
            default: 'white'
        }
    },
    data () {
        return {
            colorObj: {
                'LightPrimary': '52b7fc',
                'Primary': '0079CC',
                'DarkPrimary': '00558f',
                'Info': '0079CC',
                'Success': '1fca74',
                'Warning': 'ff8f00',
                'Error': 'f44336',
                'Badge': 'ff5722',
                'Background': 'f8f8f9',
                'Sub': '80848f',
                'Disabled': 'e8e8e8',
                'Border': 'dddee1',
                'Divider': 'e9eaec',
                'Title': '1c2438',
                'Content': '495060',
                'SubContent': '9ea7b4',
                'DisContent': 'bbbbbb',
                'LinkContent': '0079cc'
            }
        }
    },
    computed: {
        backgroundStyle () {
            return {
                background: '#' + this.colorObj[this.type]
            }
        },
        colorName () {
            return '#' + this.colorObj[this.type]
        },
        fontColor () {
            return {
                color: this.color
            }
        }
    }
}
</script>

<style lang="scss">
    .b-color-box {
        display: inline-block;
        height: 80px;
        width: 30%;
        margin-bottom: 10px;
        border-radius: 4px;
    }

    .b-color-box:not(:last-child) {
        margin-right: 10px;
    }

    .b-color-body {
        padding: 20px 0 0 15px;
        color: white;
    }

    .b-color-desc {
        opacity: 0.8;
    }
</style>
