import Vue from 'vue';
import { createI18n, castToVueI18n } from 'vue-i18n-bridge';
import VueI18n from 'vue-i18n';

import enLocale from 'element-ui/lib/locale/lang/en'; // 引入elementui语言包
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'; // 引入ele语言包
import store from '@/store';

import zhCN from './lang/zh_CN';
import en from './lang/en';

Vue.use(VueI18n, { bridge: true });
const messages = {
  'en-US': {
    ...en,
    ...enLocale,
    globalhi: 'This is global Hello',
  },
  'zh-CN': {
    ...zhCN,
    ...zhLocale,
    globalhi: '你好啊',
  },
};

const i18n = castToVueI18n(
  createI18n(
    {
      legacy: false,
      globalInjection: true,
      locale: store.getters.language,
      silentTranslationWarn: true,
      missingWarn: false,
      messages,
    },
    VueI18n,
  ),
);

export default i18n;
