# 什么是pinia
Pinia 是 Vue 的专属状态管理库，可以实现跨组件或页面共享状态，是 vuex 状态管理工具的替代品，和 Vuex相比，具备以下优势

1. 提供更加简单的API （去掉了 mutation ）
2. 提供符合组合式API风格的API （和 Vue3 新语法统一）
3. 去掉了modules的概念，每一个store都是一个独立的模块
4. 搭配 TypeScript 一起使用提供可靠的类型推断

# 创建空Vue项目并安装Pinia
### 1. 创建空Vue项目
```bash
npm init vue@latest
```

### 2. 安装Pinia并注册
```bash
npm i pinia
```

```javascript

import { createPinia } from 'pinia'

const app = createApp(App)
// 以插件的形式注册
app.use(createPinia())
app.use(router)
app.mount('#app')
```
# 实现counter
> 核心步骤：
> 1. 定义store
> 2. 组件使用store

1- 定义store
```javascript
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', ()=>{
  // 数据 （state）
  const count = ref(0)

  // 修改数据的方法 （action）
  const increment = ()=>{
    count.value++
  }

  // 以对象形式返回
  return {
    count,
    increment
  }
})

```
2- 组件使用store
```vue
<script setup>
  // 1. 导入use方法
	import { useCounterStore } from '@/stores/counter'
  // 2. 执行方法得到store store里有数据和方法
  const counterStore = useCounterStore()
</script>

<template>
	<button @click="counterStore.increment">
    {{ counterStore.count }}
  </button>
</template>
```

# 实现getters
> getters直接使用计算属性即可实现

```javascript
// 数据（state）
const count = ref(0)
// getter (computed)
const doubleCount = computed(() => count.value * 2)
```

# 异步action
> 思想：action函数既支持同步也支持异步，和在组件中发送网络请求写法保持一致
> 步骤：
> 1. store中定义action
> 2. 组件中触发action

1- store中定义action
```javascript
const API_URL = 'http://geek.itheima.net/v1_0/channels'

export const useCounterStore = defineStore('counter', ()=>{
  // 数据
  const list = ref([])
  // 异步action
  const loadList = async ()=>{
    const res = await axios.get(API_URL)
    list.value = res.data.data.channels
  }
  
  return {
    list,
    loadList
  }
})
```
2- 组件中调用action
```vue
<script setup>
	import { useCounterStore } from '@/stores/counter'
  const counterStore = useCounterStore()
  // 调用异步action
  counterStore.loadList()
</script>

<template>
	<ul>
    <li v-for="item in counterStore.list" :key="item.id">{{ item.name }}</li>
  </ul>
</template>
```
# storeToRefs保持响应式解构
> 直接基于store进行解构赋值，响应式数据（state和getter）会丢失响应式特性，使用storeToRefs辅助保持响应式

```vue
<script setup>
  import { storeToRefs } from 'pinia'
	import { useCounterStore } from '@/stores/counter'
  const counterStore = useCounterStore()
  // 使用它storeToRefs包裹之后解构保持响应式
  const { count } = storeToRefs(counterStore)

  const { increment } = counterStore
  
</script>

<template>
	<button @click="increment">
    {{ count }}
  </button>
</template>
```
