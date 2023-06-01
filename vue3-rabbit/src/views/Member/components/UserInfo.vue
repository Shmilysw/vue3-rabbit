<script setup>
import { useUserStore } from '@/stores/userStore'
import { getLikeListAPI } from '@/apis/user'
import { onMounted, ref } from 'vue'
import GoodsItem from '@/views/Home/components/GoodsItem.vue'
const userStore = useUserStore()


const likeList = ref([])

const getLikeList = async () => {
    // limit: 4 表示拉去的数据数量
    const res = await getLikeListAPI({ limit: 4 })
    likeList.value = res.result
}

onMounted(() => getLikeList())


// import { getLikeListAPI } from '@/apis/user'
// import { useUserStore } from '@/stores/userStore'
// import { onMounted, ref } from 'vue'
// import GoodsItem from '@/views/Home/components/GoodsItem.vue'
// const userStore = useUserStore()


// const likeList = ref([])

// const getLikeList = async () => {
//     const res = await getLikeListAPI({ limit: 4 })
//     likeList.value = res.result
// }

// onMounted(() => getLikeList())


</script>

<template>
    <div class="home-overview">
        <!-- 用户信息 -->
        <div class="user-meta">
            <div class="avatar">
                <img :src="userStore.userInfo?.avatar" />
            </div>
            <h4>{{ userStore.userInfo?.account }}</h4>
        </div>
        <div class="item">
            <a href="javascript:;">
                <span class="iconfont icon-hy"></span>
                <p>会员中心</p>
            </a>
            <a href="javascript:;">
                <span class="iconfont icon-aq"></span>
                <p>安全设置</p>
            </a>
            <a href="javascript:;">
                <span class="iconfont icon-dw"></span>
                <p>地址管理</p>
            </a>
        </div>
    </div>
    <div class="like-container">
        <div class="home-panel">
            <div class="header">
                <h4 data-v-bcb266e0="">猜你喜欢</h4>
            </div>
            <div class="goods-list">
                <GoodsItem v-for="good in likeList" :key="good.id" :goods="good" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.home-overview {
    height: 132px;
    background: url(@/assets/images/center-bg.png) no-repeat center / cover;
    display: flex;

    .user-meta {
        flex: 1;
        display: flex;
        align-items: center;

        .avatar {
            width: 85px;
            height: 85px;
            border-radius: 50%;
            overflow: hidden;
            margin-left: 60px;

            img {
                width: 100%;
                height: 100%;
            }
        }

        h4 {
            padding-left: 26px;
            font-size: 18px;
            font-weight: normal;
            color: white;
        }
    }

    .item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-around;

        &:first-child {
            border-right: 1px solid #f4f4f4;
        }

        a {
            color: white;
            font-size: 16px;
            text-align: center;

            .iconfont {
                font-size: 32px;
            }

            p {
                line-height: 32px;
            }
        }
    }
}

.like-container {
    margin-top: 20px;
    border-radius: 4px;
    background-color: #fff;
}

.home-panel {
    background-color: #fff;
    padding: 0 20px;
    margin-top: 20px;
    height: 400px;

    .header {
        height: 66px;
        border-bottom: 1px solid #f5f5f5;
        padding: 18px 0;
        display: flex;
        justify-content: space-between;
        align-items: baseline;

        h4 {
            font-size: 22px;
            font-weight: 400;
        }

    }

    .goods-list {
        display: flex;
        justify-content: space-around;
    }
}
</style>