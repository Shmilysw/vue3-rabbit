<script setup>
import HomePanel from './HomePanel.vue'
import { getGoodsAPI } from '@/apis/home'
import { onMounted, ref } from 'vue'
import GoodsItem from './GoodsItem.vue'

// 获取数据列表
const goodsProduct = ref([])
const getGoods = async () => {
    const res = await getGoodsAPI()
    goodsProduct.value = res.result
}

onMounted(() => getGoods())

</script>

<template>
    <div class="home-product">
        <HomePanel :title="cate.name" v-for="cate in goodsProduct" :key="cate.id">
            <div class="box">
                <RouterLink class="cover" to="/">
                    <img v-img-lazy="cate.picture" />
                    <strong class="label">
                        <span>{{ cate.name }}馆</span>
                        <span>{{ cate.saleInfo }}</span>
                    </strong>
                </RouterLink>
                <ul class="goods-list">
                    <li v-for="goods in cate.goods" :key="goods.id">
                        <GoodsItem :goods="goods" />
                        <!-- <RouterLink to="/" class="goods-item">
                            <img v-img-lazy="goods.picture" alt="">
                            <p class="name ellipsis">{{ goods.name }}</p>
                            <p class="desc ellipsis">{{ goods.desc }}</p>
                            <p class="price">&yen;{{ goods.price }}</p>
                        </RouterLink> -->
                    </li>
                </ul>
            </div>
        </HomePanel>
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
    }
}
</style>