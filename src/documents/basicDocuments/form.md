<script>
export default {
    data () {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter your password'))
            } else {
                if (this.formCustom.passwdCheck !== '') {
                    // 对第二个密码框单独验证
                    this.$refs.formCustom.validateField('passwdCheck')
                }
                callback()
            }
        }
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter your password again'))
            } else if (value !== this.formCustom.passwd) {
                callback(new Error('The two input passwords do not match!'))
            } else {
                callback()
            }
        }
        const validateAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('年龄不能为空'))
            }
            // 模拟异步验证效果
            setTimeout(() => {
                if (isNaN(Number(value))) {
                    callback(new Error('请输入有效的年龄'))
                } else {
                    if (value < 18) {
                        callback(new Error('不能小于18周岁'))
                    } else {
                        callback()
                    }
                }
            }, 1000)
        }
        return {
            form: {
                name: '',
                type: [],
                life: ''
            },
            formCustom: {
                passwd: '',
                passwdCheck: '',
                age: ''
            },
            ruleCustom: {
                passwd: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                passwdCheck: [
                    { validator: validatePassCheck, trigger: 'blur' }
                ],
                age: [
                    { validator: validateAge, trigger: 'blur' }
                ]
            },
            formValidate: {
                name: '',
                email: '',
                desc: '',
                hobby: []
            },
            ruleValidate: {
                name: [
                    {required: true, message: '姓名不能为空', trigger: 'blur'}
                ],
                email: [
                    {required: true, message: '邮箱不能为空', trigger: 'blur'},
                    {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
                ],
                hobby: [
                    {required: true, type: 'array', min: 1, message: '至少选择一个', trigger: 'change'},
                    {type: 'array', max: 2, message: '最多选择二个', trigger: 'change'}
                ],
                desc: [
                    {required: true, message: '描述不能为空', trigger: 'blur'},
                    {type: 'string', min: 5, max: 20, trigger: 'blur', message: '最少5个字符，最大20个字符'}
                ]
            }
        }
    },
    methods: {
        onSubmit () {
            console.log(this.form)
        },
        onClick () {
            alert(12)
        },
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!')
                } else {
                    this.$Message.error('Fail!')
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields()
            console.log(this.formValidate)
        }
    }
}
</script>

    
# Form 表单

由输入框、选择器、单选框、多选框等控件组成，用以校验，提交表单数据。

### 典型的表单

包括各种表单项，比如输入框、选择器、开关、单选框、多选框等。

<div class="example">
    <div class="example-box">
        <div>
        <n-form ref="form" :model="form" :label-width="80">
          <n-form-item label="活动名称">
            <n-input v-model="form.name"></n-input>
          </n-form-item>
          <n-form-item label="活动性质">
            <n-checkboxGroup v-model="form.type">
              <n-checkbox label="美食/餐厅线上活动" name="type"></n-checkbox>
              <n-checkbox label="地推活动" name="type"></n-checkbox>
              <n-checkbox label="线下主题活动" name="type"></n-checkbox>
              <n-checkbox label="单纯品牌曝光" name="type"></n-checkbox>
            </n-checkboxGroup>
          </n-form-item>
            <n-button @on-click="onSubmit">提交</n-button>
            <n-button @on-click="onClick">取消</n-button>
        </n-form>
        </div>
    </div>
    
::: code
```html
<div>
        <n-form ref="form" :model="form" :label-width="80">
          <n-form-item label="活动名称">
            <n-input v-model="form.name"></n-input>
          </n-form-item>
          <n-form-item label="活动性质">
            <n-checkboxGroup v-model="form.type">
              <n-checkbox label="美食/餐厅线上活动" name="type"></n-checkbox>
              <n-checkbox label="地推活动" name="type"></n-checkbox>
              <n-checkbox label="线下主题活动" name="type"></n-checkbox>
              <n-checkbox label="单纯品牌曝光" name="type"></n-checkbox>
            </n-checkboxGroup>
          </n-form-item>
          </n-form-item>
          <n-form-item>
            <n-button @click="onSubmit">提交</n-button>
            <n-button>取消</n-button>
          </n-form-item>
        </n-form>
</div>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          type: []
        }
      }
    },
    methods: {
      onSubmit() {
        console.log(12)
      }
    }
  }
</script>
```
:::

</div>

### 温馨提示：

W3C 标准中有如下[规定](https://www.w3.org/MarkUp/html-spec/html-spec_8.html#SEC8.2)：

> <i>When there is only one single-line text input field in a form, the user agent should accept Enter in that field as a request to submit the form.</i>

即：当一个 form 元素中只有一个输入框时，在该输入框中按下回车应提交该表单。如果希望阻止这一默认行为，可以在 `<n-form>` 标签上添加 `@submit.native.prevent`。

### 行内表单

设置 inline 属性可以让表单域变为行内的表单域

<div class="example">
    <div class="example-box">
        <div>
       <n-form inline :model="form" :label-width="60" label-position="left">
         <n-form-item label="姓名">
           <n-input v-model="form.name" placeholder="姓名"></n-input>
         </n-form-item>
          <n-form-item label="生活">
             <n-input v-model="form.life" placeholder="生活"></n-input>
           </n-form-item>
           <n-button @on-click="onSubmit">查询</n-button>
       </n-form>
        </div>
    </div>
    
::: code
```html
<div>
   <n-form inline :model="form" :label-width="60" label-position="left">
         <n-form-item label="姓名">
           <n-input v-model="form.name" placeholder="姓名"></n-input>
         </n-form-item>
          <n-form-item label="生活">
             <n-input v-model="form.life" placeholder="生活"></n-input>
           </n-form-item>
           <n-button @on-click="onSubmit">查询</n-button>
       </n-form>
</div>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          life: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log(12)
      }
    }
  }
</script>
```
:::
</div>

### 表单验证
Form 组件基于 `async-validator` 实现的数据验证，给 Form 设置属性 rules，同时给需要验证的 FormItem 设置属性 prop 指向对应字段即可。

完整的验证规则请参照开源项目 [async-validator](https://github.com/yiminghe/async-validator)。

验证方法也支持 Promise。

<div class="example">
    <div class="example-box">
        <div>
      <n-form :model="formValidate" :rules="ruleValidate" :label-width="80" ref="formValidate">
         <n-form-item label="姓名" prop="name">
           <n-input v-model="formValidate.name" placeholder="请输入姓名"></n-input>
         </n-form-item>
         <n-form-item label="邮箱" prop="email">
           <n-input v-model="formValidate.email" placeholder="请输入邮箱"></n-input>
         </n-form-item>
         <n-form-item label="兴趣" prop="hobby">
           <n-checkboxGroup v-model="formValidate.hobby">
             <n-checkbox label="唱歌"></n-checkbox>
             <n-checkbox label="跳舞"></n-checkbox>
             <n-checkbox label="打游戏"></n-checkbox>
             <n-checkbox label="看电影"></n-checkbox>
           </n-checkboxGroup>
         </n-form-item>
         <n-form-item label="描述" prop="desc">
           <n-input v-model="formValidate.desc" placeholder="请输入你的描述" type="textarea"></n-input>
         </n-form-item>
         <n-button @on-click="handleSubmit('formValidate')">提交</n-button>
         <n-button @on-click="handleReset('formValidate')">重置</n-button>
       </n-form>
        </div>
    </div>
    
::: code
```html
<template>
  <div>
    <n-form :model="formValidate" :rules="ruleValidate" :label-width="80" ref="formValidate">
      <n-form-item label="姓名" prop="name">
        <n-input v-model="formValidate.name" placeholder="请输入姓名"></n-input>
      </n-form-item>
      <n-form-item label="邮箱" prop="email">
        <n-input v-model="formValidate.email" placeholder="请输入邮箱"></n-input>
      </n-form-item>
      <n-form-item label="兴趣" prop="hobby">
        <n-checkboxGroup v-model="formValidate.hobby">
          <n-checkbox label="唱歌"></n-checkbox>
          <n-checkbox label="跳舞"></n-checkbox>
          <n-checkbox label="打游戏"></n-checkbox>
          <n-checkbox label="看电影"></n-checkbox>
        </n-checkboxGroup>
      </n-form-item>
      <n-form-item label="描述" prop="desc">
        <n-input v-model="formValidate.desc" placeholder="请输入你的描述" type="textarea"></n-input>
      </n-form-item>
      <n-button @on-click="handleSubmit('formValidate')">提交</n-button>
      <n-button @on-click="handleReset('formValidate')">重置</n-button>
    </n-form>
  </div>
</template>

<script>
export default {
    data () {
        return {
            formValidate: {
                name: '',
                email: '',
                desc: '',
                hobby: []
            },
            ruleValidate: {
                name: [
                    {required: true, message: '姓名不能为空', trigger: 'blur'}
                ],
                email: [
                    {required: true, message: '邮箱不能为空', trigger: 'blur'},
                    {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
                ],
                hobby: [
                    {required: true, type: 'array', min: 1, message: '至少选择一个', trigger: 'change'},
                    {type: 'array', max: 2, message: '最多选择二个', trigger: 'change'}
                ],
                desc: [
                    {required: true, message: '描述不能为空', trigger: 'blur'},
                    {type: 'string', min: 5, max: 20, trigger: 'blur', message: '最少5个字符，最大20个字符'}
                ]
            }
        }
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                console.log(this.formValidate)
                if (valid) {
                    this.$Message.success('Success!')
                } else {
                    this.$Message.error('Fail!')
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields()
        }
    }
}
</script>

```
:::
</div>

### 自定义验证
可以完全自定义验证规则来完成更复杂的验证，比如某些数据需要在服务端验证时。示例展示的是密码的二次确认及模拟的一个异步验证。

<div class="example">
    <div class="example-box">
        <div>
     <n-form :model="formCustom" :rules="ruleCustom" :label-width="80" ref="formCustom">
                 <n-form-item label="密码" prop="passwd">
                   <n-input v-model="formCustom.passwd" placeholder="请输入密码" type="password"></n-input>
                 </n-form-item>
                 <n-form-item label="确认密码" prop="passwdCheck">
                   <n-input v-model="formCustom.passwdCheck" placeholder="请再次输入你的密码" type="password"></n-input>
                 </n-form-item>
                 <n-form-item label="年龄" prop="age">
                   <n-input v-model="formCustom.age" placeholder="请输入你的年龄" type="text"></n-input>
                 </n-form-item>
                 <n-button @on-click="handleSubmit('formCustom')">提交</n-button>
                 <n-button @on-click="handleReset('formCustom')">重置</n-button>
      </n-form>
        </div>
    </div>
    
::: code
```html
<template>
  <div>
    <n-form :model="formCustom" :rules="ruleCustom" :label-width="80" ref="formCustom">
      <n-form-item label="密码" prop="passwd">
        <n-input v-model="formCustom.passwd" placeholder="请输入密码" type="password"></n-input>
      </n-form-item>
      <n-form-item label="确认密码" prop="passwdCheck">
        <n-input v-model="formCustom.passwdCheck" placeholder="请再次输入你的密码" type="password"></n-input>
      </n-form-item>
      <n-form-item label="年龄" prop="age">
        <n-input v-model="formCustom.age" placeholder="请输入你的年龄" type="text"></n-input>
      </n-form-item>
      <n-button @on-click="handleSubmit('formCustom')">提交</n-button>
      <n-button @on-click="handleReset('formCustom')">重置</n-button>
    </n-form>
  </div>
</template>

<script>
export default {
    data () {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter your password'))
            } else {
                if (this.formCustom.passwdCheck !== '') {
                    // 对第二个密码框单独验证
                    this.$refs.formCustom.validateField('passwdCheck')
                }
                callback()
            }
        }
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter your password again'))
            } else if (value !== this.formCustom.passwd) {
                callback(new Error('The two input passwords do not match!'))
            } else {
                callback()
            }
        }
        const validateAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('年龄不能为空'))
            }
            // 模拟异步验证效果
            setTimeout(() => {
                if (isNaN(Number(value))) {
                    callback(new Error('请输入有效的年龄'))
                } else {
                    if (value < 18) {
                        callback(new Error('不能小于18周岁'))
                    } else {
                        callback()
                    }
                }
            }, 1000)
        }
        return {
            formCustom: {
                passwd: '',
                passwdCheck: '',
                age: ''
            },
            ruleCustom: {
                passwd: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                passwdCheck: [
                    { validator: validatePassCheck, trigger: 'blur' }
                ],
                age: [
                    { validator: validateAge, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!')
                } else {
                    this.$Message.error('Fail!')
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields()
        }
    }
}
</script>

```
:::
</div>

### API

### Form props
| 属性      | 说明    | 类型            | 默认值   |
|---------- |-------- |----------------------  |-------- |
| model     |  表单数据对象   |Object  |    -   |
| rules     |  表单验证规则，具体配置查看  [async-validator](https://github.com/yiminghe/async-validator)  |  Object   |     -  |
| inline     | 是否开启行内表单模式	   | Boolean      |     false  |
| label-position     | 表单域标签的位置，可选值为 `left` 、`right` 、`top`   | String    |     right  |
| label-width     |  表单域标签的宽度，所有的 FormItem 都会继承 Form 组件的 label-width 的值 | Number    |     -  |
| show-message     |  是否显示校验错误信息 | Boolean  |     true  |
| autocomplete     |  原生的 autocomplete 属性，可选值为 off 或 on | String    |     off  |

### Form methods
| 方法名      | 说明         | 参数   |
|---------- |---------------------------  |-------- |
| validate     |  对整个表单进行校验，参数为检验完的回调，会返回一个 Boolean 表示成功与失败 |    callback   |
| validateField     | 对部分表单字段进行校验的方法，参数1为需校验的 prop，参数2为检验完回调，返回错误信息    |     callback  |
| resetFields     | 对整个表单进行重置，将所有字段值重置为空并移除校验结果     |     无  |

### FormItem props
| 属性      | 说明    | 类型            | 默认值   |
|---------- |-------- |----------------------  |-------- |
| prop     |  对应表单域 model 里的字段   |String  |    -   |
| label     |  标签文本  |  String   |     -  |
| label-width     | 表单域标签的的宽度	   | Number      |     -  |
| label-for    | 指定原生的 label 标签的 for 属性，配合控件的 element-id 属性，可以点击 label 时聚焦控件。  | String    |     -  |
| required     |  是否必填，如不设置，则会根据校验规则自动生成 | Boolean    |     -  |
| error        | 表单域验证错误信息, 设置该值会使表单验证状态变为error，并显示该错误信息  |     String | -  |
| show-message      |  是否显示校验错误信息 | Boolean    |     true  |

### FormItem slot
| 名称      | 说明        |
|---------- |--------- |
| 无     |  内容   |
| label     |  label内容 |
