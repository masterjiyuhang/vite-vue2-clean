<template>
  <div>
    <el-button @click="handleOpenVerify">打开滑块</el-button>
    <Verify
      ref="verifyRef"
      mode="pop"
      captcha-type="blockPuzzle"
      :img-size="{ width: '330px', height: '155px' }"
      @success="handleVerifySubmit"
    />
    <el-button class="ml-5" type="danger" @click="handleOpenVerifySlide">打开滑块</el-button>

    <VerifySlide
      ref="verifySlideRef"
      mode="pop"
      captcha-type="blockPuzzle"
      :img-size="{ width: '330px', height: '155px' }"
      @success="handleVerifySubmit"
    />
  </div>
</template>

<script>
import Verify from '@/components/Verify/index.vue';
import Verifyy from '@/components/VertifySlide/index.vue';

export default {
  name: 'ValidateView',
  components: {
    Verify,
    VerifySlide: Verifyy,
  },
  methods: {
    handleOpenVerify() {
      this.$refs.verifyRef.show();
    },
    handleOpenVerifySlide() {
      this.$refs.verifySlideRef.show();
    },
    handleVerifySubmit() {
      console.log('滑块验证成功！');
    },
  },
};
</script>

<style lang="less" scoped></style>
