import Vue from 'vue';

import ElementUI from 'element-ui';
import App from './App.vue';
import store from './store';
import router from './router';
import directives from '@/directives';
import permission from '@/config/permission';

import 'element-ui/lib/theme-chalk/index.css';

import 'uno.css';

import '@/style/index.less';
import '@/assets/main.css';

import i18n from '@/locales/setupI18n';

Vue.use(permission, { router, store });
Vue.use(ElementUI);
Vue.use(directives);
Vue.use(i18n);

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
