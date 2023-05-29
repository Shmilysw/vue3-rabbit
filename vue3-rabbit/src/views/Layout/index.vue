<script setup>
import LayoutNar from './components/LayoutNar.vue';
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutFooter from './components/LayoutFooter.vue';
import LayoutFixed from './components/LayoutFixed.vue';

// 触发获取导航列表的action
import { useCategoryStore } from '@/stores/categoryStore';
import { onMounted } from 'vue'

const categoryStore = useCategoryStore()

onMounted(() => {
    categoryStore.getCategory()
})
</script>
<template>
    <LayoutFixed />
    <LayoutNar />
    <LayoutHeader />
    <!-- 添加key 破坏复用机制 强制销毁重建-->
    <!-- <RouterView :key="$route.fullPath" /> -->
    <RouterView />
    <LayoutFooter />
</template>