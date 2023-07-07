<template>
  <div class="layout">
    <JcHeader />
    <AppMain />
  </div>
</template>

<script>
import { AppMain, Header } from './components';

export default {
  name: 'Layout',
  components: {
    AppMain,
    JcHeader: Header,
  },
};
</script>

<style scoped lang="scss">
@import './index.scss';
</style>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
