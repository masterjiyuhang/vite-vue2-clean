<template>
  <div class="main">
    <div class="flex-1">
      <transition appear name="fade-transform" mode="out-in">
        <router-view v-slot="{ Component, route }">
          <keep-alive :include="keepAliveName">
            <component :is="Component" :key="route.path" />
          </keep-alive>
        </router-view>
      </transition>
    </div>
    <JcFooter />
  </div>
</template>

<script>
import JcFooter from '@/layouts/components/Footer/Footer.vue';

export default {
  name: 'AppMain',
  components: {
    JcFooter,
  },
  data() {
    return {
      keepAliveName: [],
    };
  },
  computed: {
    key() {
      return this.$route.path;
    },
  },
};
</script>

<style></style>
