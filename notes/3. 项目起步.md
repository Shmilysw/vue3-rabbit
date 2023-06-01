# 创建项目并整理目录

```bash
npm init vue@latest
```

![image.png](https://cdn.nlark.com/yuque/0/2022/png/274425/1670247123883-f43f81f8-7600-4fd7-aa82-2751d9032a54.png#averageHue=%23212120&clientId=ufebee43b-b163-4&from=paste&height=494&id=u1b534575&name=image.png&originHeight=659&originWidth=1280&originalType=binary&ratio=1&rotation=0&showTitle=false&size=3380277&status=done&style=none&taskId=ud39028ba-b1d4-47ed-adf7-79865628edd&title=&width=960)

# jsconfig.json配置别名路径
> 配置别名路径可以在写代码时联想提示路径

```json
{
  "compilerOptions" : {
    "baseUrl" : "./",
    "paths" : {
      "@/*":["src/*"]
    }
  }
}
```
# elementPlus引入
## 1. 安装elementPlus和自动导入插件
```bash
npm i elementPlus
npm install -D unplugin-vue-components unplugin-auto-import
```
## 2. 配置自动按需导入
```javascript
// 引入插件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


export default defineConfig({
  plugins: [
    // 配置插件
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ]
})
```
## 3. 测试组件
```vue
<template>
  <el-button type="primary">i am button</el-button>
</template>
```
# 定制elementPlus主题
## 1. 安装sass
> 基于vite的项目默认不支持css预处理器，需要开发者单独安装

```bash
npm i sass -D
```
## 2. 准备定制化的样式文件
```javascript
/* 只需要重写你需要的即可 */
@forward 'element-plus/theme-chalk/src/common/var.scss' with (
  $colors: (
    'primary': (
      // 主色
      'base': #27ba9b,
    ),
    'success': (
      // 成功色
      'base': #1dc779,
    ),
    'warning': (
      // 警告色
      'base': #ffb302,
    ),
    'danger': (
      // 危险色
      'base': #e26237,
    ),
    'error': (
      // 错误色
      'base': #cf4444,
    ),
  )
)
```
## 3. 自动导入配置
> 这里自动导入需要深入到elementPlus的组件中，按照官方的配置文档来
> 1. 自动导入定制化样式文件进行样式覆盖
> 2. 按需定制主题配置 （需要安装 unplugin-element-plus）

```javascript
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 导入对应包
import ElementPlus from 'unplugin-element-plus/vite'
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // 按需定制主题配置
    ElementPlus({
      useSource: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 自动导入定制化样式文件进行样式覆盖
        additionalData: `
          @use "@/styles/element/index.scss" as *;
        `,
      }
    }
  }
})
```
# axios安装并简单封装
## 1. 安装axios
```bash
npm i axios
```
## 2. 基础配置
> 官方文档地址：[https://axios-http.com/zh/docs/intro](https://axios-http.com/zh/docs/intro)
> 基础配置通常包括：
> 1. 实例化 - baseURL + timeout
> 2. 拦截器 - 携带token 401拦截等

```javascript
import axios from 'axios'

// 创建axios实例
const http = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// axios请求拦截器
instance.interceptors.request.use(config => {
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
instance.interceptors.response.use(res => res.data, e => {
  return Promise.reject(e)
})


export default http
```
## 3. 封装请求函数并测试
```javascript
import http from '@/utils/http'

export function getCategoryAPI () {
  return http({
    url: 'home/category/head'
  })
}
```
# 路由整体设计
路由设计原则：找页面的切换方式，如果是整体切换，则为一级路由，如果是在一级路由的内部进行的内容切换，则为二级路由
```html
<template>
  我是登录页
</template>
```

```html
<template>
  我是首页
</template>
```

```html
<template>
  我是home
</template>
```

```html
<template>
  我是分类
</template>
```

```javascript
// createRouter：创建router实例对象
// createWebHistory：创建history模式的路由

import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path和component对应关系的位置
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: Home
        },
        {
          path: 'category',
          component: Category
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})

export default router
```
# 静态资源引入和Error Lens安装
## 1. 静态资源引入

1. 图片资源 - 把 images 文件夹放到 assets 目录下
2. 样式资源 - 把 common.scss 文件放到 styles 目录下
## 2. Error Lens插件安装
![image.png](https://cdn.nlark.com/yuque/0/2023/png/274425/1677637778086-7314f9de-8130-4388-9fc3-0cf4c59b8454.png#averageHue=%232a2e36&clientId=u68bde7ec-09c8-4&from=paste&height=196&id=udc027a23&name=image.png&originHeight=392&originWidth=1528&originalType=binary&ratio=2&rotation=0&showTitle=false&size=87943&status=done&style=none&taskId=ue37b0611-a082-4595-9dde-66e51632ef7&title=&width=764)
# scss变量自动导入
```css
$xtxColor: #27ba9b;
$helpColor: #e26237;
$sucColor: #1dc779;
$warnColor: #ffb302;
$priceColor: #cf4444;
```
```json
css: {
    preprocessorOptions: {
      scss: {
        // 自动导入scss文件
        additionalData: `
          @use "@/styles/element/index.scss" as *;
          @use "@/styles/var.scss" as *;
        `,
      }
    }
}
```

