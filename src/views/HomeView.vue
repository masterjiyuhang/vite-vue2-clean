<template>
  <main>
    <!-- <TheWelcome /> -->
    {{ store.getters.userInfo }}
  </main>
</template>

<script setup>
// import TheWelcome from '@/components/TheWelcome.vue';
import store from '@/store';
</script>
