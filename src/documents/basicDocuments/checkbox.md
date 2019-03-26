# Checkbox 多选框
一组备选项中进行多选
### 基础用法
单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍。

<div class="example">
    <div class="example-box">
        <div>
            <n-checkbox name="1" on-clock="handleClick">多选框</n-checkbox>
        </div>
    </div>
</div>
<script>
    export default {
        methods: {
            handleClick(name,value) {
                alert(name,value)
            }
        }
    }
</script>

:::code
```html
<div class="example">
    <div class="example-box">
        <div>
            <input type="checkbox"/>备选项
        </div>
    </div>
</div>
<script>

</script>
```
:::