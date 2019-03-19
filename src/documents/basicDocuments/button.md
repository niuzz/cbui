# Button 按钮
常用的操作按钮。
-----
### 基础用法
使用```type``` 属性来定义Button 的样式

<div class="example">
    <div class="example-box">
        <div>
            <n-button>默认按钮</n-button>
            <n-button type="primary">主要按钮</n-button>
            <n-button type="success">成功按钮</n-button>
            <n-button type="warning">警告按钮</n-button>
            <n-button type="error">危险按钮</n-button>
        </div>
    </div>
</div>

:::code
```html
    <div>
        <n-button>默认按钮</n-button>
        <n-button type="primary">主要按钮</n-button>
        <n-button type="success">成功按钮</n-button>
        <n-button type="warning">警告按钮</n-button>
        <n-button type="error">危险按钮</n-button>
    </div>
```
:::


### 不同尺寸
Button 组件可以在不同场景下选择合适的按钮尺寸。
尺寸选项：```default```、```small```，通过设置```size```属性来配置它们。

<div class="example">
    <div class="example-box">
        <div>
         <n-button size="small">主要按钮</n-button>
         <n-button size="default">主要按钮</n-button>
         <n-button size="large">主要按钮</n-button>
        </div>
    </div>
</div>

::: code
```html
    <div>
        <n-button size="small">危险按钮</n-button>
        <n-button size="default">危险按钮</n-button>
        <n-button size="large">危险按钮</n-button>
    </div>
```
:::

### 圆角按钮
Button 组件可以在不同场景下选择是否可以点击。
使用```round``` 属性来定义Button是否为圆角按钮。

<div class="example">
    <div class="example-box">
        <div>
            <n-button :round="true">默认按钮</n-button>
            <n-button type="primary" :round="true">主要按钮</n-button>
            <n-button type="success" :round="true">成功按钮</n-button>
            <n-button type="warning" :round="true">警告按钮</n-button>
            <n-button type="error" :round="true">危险按钮</n-button>
        </div>
    </div>
</div>

::: code
```html
    <div>
        <n-button :round="true">默认按钮</n-button>
        <n-button type="primary" :round="true">主要按钮</n-button>
        <n-button type="success" :round="true">成功按钮</n-button>
        <n-button type="warning" :round="true">警告按钮</n-button>
        <n-button type="error" :round="true">危险按钮</n-button>
    </div>
```
:::

### 禁用状态
Button 组件可以在不同场景下选择是否可以点击。
使用```disable``` 属性来定义Button是否可点击


<div class="example">
    <div class="example-box">
        <div>
            <n-button  disabled="disabled">默认按钮</n-button>
            <n-button type="primary" disabled="disabled">主要按钮</n-button>
            <n-button type="success" disabled="disabled">成功按钮</n-button>
            <n-button type="warning" disabled="disabled">警告按钮</n-button>
            <n-button type="error"   disabled="disabled">危险按钮</n-button>
        </div>
    </div>
</div>

::: code
```html
    <div>
        <n-button  disabled="disabled">默认按钮</n-button>
        <n-button type="primary"  disabled="disabled">主要按钮</n-button>
        <n-button type="success"  disabled="disabled">成功按钮</n-button>
        <n-button type="warning" disabled="disabled">警告按钮</n-button>
        <n-button type="error"   disabled="disabled">危险按钮</n-button>
    </div>
```
:::

### 圆形按钮
Button 组件可以在不同场景下选择是否可以点击。
使用```circle``` 属性来定义圆形Button


<div class="example">
    <div class="example-box">
        <div>
            <n-button  :circle="true"></n-button>
            <n-button type="primary" :circle="true"></n-button>
            <n-button type="success" :circle="true"></n-button>
            <n-button type="warning" :circle="true"></n-button>
            <n-button type="error"   :circle="true"></n-button>
        </div>
    </div>
</div>

::: code
```html
    <div>
        <n-button :circle="true"></n-button>
        <n-button type="primary" :circle="true"></n-button>
        <n-button type="success" :circle="true"></n-button>
        <n-button type="warning" :circle="true"></n-button>
        <n-button type="error"   :circle="true"></n-button>
    </div>
```
:::

### 图标按钮
Button 组件可以在不同场景下选择是否可以点击。
使用```icon``` 属性来定义Button图标样式。
更多图标参考星拥月[Icon组件](http://localhost:3000/#/icon)

<div class="example">
    <div class="example-box">
        <div>
            <n-button icon="dayin">default</n-button>
            <n-button type="primary" icon="dayin">primary</n-button>
            <n-button type="success" icon="dayin">success</n-button>
            <n-button type="warning" icon="dayin">warning</n-button>
            <n-button type="error"   icon="dayin">error</n-button>
        </div>
    </div>
</div>

::: code
```html
    <div>
        <n-button icon="daochukehuxinxi">default</n-button>
        <n-button type="primary" icon="fapiaoshengcheng">primary</n-button>
        <n-button type="success" icon="pipeixinxi">success</n-button>
        <n-button type="warning" icon="qianshouxinxi">warning</n-button>
        <n-button type="error"   icon="chuangjianyonghu">error</n-button>
    </div>
```
:::

### 是否为加载状态
Button 组件可以在不同场景下选择是否可以点击。
使用```loading``` 属性来定义Button是否为正在加载状态


<div class="example">
    <div class="example-box">
        <div>
            <n-button  type="primary" :loading="true">加载中</n-button>
        </div>
    </div>
</div>

::: code
```html
    <div>
        <n-button type="primary" :loading="true">加载中</n-button>
    </div>
```
:::

### 事件
Button 支持click 事件

<div class="example">
    <div class="example-box">
        <div>
            <n-button  @on-click="handleClick">点击事件</n-button>
        </div>
    </div>
</div>

<script>
    export default {
        methods: {
            handleClick(event) {
                alert('点击事件！来自星拥月Button组件')
            }
        }
    }
</script>

::: code
```html
   <div>
       <n-button  @on-click="handleClick">点击事件</n-button>
   </div>
   <script>
       export default {
           methods: {
               handleClick(event) {
                   alert('点击事件！')
               }
           }
       }
   </script>
```
:::

### props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 尺寸   | string  |  `default`、`small`  、`large`       |    default   |
| type     | 类型   | string    |   `default` 、`primary`、`success`  、`warning` 、`error`|     primary  |
| loading     | 是否加载中状态   | Boolean    |    |     false  |
| round     |  是否圆角按钮 | Boolean    |    |     false  |
| disabled     | 是否禁用状态   | 	Boolean    |   `无`  |     false  |
| icon     | 带icon的按钮   | 	string    |   `参考icon代码`  |       |

### events
| 事件名	      | 说明	    | 返回值 |
|---------- |-------- |---------- |
| on-click     | 点击按钮时触发   | -  |
