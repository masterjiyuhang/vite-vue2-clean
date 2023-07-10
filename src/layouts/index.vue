<template>
  <div class="flex flex-col w-full h-full">
    <Header />
    <Main flex-1 class="mt-[80px]" />
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header/index.vue';
import Footer from './components/Footer/index.vue';
import Main from './components/Main/index.vue';
</script>

<style lang="scss" scoped></style>
