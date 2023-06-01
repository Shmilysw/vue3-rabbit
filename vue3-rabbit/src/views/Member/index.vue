<script setup>

</script>

<template>
    <div class="container">
        <div class="xtx-member-aside">
            <div class="user-manage">
                <h4>我的账户</h4>
                <div class="links">
                    <RouterLink to="/member">个人中心</RouterLink>
                </div>
                <h4>交易管理</h4>
                <div class="links">
                    <RouterLink to="/member/order">我的订单</RouterLink>
                </div>
            </div>
        </div>
        <div class="article">
            <!-- 三级路由的挂载点 -->
            <RouterView />
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    display: flex;
    padding-top: 20px;

    .xtx-member-aside {
        width: 220px;
        margin-right: 20px;
        border-radius: 2px;
        background-color: #fff;

        .user-manage {
            background-color: #fff;

            h4 {
                font-size: 18px;
                font-weight: 400;
                padding: 20px 52px 5px;
                border-top: 1px solid #f6f6f6;
            }

            .links {
                padding: 0 52px 10px;
            }

            a {
                display: block;
                line-height: 1;
                padding: 15px 0;
                font-size: 14px;
                color: #666;
                position: relative;

                &:hover {
                    color: $xtxColor;
                }

                &.active,
                &.router-link-exact-active {
                    color: $xtxColor;

                    &:before {
                        display: block;
                    }
                }

                &:before {
                    content: '';
                    display: none;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    position: absolute;
                    top: 19px;
                    left: -16px;
                    background-color: $xtxColor;
                }
            }
        }
    }

    .article {
        width: 1000px;
        background-color: #fff;
    }
}
</style>