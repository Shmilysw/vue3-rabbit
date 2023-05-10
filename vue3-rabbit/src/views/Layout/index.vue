<script setup>
import LayoutNar from './components/LayoutNar.vue';
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutFooter from './components/LayoutFooter.vue';

</script>
<template>
    <LayoutNar />
    <LayoutHeader />
    <RouterView />
    <LayoutFooter />
</template>