import Vue from 'vue';

import JctransUI from 'element-ui';
import App from './App.vue';
import store from './store';
import router from './router';
import directives from '@/directives';
import permission from '@/config/permission';

import 'element-ui/lib/theme-chalk/index.css';

import 'uno.css';

import '@/style/index.less';
import '@/assets/main.css';

Vue.use(permission, { router, store });
Vue.use(JctransUI);
Vue.use(directives);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
