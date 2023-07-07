<template>
  <el-footer class="footer" :height="'280px'">
    <div class="footer-container">
      <div class="left">left</div>
      <div class="right">right</div>
    </div>
    <p class="copyright text-center text-white">
      Copyright @www.jctrans.net JCtrans Network. 2000-2021 All rights reserved.Registration Number:10014810-3
    </p>
  </el-footer>
</template>

<script>
export default {
  name: 'JcFooter',
};
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  flex-direction: column;
  height: 280px;
  background-color: #000;
  background-image: url('@/assets/images/layouts/bg_feet@2x.png');
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 230px;
}

.footer-container {
  display: flex;
  flex: 23;

  .left {
    flex: 2;
  }

  .right {
    flex: 6;
  }
}

.copyright {
  display: flex;
  flex: 5;
  align-items: center;
  justify-content: center;
}
</style>
