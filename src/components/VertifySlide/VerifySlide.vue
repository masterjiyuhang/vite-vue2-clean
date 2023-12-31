<template>
  <div :style="{ position: 'relative' }">
    <div v-if="type === '2'" :style="{ height: parseInt(setSize.imgHeight) + vSpace + 'px' }" class="verify-img-out">
      <div :style="{ width: setSize.imgWidth, height: setSize.imgHeight }" class="verify-img-panel">
        <img
          :src="backImgBase ? 'data:image/png;base64,' + backImgBase : defaultImg"
          alt=""
          :style="{ width: '100%', height: '100%', display: 'block' }"
        />
        <div v-show="showRefresh" class="verify-refresh" @click="refresh">
          <i class="iconfont icon-refresh" />
        </div>
        <transition name="tips">
          <span v-if="tipWords" :class="passFlag ? 'suc-bg' : 'err-bg'" class="verify-tips">{{ tipWords }}</span>
        </transition>
      </div>
    </div>
    <div
      ref="verifySlide"
      class="verify-bar-area"
      :style="{
        width: setSize.imgWidth,
        height: barSize.height,
        'line-height': barSize.height,
      }"
    >
      <span class="verify-msg" v-text="'向右滑动完成验证'" />
      <div
        :style="{
          width: leftBarWidth !== undefined ? leftBarWidth : barSize.height,
          height: barSize.height,
          'border-color': leftBarBorderColor,
          transaction: transitionWidth,
        }"
        class="verify-left-bar"
      >
        <span class="verify-msg" v-text="finishText" />

        <div
          :style="{
            width: barSize.height,
            height: barSize.height,
            'background-color': moveBlockBackgroundColor,
            left: moveBlockLeft,
            transition: transitionLeft,
          }"
          class="verify-move-block"
          @mousedown="start"
          @touchstart="start"
        >
          <i :class="['verify-icon iconfont', iconClass]" :style="{ color: iconColor }" />
          <div
            v-if="type === '2'"
            :style="{
              width: Math.floor((parseInt(setSize.imgWidth) * 47) / 310) + 'px',
              height: setSize.imgHeight,
              top: '-' + (parseInt(setSize.imgHeight) + vSpace) + 'px',
              'background-size': setSize.imgWidth + ' ' + setSize.imgHeight,
            }"
            class="verify-sub-block"
          >
            <img
              :src="'data:image/png;base64,' + blockBackImgBase"
              alt=""
              :style="{ width: '100%', height: '100%', display: 'block' }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqCheck, reqGet } from '@/api/verifySlide';
import { aesEncrypt } from './ase';
import { resetSize } from './util';

export default {
  name: 'Slide',
  props: {
    type: {
      type: String,
      default: '1',
    },
    // 弹出式pop，固定fixed
    mode: {
      type: String,
      default: 'fixed',
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
    defaultImg: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      secretKey: '', // 后端返回的加密秘钥 字段
      passFlag: '', // 是否通过的标识
      backImgBase: '', // 验证码背景图片
      blockBackImgBase: '', // 验证滑块的背景图片
      backToken: '', // 后端返回的唯一token值
      startMoveTime: '', // 移动开始的时间
      endMovetime: '', // 移动结束的时间
      tipsBackColor: '', // 提示词的背景颜色
      tipWords: '',
      text: '',
      finishText: '',
      setSize: {
        imgHeight: 0,
        imgWidth: 0,
        barHeight: 0,
        barWidth: 0,
      },
      top: 0,
      left: 0,
      moveBlockLeft: undefined,
      leftBarWidth: undefined,
      // 移动中样式
      moveBlockBackgroundColor: undefined,
      leftBarBorderColor: '#ddd',
      iconColor: undefined,
      iconClass: 'icon-right',
      status: false, // 鼠标状态
      isEnd: false, // 是够验证完成
      showRefresh: true,
      transitionLeft: '',
      transitionWidth: '',
    };
  },

  computed: {
    barArea() {
      return this.$el.querySelector('.verify-bar-area');
    },
    resetSize() {
      return resetSize;
    },
  },

  watch: {
    // type变化则全面刷新
    type: {
      immediate: true,
      handler() {
        this.init();
      },
    },
  },

  mounted() {
    // 禁止拖拽
    this.$el.onselectstart = () => {
      return false;
    };
  },

  methods: {
    getPictrue() {
      const data = {
        clientUid: localStorage.getItem('slider'),
        ts: Date.now(),
      };
      reqGet(data).then((res) => {
        console.log(res);
        if (res.code === 0) {
          this.backImgBase = res.data.originalImageBase64;
          this.blockBackImgBase = res.data.jigsawImageBase64;
          this.backToken = res.data.uuid;
          this.secretKey = res.data.secretKey;
        } else {
          this.tipWords = res.msg;
        }

        if (res.code === 500) {
          this.backImgBase = null;
          this.blockBackImgBase = null;
        }
      });
    },
    isMobile() {
      const flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
      );
      return flag;
    },
    init() {
      this.$nextTick(() => {
        const el = this.$refs.verifySlide;

        this.text = '向右滑动完成验证';
        this.getPictrue();
        this.$nextTick(() => {
          const setSize = this.resetSize(this); // 重新设置宽度高度

          // eslint-disable-next-line guard-for-in
          for (const key in setSize) {
            this.setSize[key] = setSize[key];
          }
          this.$parent.$emit('ready', this);
        });

        const _this = this;

        const handleMove = (e) => {
          _this.move(e);
        };

        const handleEnd = () => {
          _this.end();
        };

        el.removeEventListener('touchmove', handleMove, { passive: false });
        el.removeEventListener('mousemove', handleMove, { passive: false });
        el.removeEventListener('touchend', handleEnd, { passive: false });
        el.removeEventListener('mouseup', handleEnd, { passive: false });

        el.addEventListener('touchmove', handleMove, { passive: false });
        el.addEventListener('mousemove', handleMove, { passive: false });
        el.addEventListener('touchend', handleEnd, { passive: false });
        el.addEventListener('mouseup', handleEnd, { passive: false });
      });
    },

    refresh() {
      this.showRefresh = true;
      this.finishText = '';

      this.transitionLeft = 'left .3s';
      this.moveBlockLeft = 0;

      this.leftBarWidth = undefined;
      this.transitionWidth = 'width .3s';

      this.leftBarBorderColor = '#ddd';
      this.moveBlockBackgroundColor = '#fff';
      this.iconColor = '#000';
      this.iconClass = 'icon-right';
      this.isEnd = false;

      this.getPictrue();
      setTimeout(() => {
        this.transitionWidth = '';
        this.transitionLeft = '';
        // this.text = this.$t("login.verification_explain");
        this.text = '向右滑动完成验证';
      }, 300);
    },
    // 鼠标按下
    start(e) {
      e = e || window.event;
      if (!this.isMobile()) {
        e = window.event || e;
      }
      e.preventDefault();
      // 兼容PC端
      let x = e.clientX;
      if (e.touches) {
        // 兼容移动端
        x = e.touches[0].pageX;
      }
      this.startLeft = Math.floor(x - this.barArea.getBoundingClientRect().left);
      this.startMoveTime = +new Date(); // 开始滑动的时间
      if (this.isEnd === false) {
        this.text = '';
        this.moveBlockBackgroundColor = '#337ab7';
        this.leftBarBorderColor = '#337AB7';
        this.iconColor = '#fff';
        e.stopPropagation();
        this.status = true;
      }
    },

    // 鼠标移动
    move(e) {
      e.preventDefault();

      e = e || window.event;
      if (!this.isMobile()) {
        e = window.event || e;
      }
      if (this.status && this.isEnd === false) {
        // 兼容PC端
        let x = e.clientX;
        if (e.touches) {
          // 兼容移动端
          x = e.touches[0].pageX;
        }
        const bar_area_left = this.barArea.getBoundingClientRect().left;
        let move_block_left = x - bar_area_left; // 小方块相对于父元素的left值
        if (move_block_left >= this.barArea.offsetWidth - parseInt(parseInt(this.blockSize.width, 10) / 2, 10) - 2) {
          move_block_left = this.barArea.offsetWidth - parseInt(parseInt(this.blockSize.width, 10) / 2, 10) - 2;
        }
        if (move_block_left <= 0) {
          move_block_left = parseInt(parseInt(this.blockSize.width, 10) / 2, 10);
        }
        // 拖动后小方块的left值
        this.moveBlockLeft = `${move_block_left - this.startLeft}px`;
        this.leftBarWidth = `${move_block_left - this.startLeft}px`;
      }
    },

    // 鼠标松开
    end() {
      this.endMovetime = +new Date();
      const _this = this;
      // 判断是否重合
      if (this.status && this.isEnd === false) {
        let moveLeftDistance = parseInt((this.moveBlockLeft || '').replace('px', ''), 10);
        moveLeftDistance = (moveLeftDistance * 310) / parseInt(this.setSize.imgWidth, 10);
        const data = {
          pointJson: this.secretKey
            ? aesEncrypt(JSON.stringify({ x: moveLeftDistance, y: 5.0 }), this.secretKey)
            : JSON.stringify({ x: moveLeftDistance, y: 5.0 }),
          uuid: this.backToken,
        };
        reqCheck(data).then((res) => {
          if (res.code === 0) {
            this.moveBlockBackgroundColor = '#5cb85c';
            this.leftBarBorderColor = '#5cb85c';
            this.iconColor = '#fff';
            this.iconClass = 'icon-check';
            this.showRefresh = false;
            this.isEnd = true;
            if (this.mode === 'pop') {
              setTimeout(() => {
                this.$parent.clickShow = false;
                this.refresh();
              }, 1500);
            }
            this.passFlag = true;
            this.tipWords = `${((this.endMovetime - this.startMoveTime) / 1000).toFixed(2)}s 验证成功`;

            setTimeout(() => {
              this.tipWords = '';
              this.$parent.closeBox();
              this.$parent.$emit('success', {
                uuid: res.data.uuid,
                code: res.data.code,
              });
            }, 1000);
          } else {
            this.moveBlockBackgroundColor = '#d9534f';
            this.leftBarBorderColor = '#d9534f';
            this.iconColor = '#fff';
            this.iconClass = 'icon-close';
            this.passFlag = false;
            setTimeout(() => {
              _this.refresh();
            }, 1000);
            this.$parent.$emit('error', this);
            // this.tipWords = this.$t("login.verification_failed");
            this.tipWords = '验证失败';
            setTimeout(() => {
              this.tipWords = '';
            }, 1000);
          }
        });
        this.status = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import './verifySlide.less';
</style>
