<template>
  <main>
    <!-- <TheWelcome /> -->
    {{ lang }}
    <h1>hhh</h1>
  </main>
</template>

<script setup>
import store from '@/store';

console.log(store);
const lang = store.getters.language;
// import TheWelcome from '@/components/TheWelcome.vue';
</script>
