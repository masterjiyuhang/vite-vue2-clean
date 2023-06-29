<template>
  <div v-show="showBox" :class="mode == 'pop' ? 'mask' : ''">
    <div :class="mode == 'pop' ? 'verifybox' : ''" :style="{ 'max-width': parseInt(imgSize.width) + 30 + 'px' }">
      <div v-if="mode == 'pop'" class="verifybox-top">
        请完成安全验证
        <span class="verifybox-close" @click="closeBox">
          <i class="iconfont icon-close" />
        </span>
      </div>
      <div class="verifybox-bottom" :style="{ padding: mode == 'pop' ? '15px' : '0' }">
        <VerifySlide
          v-if="componentType"
          ref="instance"
          :captcha-type="captchaType"
          :type="verifyType"
          :mode="mode"
          :v-space="vSpace"
          :explain="explain"
          :img-size="imgSize"
          :block-size="blockSize"
          :bar-size="barSize"
          :default-img="defaultImg"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VerifySlide from './VerifySlide.vue';
import default_image from '@/assets/images/default.jpg';

export default {
  name: 'Verify',
  components: {
    VerifySlide,
  },
  props: {
    locale: {
      type: String,
      default: 'zh-CN',
    },
    captchaType: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      default: 'pop',
    },
    vSpace: {
      type: Number,
      default: 5,
    },
    explain: {
      type: String,
      default: '向右滑动完成验证',
    },
    imgSize: {
      type: Object,
      default() {
        return {
          width: '310px',
          height: '155px',
        };
      },
    },
    blockSize: {
      type: Object,
      default() {
        return {
          width: '50px',
          height: '50px',
        };
      },
    },
    barSize: {
      type: Object,
      default() {
        return {
          width: '310px',
          height: '40px',
        };
      },
    },
  },
  data() {
    return {
      // showBox:true,
      clickShow: false,
      // 内部类型
      verifyType: undefined,
      // 所用组件类型
      componentType: undefined,
      // 默认图片
      defaultImg: default_image,
    };
  },
  computed: {
    instance() {
      return this.$refs.instance || {};
    },
    showBox() {
      if (this.mode === 'pop') {
        return this.clickShow;
      }
      return true;
    },
  },
  watch: {
    captchaType: {
      immediate: true,
      handler(captchaType) {
        switch (captchaType.toString()) {
          case 'blockPuzzle':
            this.verifyType = '2';
            this.componentType = 'VerifySlide';
            break;
          case 'clickWord':
            this.verifyType = '';
            this.componentType = 'VerifyPoints';
            break;
          default:
            break;
        }
      },
    },
  },
  mounted() {
    this.initUuid();
  },
  methods: {
    initUuid() {
      const s = [];
      const hexDigits = '0123456789abcdef';

      for (let i = 0; i < 36; i++) {
        if (i === 14) {
          s[i] = '4';
        } else if (i === 19) {
          // eslint-disable-next-line no-bitwise
          const index = (s[19] & 0x3) | 0x8;
          s[i] = hexDigits.substr(index, 1);
        } else if (i === 8 || i === 13 || i === 18 || i === 23) {
          s[i] = '-';
        } else {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
      }

      const slider = `slider-${s.join('')}`;
      const point = `point-${s.join('')}`;

      if (!localStorage.getItem('slider')) {
        localStorage.setItem('slider', slider);
      }
      if (!localStorage.getItem('point')) {
        localStorage.setItem('point', point);
      }
    },
    /**
     * refresh
     * @description 刷新
     * */
    refresh() {
      if (this.instance.refresh) {
        this.instance.refresh();
      }
    },
    closeBox() {
      this.clickShow = false;
      this.refresh();
    },
    show() {
      if (this.mode === 'pop') {
        this.refresh();
        this.clickShow = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
