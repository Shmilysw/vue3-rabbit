# 静态结构搭建和分类实现
## 1. 整体结构创建
![image.png](https://cdn.nlark.com/yuque/0/2023/png/274425/1675417667651-eb841c73-5b36-48a5-a8ee-118dbeaaeb0d.png#averageHue=%23fcf8f8&clientId=u19c1ce9d-cad7-4&from=paste&height=458&id=u7e2d2595&name=image.png&originHeight=916&originWidth=1368&originalType=binary&ratio=1&rotation=0&showTitle=false&size=37531&status=done&style=none&taskId=uf8f39479-333b-4074-b888-53dc829c807&title=&width=684)

1- 按照结构新增五个组件，准备最简单的模版，分别在Home模块的入口组件中引入

- HomeCategory
- HomeBanner
- HomeNew
- HomeHot
- HomeProduct
```vue
<script setup>
</script>

<template>
  <div> HomeCategory </div>
</template>
```

2- Home模块入口组件中引入并渲染
```vue
<script setup>
import HomeCategory from './components/HomeCategory.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomeNew from './components/HomeNew.vue'
import HomeHot from './components/HomeHot.vue'
import homeProduct from './components/HomeProduct.vue'
</script>

<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>
  <HomeNew />
  <HomeHot />
  <homeProduct />
</template>
```
## 2. 分类实现
1- 准备详细模版
```vue
<script setup>

</script>

<template>
  <div class="home-category">
    <ul class="menu">
      <li v-for="item in 9" :key="item">
        <RouterLink to="/">居家</RouterLink>
        <RouterLink v-for="i in 2" :key="i" to="/">南北干货</RouterLink>
        <!-- 弹层layer位置 -->
        <div class="layer">
          <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
          <ul>
            <li v-for="i in 5" :key="i">
              <RouterLink to="/">
                <img alt="" />
                <div class="info">
                  <p class="name ellipsis-2">
                    男士外套
                  </p>
                  <p class="desc ellipsis">男士外套，冬季必选</p>
                  <p class="price"><i>¥</i>200.00</p>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>


<style scoped lang='scss'>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;

  .menu {
    li {
      padding-left: 40px;
      height: 55px;
      line-height: 55px;

      &:hover {
        background: $xtxColor;
      }

      a {
        margin-right: 4px;
        color: #fff;

        &:first-child {
          font-size: 16px;
        }
      }

      .layer {
        width: 990px;
        height: 500px;
        background: rgba(255, 255, 255, 0.8);
        position: absolute;
        left: 250px;
        top: 0;
        display: none;
        padding: 0 15px;

        h4 {
          font-size: 20px;
          font-weight: normal;
          line-height: 80px;

          small {
            font-size: 16px;
            color: #666;
          }
        }

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            width: 310px;
            height: 120px;
            margin-right: 15px;
            margin-bottom: 15px;
            border: 1px solid #eee;
            border-radius: 4px;
            background: #fff;

            &:nth-child(3n) {
              margin-right: 0;
            }

            a {
              display: flex;
              width: 100%;
              height: 100%;
              align-items: center;
              padding: 10px;

              &:hover {
                background: #e3f9f4;
              }

              img {
                width: 95px;
                height: 95px;
              }

              .info {
                padding-left: 10px;
                line-height: 24px;
                overflow: hidden;

                .name {
                  font-size: 16px;
                  color: #666;
                }

                .desc {
                  color: #999;
                }

                .price {
                  font-size: 22px;
                  color: $priceColor;

                  i {
                    font-size: 16px;
                  }
                }
              }
            }
          }
        }
      }

      // 关键样式  hover状态下的layer盒子变成block
      &:hover {
        .layer {
          display: block;
        }
      }
    }
  }
}
</style>
```
2- 完成代码
```vue
<script setup>
import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore()

</script>

<template>
  <div class="home-category">
    <ul class="menu">
      <li v-for="item in categoryStore.categoryList" :key="item.id">
        <RouterLink to="/">{{ item.name }}</RouterLink>
        <RouterLink v-for="i in item.children.slice(0, 2)" :key="i" to="/">{{ i.name }}</RouterLink>
        <!-- 弹层layer位置 -->
        <div class="layer">
          <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
          <ul>
            <li v-for="i in item.goods" :key="i.id">
              <RouterLink to="/">
                <img :src="i.picture" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">
                    {{ i.name }}
                  </p>
                  <p class="desc ellipsis">{{ i.desc }}</p>
                  <p class="price"><i>¥</i>{{ i.price }}</p>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>
```
# banner轮播图实现
## 1. 熟悉组件
```vue
<script setup>

</script>



<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in 4" :key="item">
        <img src="http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-15/6d202d8e-bb47-4f92-9523-f32ab65754f4.jpg" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>



<style scoped lang='scss'>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>
```
## 2. 获取数据渲染组件
1- 封装接口
```javascript
/**
 * @description: 获取banner图
 * @param {*}
 * @return {*}
 */
import  httpInstance  from '@/utils/http'
function getBannerAPI (){
  return request({
    url:'home/banner'
  })
}
```
2- 获取数据渲染模版
```vue
<script setup>
import { getBannerAPI } from '@/apis/home'
import { onMounted, ref } from 'vue'

const bannerList = ref([])

const getBanner = async () => {
  const res = await getBannerAPI()
  console.log(res)
  bannerList.value = res.result
}

onMounted(() => getBanner())

</script>



<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img :src="item.imgUrl" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

```
# 面板组件封装
## 1. 纯静态结构
```vue
<script setup>

</script>


<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
         <!-- 主标题和副标题 -->
        <h3>
          新鲜好物<small>新鲜出炉 品质靠谱</small>
        </h3>
      </div>
      <!-- 主体内容区域 -->
      <div> 主体内容 </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.home-panel {
  background-color: #fff;

  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;

    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;

      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>
```
## 2. 完整代码
```vue
<script setup>

defineProps({
  title: {
    type: String,
    default: ''
  },
  subTitle: {
    type: String,
    default: ''
  }
})

</script>


<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
        <!-- 主标题和副标题 -->
        <h3>
          {{ title }}<small>{{ subTitle }}</small>
        </h3>
      </div>
      <!-- 主体内容区域 -->
      <slot name="main" />
    </div>
  </div>
</template>


<style scoped lang='scss'>
.home-panel {
  background-color: #fff;

  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;

    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;

      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>
```
# 新鲜好物实现
## 1. 准备模版
```vue
<script setup>

</script>

<template>
  <div></div>
  <!-- 下面是插槽主体内容模版
  <ul class="goods-list">
    <li v-for="item in newList" :key="item.id">
      <RouterLink to="/">
        <img :src="item.picture" alt="" />
        <p class="name">{{ item.name }}</p>
        <p class="price">&yen;{{ item.price }}</p>
      </RouterLink>
    </li>
  </ul>
  -->
</template>


<style scoped lang='scss'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;

    background: #f0f9f4;
    transition: all .5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: $priceColor;
    }
  }
}
</style>
```
## 2. 封装接口
```javascript
/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export const findNewAPI = () => {
  return httpInstance({
    url:'/home/new'
  })
}
```

## 3. 获取数据渲染模版 
```vue
<script setup>
import HomePanel from './HomePanel.vue'
import { getNewAPI } from '@/apis/home'
import { ref } from 'vue'
const newList = ref([])
const getNewList = async () => {
  const res = await getNewAPI()
  newList.value = res.result
}

getNewList()
</script>

<template>
  <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
    <template #main>
      <ul class="goods-list">
        <li v-for="item in newList" :key="item.id">
          <RouterLink :to="`/detail/${item.id}`">
            <img :src="item.picture" alt="" />
            <p class="name">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </ul>
    </template>
  </HomePanel>
</template>
```
# 人气推荐实现
## 1. 封装接口
```javascript
/**
 * @description: 获取人气推荐
 * @param {*}
 * @return {*}
 */
export const getHotAPI = () => {
  return  httpInstance('home/hot', 'get', {})
}
```
## 2. 获取数据渲染模版
```vue
<script setup>
import HomePanel from './HomePanel.vue'
import { getHotAPI } from '@/apis/home'
import { ref } from 'vue'
const hotList = ref([])
const getHotList = async () => {
  const res = await getHotAPI()
  hotList.value = res.result
}
getHotList()

</script>

<template>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
      <ul class="goods-list">
        <li v-for="item in hotList" :key="item.id">
          <RouterLink to="/">
            <img v-img-lazy="item.picture" alt="">
            <p class="name">{{ item.title }}</p>
            <p class="desc">{{ item.alt }}</p>
          </RouterLink>
        </li>
      </ul>
  </HomePanel>
</template>

<style scoped lang='scss'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;

  li {
    width: 306px;
    height: 406px;
    transition: all .5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }

    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
```
# 懒加载指令实现
## 1. 封装全局指令
```javascript
// 定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
  install (app) {
    // 懒加载指令逻辑
    app.directive('img-lazy', {
      mounted (el, binding) {
        // el: 指令绑定的那个元素 img
        // binding: binding.value  指令等于号后面绑定的表达式的值  图片url
        console.log(el, binding.value)
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            console.log(isIntersecting)
            if (isIntersecting) {
              // 进入视口区域
              el.src = binding.value
              stop()
            }
          },
        )
      }
    })
  }
}
```
## 2. 注册全局指令
```javascript
// 全局指令注册
import { directivePlugin } from '@/directives'
app.use(directivePlugin)
```

# Product产品列表实现
## 1. 基础数据渲染
1- 准备静态模版
```vue
<script setup>
import HomePanel from './HomePanel.vue'

</script>

<template>
  <div class="home-product">
    <!-- <HomePanel :title="cate.name" v-for="cate in goodsProduct" :key="cate.id">
      <div class="box">
        <RouterLink class="cover" to="/">
          <img :src="cate.picture" />
          <strong class="label">
            <span>{{ cate.name }}馆</span>
            <span>{{ cate.saleInfo }}</span>
          </strong>
        </RouterLink>
        <ul class="goods-list">
          <li v-for="good in cate.goods" :key="good.id">
            <RouterLink to="/" class="goods-item">
              <img :src="good.picture" alt="" />
              <p class="name ellipsis">{{ good.name }}</p>
              <p class="desc ellipsis">{{ good.desc }}</p>
              <p class="price">&yen;{{ good.price }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
    </HomePanel> -->
  </div>
</template>

<style scoped lang='scss'>
.home-product {
  background: #fff;
  margin-top: 20px;
  .sub {
    margin-bottom: 2px;

    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;

      &:hover {
        background: $xtxColor;
        color: #fff;
      }

      &:last-child {
        margin-right: 80px;
      }
    }
  }

  .box {
    display: flex;

    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;

      img {
        width: 100%;
        height: 100%;
      }

      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);

        span {
          text-align: center;

          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }

          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }

    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;

      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;

        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }

        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }

    .goods-item {
      display: block;
      width: 220px;
      padding: 20px 30px;
      text-align: center;
      transition: all .5s;

      &:hover {
        transform: translate3d(0, -3px, 0);
        box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
      }

      img {
        width: 160px;
        height: 160px;
      }

      p {
        padding-top: 10px;
      }

      .name {
        font-size: 16px;
      }

      .desc {
        color: #999;
        height: 29px;
      }

      .price {
        color: $priceColor;
        font-size: 20px;
      }
    }
  }
}
</style>
```
2- 封装接口
```javascript
/**
 * @description: 获取所有商品模块
 * @param {*}
 * @return {*}
 */
export const getGoodsAPI = () => {
  return httpInstance({
    url: '/home/goods'
  })
}
```
3- 获取并渲染数据
```vue
<script setup>
import HomePanel from './HomePanel.vue'
import { getGoodsAPI } from '@/apis/home'
import { ref } from 'vue'
const goodsProduct = ref([])
const getGoods = async () => {
  const { result } = await getGoodsAPI()
  goodsProduct.value = result
}
onMounted( ()=> getGoods() )
</script>

<template>
  <div class="home-product">
    <HomePanel :title="cate.name" v-for="cate in goodsProduct" :key="cate.id">
      <div class="box">
        <RouterLink class="cover" to="/">
          <img :src="cate.picture" />
          <strong class="label">
            <span>{{ cate.name }}馆</span>
            <span>{{ cate.saleInfo }}</span>
          </strong>
        </RouterLink>
        <ul class="goods-list">
          <li v-for="goods in cate.goods" :key="good.id">
            <RouterLink to="/" class="goods-item">
              <img :src="goods.picture" alt="" />
              <p class="name ellipsis">{{ goods.name }}</p>
              <p class="desc ellipsis">{{ goods.desc }}</p>
              <p class="price">&yen;{{ goods.price }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>
```
## 2. 图片懒加载
```html
<div class="home-product">
  <HomePanel :title="cate.name" v-for="cate in goodsProduct" :key="cate.id">
    <div class="box">
      <RouterLink class="cover" to="/">
        <!-- 指令替换 -->
        <img v-img-lazy="cate.picture" />
      </RouterLink>
      <ul class="goods-list">
        <li v-for="goods in cate.goods" :key="goods.id">
          <RouterLink to="/" class="goods-item">
             <!-- 指令替换 -->
            <img v-img-lazy="goods.picture" alt="" />
          </RouterLink>
        </li>
      </ul>
    </div>
  </HomePanel>
</div>
```
# GoodsItem组件封装
## 1. 封装组件
```vue

<script setup>
defineProps({
  goods: {
    type: Object,
    default: () => { }
  }
})
</script>

<template>
  <RouterLink to="/" class="goods-item">
    <img :src="goods.picture" alt="" />
    <p class="name ellipsis">{{ goods.name }}</p>
    <p class="desc ellipsis">{{ goods.desc }}</p>
    <p class="price">&yen;{{ goods.price }}</p>
  </RouterLink>
</template>


<style scoped lang="scss">
.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  transition: all .5s;

  &:hover {
    transform: translate3d(0, -3px, 0);
    box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
  }

  img {
    width: 160px;
    height: 160px;
  }

  p {
    padding-top: 10px;
  }

  .name {
    font-size: 16px;
  }

  .desc {
    color: #999;
    height: 29px;
  }

  .price {
    color: $priceColor;
    font-size: 20px;
  }
}
</style>
```
## 2. 使用组件
```vue
<ul class="goods-list">
  <li v-for="goods in cate.goods" :key="item.id">
    <GoodsItem :goods="goods" />
  </li>
</ul>
```


