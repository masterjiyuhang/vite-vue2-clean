<template>
  <div class="home">
    <div class="home__content_one"></div>
    <div class="home__content_two"></div>
    <div class="home__content_three"></div>
    <div class="home__content_four"></div>
  </div>
</template>

<script setup>
// import TheWelcome from '@/components/TheWelcome.vue';
</script>

<style lang="scss" scoped>
.home {
  &__content_one {
    height: 500px;
    background-color: #eee;
  }

  &__content_two {
    height: 500px;
    background-color: #cce;
  }

  &__content_three {
    height: 500px;
    background-color: #bba;
  }

  &__content_four {
    height: 500px;
    background-color: #f00;
  }
}
</style>
