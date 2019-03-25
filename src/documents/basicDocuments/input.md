# Input 输入框
通过鼠标或键盘输入字符
-----
### 概述
基本表单组件，支持 input 和 textarea，并在原生控件基础上进行了功能扩展，可以组合使用。

<div class="example">
    <div class="example-box">
        <div style='width:280px'>
            <n-input v-model='value' placeholder='请输入内容'></n-input>
        </div>
    </div>
</div>

:::code
```html
    <div style='width:280px'>
       <n-input v-model='value' placeholder='请输入内容'></n-input>
    </div>
    <script>
        export default {
            data () {
                return {
                    value : "",
                }
            
            },
        }
    </script>
```
:::

### 尺寸
输入框有三种尺寸：大、默认（中）、小

通过设置size为large和small设置为大和小尺寸，不设置为默认（中）尺寸。

<div class="example">
    <div class="example-box">
        <div style='display:inline-block;margin-right:15px'>
            <n-input v-model="value1" size="large" placeholder="large size"></n-input>
        </div>
        <div style='display:inline-block;margin-right:15px'>
            <n-input v-model="value2" placeholder="default size" /></n-input>
        </div>
        <div style='display:inline-block;margin-right:15px'>
            <n-input v-model="value3" size="small" placeholder="small size" /></n-input>
        </div>
    </div>
</div>

::: code
```html
    <div>
        <div style='display:inline-block;margin-right:15px'>
            <n-input v-model="value1" size="large" placeholder="large size"></n-input>
        </div>
        <div style='display:inline-block;margin-right:15px'>
            <n-input v-model="value2" placeholder="default size" /></n-input>
        </div>
        <div style='display:inline-block;margin-right:15px'>
            <n-input v-model="value3" size="small" placeholder="small size" /></n-input>
        </div>
    </div>
    <script>
        export default {
            data () {
                return {
                    value1 : "",
                    value2 : "",
                    value3 : "",
                }
            
            },
        }
    </script>
```
:::


### 禁用状态
通过 disabled 属性指定是否禁用 input 组件

<div class="example">
    <div class="example-box">
        <div>
            <n-input
                placeholder="请输入内容"
                v-model="value4"
                :disabled="true">
            </n-input>
        </div>
    </div>
</div>

::: code
```html
    <div>
        <n-input
            placeholder="请输入内容"
            v-model="value4"
            :disabled="true">
        </n-input>
    </div>
    <script>
        export default {
            data () {
                return {
                    value4 : "",
                }
            
            },
        }
    </script>
```
:::

### 可自适应文本高度的文本域
通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 autosize 还可以设定为一个对象，指定最小行数和最大行数。

<div class="example">
    <div class="example-box">
        <div>
            <n-input
                type="textarea"
                autosize
                placeholder="请输入内容"
                v-model="textarea1">
            </n-input>
            <div style="margin: 20px 0;"></div>
                <n-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="textarea2">
                </n-input>
            </div>
    </div>
</div>

::: code
```html
    <div>
        <n-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="textarea1">
        </n-input>
        <div style="margin: 20px 0;"></div>
            <n-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="textarea2">
            </n-input>
        </div>
    </div>
    <script>
        export default {
            data () {
                return {
                    textarea1 : "",
                    textarea2 : ""
                }
            
            },
        }
    </script>
```
:::


<script>
    export default {
        data () {
            return {
                value : "",
                value1 : "",
                value2 : "",
                value3 : "",
                value4 : "",

                textarea1 : "",
                textarea2 : ""
            }
        
        },
    }
</script>


### props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type                  | 类型          | string             |  text，textarea 和其他 原生 input 的 type 值     |    text       |
| value / v-model       | 绑定值        | string / number    |  —                                              |     —       |
| size                  | 输入框尺寸     | String             | 可选值为large、small、default或者不设置             |      —        |
| placeholder           | 输入框占位文本 | String             |  —     |    —        |
| disabled           | 设置输入框为禁用状态 | Boolean             |  —     |    false       |
| readonly           | 设置输入框为只读 | Boolean             |  —     |    false       |
| maxlength           | 最大输入长度 | Number             |  —     |    —       |
| rows           | 文本域默认行数，仅在 textarea 类型下有效 | Number             |  —     |    2       |
|autosize        |自适应内容高度，只对 type="textarea" 有效，可传入对象，如，{ minRows: 2, maxRows: 6 }|Boolean 或 Object| false|
|number|将用户的输入转换为 Number 类型|Boolean| —  |false|
| autofocus           | 自动获取焦点 | Boolean             |  —     |    false       |
|autocomplete|原生的自动完成功能，可选值为 off 和 on|String|off|
|spellcheck|原生的 spellcheck 属性|Boolean| — |false|
|wrap|原生的 wrap 属性，可选值为 hard 和 soft，仅在 textarea 下生效|String|soft|

### events
| 事件名	      | 说明	    | 返回值 |
|---------- |-------- |---------- |
| on-enter    | 按下回车键时触发   | 无 |
| on-click    | 设置 icon 属性后，点击图标时触发   | 无 |
| on-change    | 数据改变时触发   | event |
| on-focus    | 输入框聚焦时触发   | 无 |
| on-blur    | 输入框失去焦点时触发   | 无 |
| on-keyup    | 原生的 keyup 事件   | event |
| on-keydown    | 原生的 keydown 事件   | event |
| on-keypress    | 原生的 keypress 事件   | event |
| on-search   | 开启 search 时可用，点击搜索或按下回车键时触发   | value |

### Input methods
| 方法名	      | 说明	    | 参数 |
|---------- |-------- |---------- |
| focus	   | 手动聚焦输入框   | 无 |