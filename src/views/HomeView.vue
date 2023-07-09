<template>
  <main>
    <!-- <TheWelcome /> -->
    {{ lang }}
    <div class="home__content_one">测试国际化 {{ $t('testI18.name') }}</div>
    <div class="home__content_two">
      <el-button type="primary" @click="changeLang">测试切换语言</el-button>
    </div>
  </main>
</template>

<script setup>
import { useI18n } from 'vue-i18n-bridge';
import store from '@/store';

// console.log(store);
let lang = store.getters.language;

const { locale, t, messages } = useI18n();

console.log(locale, t, messages);

const changeLang = () => {
  lang = lang === 'en-US' ? 'zh-CN' : 'en-US';
  store.dispatch('system/setLanguage', lang);
  locale.value = lang;
};
// import TheWelcome from '@/components/TheWelcome.vue';
</script>
