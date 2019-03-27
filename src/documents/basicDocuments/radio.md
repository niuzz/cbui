# Radio 单选框
在一组备选项中进行单选
-----
### 基础用法
由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。

<div class="example">
    <div class="example-box">
        <div>
            <n-radio v-model='radio1' label="1"></n-radio>
            <n-radio v-model='radio1' label="2">默认按钮2</n-radio>
        </div>
    </div>
</div>

:::code
```html
    <div>
        <n-radio v-model='radio1' label="1"></n-radio>
        <n-radio v-model='radio1' label="2">默认按钮2</n-radio>
    </div>
    <script>
        export default {
            data () {
                return {
                    radio1 : "1"
                }
            
            },
        }
    </script>
```
:::

### 禁用状态
单选框不可用的状态。

<div class="example">
    <div class="example-box">
        <div>
            <n-radio v-model='radio2' label="1" disabled></n-radio>
            <n-radio v-model='radio2' label="2" disabled>默认按钮2</n-radio>
        </div>
    </div>
</div>

::: code
```html
    <div>
        <n-radio v-model='radio2' label="1" disabled></n-radio>
        <n-radio v-model='radio2' label="2" disabled>默认按钮2</n-radio>
    </div>
```
:::


<!-- ### 事件
Button 支持click 事件

<div class="example">
    <div class="example-box">
        <div>
            <n-radio v-model='radio3' label="1" @change='change'></n-radio>
            <n-radio v-model='radio3' label="2" @change='change'>默认按钮2</n-radio>
        </div>
    </div>
</div>

::: code
```html
   <div>
        <n-radio v-model='radio3' label="1" @change='change'></n-radio>
        <n-radio v-model='radio3' label="2" @change='change'>默认按钮2</n-radio>
   </div>
```
::: -->


<script>
    export default {
        data () {
            return {
                radio1 : '1',
                radio2 : '2',
                radio3 : '3'

            }
        
        },
        methods: {
            change(event) {
                alert(`触发了事件！,值为${event}`)
            }
        }
    }
</script>

### props
| 参数      | 说明    | 类型      | 可选值       |  默认值   |
|----------|-------- |---------- |-------------  |-------- |
| v-model   | 绑定值   | string / number / boolean  |  —    |   —   |
| label     | Radio 的 value  | string / number / boolean    |   —    |   —   |
| disabled  | 是否禁用   | boolean    |   —   |     false  |
| name		|  原生 name 属性 | string    |   —    |   —    |

### events
| 事件名	      | 说明	    | 返回值 |
|---------- |-------- |---------- |
| change     | 点击按钮时触发   | -  |
