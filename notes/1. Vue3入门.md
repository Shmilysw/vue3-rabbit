# 认识Vue3
## 1. Vue3组合式API体验
> 通过 Counter 案例 体验Vue3新引入的组合式API

```vue
<script>
export default {
  data(){
    return {
      count:0
    }
  },
  methods:{
    addCount(){
      this.count++
    }
  }
}
</script>
```

```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)
const addCount = ()=> count.value++
</script>
```

特点：

1. 代码量变少
2. 分散式维护变成集中式维护
## 2. Vue3更多的优势
![image.png](https://cdn.nlark.com/yuque/0/2023/png/274425/1678178235504-912ad469-1a9a-469d-a8dc-411a55963329.png#averageHue=%23f4dcdc&clientId=ud0819acc-4d21-4&from=paste&height=516&id=u779f92e3&name=image.png&originHeight=1032&originWidth=2372&originalType=binary&ratio=2&rotation=0&showTitle=false&size=301467&status=done&style=none&taskId=u2dca71ca-84b3-48aa-8f52-f746797fcd1&title=&width=1186)


# 使用create-vue搭建Vue3项目
## 1. 认识create-vue
> create-vue是Vue官方新的脚手架工具，底层切换到了 vite （下一代前端工具链），为开发提供极速响应


![image.png](https://cdn.nlark.com/yuque/0/2023/png/274425/1678178479590-ac164009-4a72-4448-85bf-67dc13f3d0c4.png#averageHue=%23feefbe&clientId=ud0819acc-4d21-4&from=paste&height=402&id=u05a93b8e&name=image.png&originHeight=804&originWidth=1606&originalType=binary&ratio=2&rotation=0&showTitle=false&size=221602&status=done&style=none&taskId=uf227924e-280a-4766-add6-d34b9331b0d&title=&width=803)

## 2. 使用create-vue创建项目
> 前置条件 - 已安装16.0或更高版本的Node.js

执行如下命令，这一指令将会安装并执行 create-vue
```bash
npm init vue@latest
```

![image.png](https://cdn.nlark.com/yuque/0/2023/png/274425/1678178685782-71a3b311-423d-4528-aae9-85e6068db452.png#averageHue=%23333332&clientId=ud0819acc-4d21-4&from=paste&height=477&id=u807a99d3&name=image.png&originHeight=954&originWidth=1364&originalType=binary&ratio=2&rotation=0&showTitle=false&size=488023&status=done&style=none&taskId=u4d75c82e-6b19-48a6-a9df-0ee44d9e92c&title=&width=682)
# 熟悉项目和关键文件
![image.png](https://cdn.nlark.com/yuque/0/2023/png/274425/1678178749511-f4a42cbf-987b-46a7-9a01-9cd4f00a5fcf.png#averageHue=%23f1f1ef&clientId=ud0819acc-4d21-4&from=paste&height=541&id=u1ac1e797&name=image.png&originHeight=1082&originWidth=2256&originalType=binary&ratio=2&rotation=0&showTitle=false&size=595592&status=done&style=none&taskId=u38211dc7-742f-4d49-84f3-39a837eb254&title=&width=1128)

# 组合式API - setup选项
## 1. setup选项的写法和执行时机
写法
```vue
<script>
  export default {
    setup(){
      
    },
    beforeCreate(){
      
    }
  }
</script>
```
执行时机
> 在beforeCreate钩子之前执行

![image.png](https://cdn.nlark.com/yuque/0/2023/png/274425/1678179048672-603fdc19-4a41-4542-af55-702776625358.png#averageHue=%23fefefd&clientId=ud0819acc-4d21-4&from=paste&height=453&id=uf8697cce&name=image.png&originHeight=906&originWidth=1248&originalType=binary&ratio=2&rotation=0&showTitle=false&size=182575&status=done&style=none&taskId=u2cd1d681-f573-4456-9ddb-d2ab1f41805&title=&width=624)

## 2. setup中写代码的特点
> 在setup函数中写的数据和方法需要在末尾以对象的方式return，才能给模版使用

```vue
<script>
  export default {
    setup(){
      const message = 'this is message'
      const logMessage = ()=>{
        console.log(message)
      }
      // 必须return才可以
      return {
        message,
        logMessage
      }
    }
  }
</script>
```
## 3. <script setup>语法糖
> script标签添加 setup标记，不需要再写导出语句，默认会添加导出语句

```vue
<script setup>
  const message = 'this is message'
  const logMessage = ()=>{
    console.log(message)
  }
</script>
```

# 组合式API - reactive和ref函数
## 1. reactive
> 接受对象类型数据的参数传入并返回一个响应式的对象


```vue
<script setup>
 // 导入
 import { reactive } from 'vue'
 // 执行函数 传入参数 变量接收
 const state = reactive({
   msg:'this is msg'
 })
 const setSate = ()=>{
   // 修改数据更新视图
   state.msg = 'this is new msg'
 }
</script>

<template>
  {{ state.msg }}
  <button @click="setState">change msg</button>
</template>
```

## 2. ref
> 接收简单类型或者对象类型的数据传入并返回一个响应式的对象

```vue
<script setup>
 // 导入
 import { ref } from 'vue'
 // 执行函数 传入参数 变量接收
 const count = ref(0)
 const setCount = ()=>{
   // 修改数据更新视图必须加上.value
   count.value++
 }
</script>

<template>
  <button @click="setCount">{{count}}</button>
</template>
```
## 3. reactive 对比 ref

1. 都是用来生成响应式数据
2. 不同点
   1. reactive不能处理简单类型的数据
   2. ref参数类型支持更好，但是必须通过.value做访问修改
   3. ref函数内部的实现依赖于reactive函数
3. 在实际工作中的推荐
   1. 推荐使用ref函数，减少记忆负担，小兔鲜项目都使用ref
# 组合式API - computed
> 计算属性基本思想和Vue2保持一致，组合式API下的计算属性只是修改了API写法

```vue
<script setup>
// 导入
import {ref, computed } from 'vue'
// 原始数据
const count = ref(0)
// 计算属性
const doubleCount = computed(()=>count.value * 2)

// 原始数据
const list = ref([1,2,3,4,5,6,7,8])
// 计算属性list
const filterList = computed(item=>item > 2)
</script>
```
# 组合式API - watch
> 侦听一个或者多个数据的变化，数据变化时执行回调函数，俩个额外参数 immediate控制立刻执行，deep开启深度侦听

## 1. 侦听单个数据
```vue
<script setup>
  // 1. 导入watch
  import { ref, watch } from 'vue'
  const count = ref(0)
  // 2. 调用watch 侦听变化
  watch(count, (newValue, oldValue)=>{
    console.log(`count发生了变化，老值为${oldValue},新值为${newValue}`)
  })
</script>
```
## 2. 侦听多个数据
> 侦听多个数据，第一个参数可以改写成数组的写法

```vue
<script setup>
  // 1. 导入watch
  import { ref, watch } from 'vue'
  const count = ref(0)
  const name = ref('cp')
  // 2. 调用watch 侦听变化
  watch([count, name], ([newCount, newName],[oldCount,oldName])=>{
    console.log(`count或者name变化了，[newCount, newName],[oldCount,oldName])
  })
</script>
```
## 3. immediate
> 在侦听器创建时立即出发回调，响应式数据变化之后继续执行回调


```vue
<script setup>
  // 1. 导入watch
  import { ref, watch } from 'vue'
  const count = ref(0)
  // 2. 调用watch 侦听变化
  watch(count, (newValue, oldValue)=>{
    console.log(`count发生了变化，老值为${oldValue},新值为${newValue}`)
  },{
    immediate: true
  })
</script>
```
## 4. deep
> 通过watch监听的ref对象默认是浅层侦听的，直接修改嵌套的对象属性不会触发回调执行，需要开启deep

```vue
<script setup>
  // 1. 导入watch
  import { ref, watch } from 'vue'
  const state = ref({ count: 0 })
  // 2. 监听对象state
  watch(state, ()=>{
    console.log('数据变化了')
  })
  const changeStateByCount = ()=>{
    // 直接修改不会引发回调执行
    state.value.count++
  }
</script>

<script setup>
  // 1. 导入watch
  import { ref, watch } from 'vue'
  const state = ref({ count: 0 })
  // 2. 监听对象state 并开启deep
  watch(state, ()=>{
    console.log('数据变化了')
  },{deep:true})
  const changeStateByCount = ()=>{
    // 此时修改可以触发回调
    state.value.count++
  }
</script>

```
# 组合式API - 生命周期函数
## 1. 选项式对比组合式
![image.png](https://cdn.nlark.com/yuque/0/2023/png/274425/1678183720098-4d40e806-bc0d-4c38-bcbe-9aed440f6b23.png#averageHue=%23cdd7e8&clientId=ud0819acc-4d21-4&from=paste&height=554&id=uc176ffaf&name=image.png&originHeight=1108&originWidth=2190&originalType=binary&ratio=2&rotation=0&showTitle=false&size=261737&status=done&style=none&taskId=u64291cff-e1f5-4709-ba14-700b20d39e8&title=&width=1095)
## 2. 生命周期函数基本使用
> 1. 导入生命周期函数
> 2. 执行生命周期函数，传入回调

```vue
<scirpt setup>
import { onMounted } from 'vue'
onMounted(()=>{
  // 自定义逻辑
})
</script>
```
## 3. 执行多次
> 生命周期函数执行多次的时候，会按照顺序依次执行

```vue
<scirpt setup>
import { onMounted } from 'vue'
onMounted(()=>{
  // 自定义逻辑
})

onMounted(()=>{
  // 自定义逻辑
})
</script>
```
# 组合式API - 父子通信
## 1. 父传子
> 基本思想
> 1. 父组件中给子组件绑定属性
> 2. 子组件内部通过props选项接收数据


![image.png](https://cdn.nlark.com/yuque/0/2023/png/274425/1678184258336-94b25c26-3150-456b-8981-64017ce7b021.png#averageHue=%2323282f&clientId=ud0819acc-4d21-4&from=paste&height=337&id=u6f845ad3&name=image.png&originHeight=674&originWidth=2402&originalType=binary&ratio=2&rotation=0&showTitle=false&size=416739&status=done&style=none&taskId=ubb5c9d64-f3d7-4a1b-bc05-9bf2af1e24d&title=&width=1201)

## 2. 子传父
> 基本思想
> 1. 父组件中给子组件标签通过@绑定事件
> 2. 子组件内部通过 emit 方法触发事件


![image.png](https://cdn.nlark.com/yuque/0/2023/png/274425/1678184380538-99cfc459-3e2e-4d2e-9162-350ef5f97ec6.png#averageHue=%23242830&clientId=ud0819acc-4d21-4&from=paste&height=388&id=u4588c125&name=image.png&originHeight=776&originWidth=2284&originalType=binary&ratio=2&rotation=0&showTitle=false&size=573924&status=done&style=none&taskId=ue5c30a58-7910-4a5b-8325-7e572c6348e&title=&width=1142)

# 组合式API - 模版引用
> 概念：通过 ref标识 获取真实的 dom对象或者组件实例对象

## 1. 基本使用
> 实现步骤：
> 1. 调用ref函数生成一个ref对象
> 2. 通过ref标识绑定ref对象到标签

![image.png](https://cdn.nlark.com/yuque/0/2023/png/274425/1678184653565-b85c6f60-1089-4ad6-bed7-bbf781863db9.png#averageHue=%2324282f&clientId=ud0819acc-4d21-4&from=paste&height=442&id=u45efd4ee&name=image.png&originHeight=884&originWidth=1092&originalType=binary&ratio=2&rotation=0&showTitle=false&size=287093&status=done&style=none&taskId=u8dba8092-8819-44b3-a2ef-769257a611a&title=&width=546)
## 2. defineExpose
> 默认情况下在 <script setup>语法糖下组件内部的属性和方法是不开放给父组件访问的，可以通过defineExpose编译宏指定哪些属性和方法容许访问
> 说明：指定testMessage属性可以被访问到

![image.png](https://cdn.nlark.com/yuque/0/2023/png/274425/1678184774906-7486a911-d18c-42e8-9aa7-fe2caa35e104.png#averageHue=%23ecf2ee&clientId=ud0819acc-4d21-4&from=paste&height=292&id=u0d5c6487&name=image.png&originHeight=584&originWidth=2512&originalType=binary&ratio=2&rotation=0&showTitle=false&size=239701&status=done&style=none&taskId=ub87fd095-cc3e-4e44-92f6-7c9643f831a&title=&width=1256)
# 组合式API - provide和inject
## 1. 作用和场景
> 顶层组件向任意的底层组件传递数据和方法，实现跨层组件通信

![image.png](https://cdn.nlark.com/yuque/0/2023/png/274425/1678185158603-5ae6c0e5-7baa-4de9-8a54-d1864d6c45d3.png#averageHue=%23fdf6ef&clientId=ud0819acc-4d21-4&from=paste&height=596&id=ua50e576b&name=image.png&originHeight=1192&originWidth=2558&originalType=binary&ratio=2&rotation=0&showTitle=false&size=414782&status=done&style=none&taskId=u0792870d-aa73-4c03-8342-aaa56e5d8fb&title=&width=1279)

## 2. 跨层传递普通数据
> 实现步骤
> 1. 顶层组件通过 `provide` 函数提供数据
> 2. 底层组件通过 `inject` 函数提供数据


![image.png](https://cdn.nlark.com/yuque/0/2023/png/274425/1678185321144-61e96ddf-f56c-4d57-83bc-c3c6899f72b2.png#averageHue=%23e4efe5&clientId=ud0819acc-4d21-4&from=paste&height=435&id=u9eb7aecf&name=image.png&originHeight=870&originWidth=1736&originalType=binary&ratio=2&rotation=0&showTitle=false&size=242848&status=done&style=none&taskId=u3d40b793-c4bc-44e7-83d9-4df25e56a7d&title=&width=868)

## 3. 跨层传递响应式数据
> 在调用provide函数时，第二个参数设置为ref对象

![image.png](https://cdn.nlark.com/yuque/0/2023/png/274425/1678185454566-b866e7f4-fa23-4c44-a199-8ca19b7d438e.png#averageHue=%2381b27d&clientId=ud0819acc-4d21-4&from=paste&height=473&id=u4efc7283&name=image.png&originHeight=946&originWidth=1732&originalType=binary&ratio=2&rotation=0&showTitle=false&size=237788&status=done&style=none&taskId=uf829094c-f2f8-4ca1-a8ed-c20f9eb79e4&title=&width=866)

## 4. 跨层传递方法
> 顶层组件可以向底层组件传递方法，底层组件调用方法修改顶层组件的数据

![image.png](https://cdn.nlark.com/yuque/0/2023/png/274425/1678185556536-669d0753-2dda-41ae-a750-b0e32f837d42.png#averageHue=%2394b88e&clientId=ud0819acc-4d21-4&from=paste&height=391&id=u449ca48f&name=image.png&originHeight=782&originWidth=2556&originalType=binary&ratio=2&rotation=0&showTitle=false&size=242321&status=done&style=none&taskId=u80c0e832-0efd-4886-9a15-05ebfb4c772&title=&width=1278)

# 综合案例
![image.png](https://cdn.nlark.com/yuque/0/2023/png/274425/1678185631376-9e6cd19a-0788-42ab-90d4-1103fdbb80db.png#averageHue=%23fefefe&clientId=ud0819acc-4d21-4&from=paste&height=544&id=u35ff8500&name=image.png&originHeight=1088&originWidth=2302&originalType=binary&ratio=2&rotation=0&showTitle=false&size=455015&status=done&style=none&taskId=u6338b36f-65be-420e-af70-914bf97813d&title=&width=1151)
## 1. 项目地址
```bash
git clone  http://git.itcast.cn/heimaqianduan/vue3-basic-project.git
```
## 2. 项目说明

1. 模版已经配置好了案例必须的安装包
2. 案例用到的接口在 README.MD文件 中
3. 案例项目有俩个分支，main主分支为开发分支，complete分支为完成版分支供开发完参考
