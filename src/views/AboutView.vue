<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button v-track-report:data="{ eventCode: 'eventCode', extensions: 'extensions', optionsType: 'optionsType' }">
      test report directive</el-button
    >

    <div>测试选项式API 国际化 {{ $t('testI18.name') }}</div>
    <div>
      <el-button type="primary" @click="changeLang">测试切换语言</el-button>
    </div>
  </div>
</template>

<script>
import User from '@/api/user';
import store from '@/store';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  computed: {},
  created() {
    this.login();
  },
  methods: {
    async login() {
      const res = await User.login(this.username, this.password);
      console.log(res);
    },
    changeLang() {
      const lang = store.getters.language === 'zh-CN' ? 'en-US' : 'zh-CN';
      store.dispatch('system/setLanguage', lang);
      this.$i18n.locale = lang;
    },
  },
};
</script>

<style lang="less">
@media (min-width: 1024px) {
  .about {
    display: flex;
    align-items: center;
    min-height: 100vh;

    h1 {
      color: red;
    }
  }
}
</style>
