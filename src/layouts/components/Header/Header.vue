<template>
  <div class="header" :class="[headerTheme]">
    <div class="header-left">
      <header-left></header-left>
    </div>
    <div class="menu">
      <el-menu
        router
        mode="horizontal"
        :default-active="activeMenu"
        background-color="transparent"
        :class="textColor"
        :active-text-color="activeTextColor"
        class="flex-1 menu_wrap"
        @click="handleClick"
      >
        <el-menu-item index="/">首页 </el-menu-item>

        <el-submenu :popper-class="'submenu'">
          <template slot="title">二级菜单</template>
          <el-menu-item index="/about">
            <span>about</span>
          </el-menu-item>
          <el-menu-item index="/test">
            <span>test</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>

    <div class="header-right">
      <header-right />
    </div>
  </div>
</template>

<script>
import HeaderLeft from './components/HeaderLeft/index.vue';
import HeaderRight from './components/HeaderRight/index.vue';

export default {
  name: 'JcHeader',
  components: {
    HeaderLeft,
    HeaderRight,
  },
  data() {
    return {
      scrollFlag: false,
    };
  },
  computed: {
    activeMenu() {
      return this.$route.path;
    },
    headerTheme() {
      if (this.scrollFlag) {
        return `header-sticky`;
      }
      return `header-fixed`;
    },
    textColor() {
      let theme = '';
      switch (this.headerTheme) {
        case `header-fixed`:
          theme = `theme-light`;
          break;
        case `header-sticky`:
          theme = `theme-dark`;
          break;
        default:
          theme = `theme-dark`;
      }
      return theme;
    },
    activeTextColor() {
      let color = ``;
      switch (this.headerTheme) {
        case `header-fixed`:
          color = `#333`;
          break;
        case `header-sticky`:
          color = `rgb(34 35 36)`;
          break;
        default:
          color = `blue`;
      }
      return color;
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll, true);
  },
  methods: {
    handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 50) {
        this.scrollFlag = true;
      } else if (scrollTop === 0) {
        this.scrollFlag = false;
      }
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss">
@import url('./header.scss');
</style>
