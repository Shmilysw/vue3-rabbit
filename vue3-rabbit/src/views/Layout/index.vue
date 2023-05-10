<script setup>
import LayoutNar from './components/LayoutNar.vue';
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutFooter from './components/LayoutFooter.vue';
import LayoutFixed from './components/LayoutFixed.vue';

</script>
<template>
    <LayoutFixed />
    <LayoutNar />
    <LayoutHeader />
    <RouterView />
    <LayoutFooter />
</template>