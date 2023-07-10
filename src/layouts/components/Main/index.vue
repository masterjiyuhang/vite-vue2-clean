<template>
  <transition appear name="fade-transform" mode="out-in">
    <router-view v-slot="{ Component, route }">
      <keep-alive :include="[]">
        <component :is="Component" :key="route.path" />
      </keep-alive>
    </router-view>
  </transition>
</template>

<script>
export default {};
</script>

<style lang="less" scoped></style>
