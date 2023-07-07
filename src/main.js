import Vue from 'vue';

import JctransUI from 'jctrans-ui';
import App from './App.vue';
import store from './store';
import router from './router';
import directives from '@/directives';
import permission from '@/config/permission';

import 'jctrans-ui/lib/theme-chalk/index.css';

import 'uno.css';

import '@/style/index.less';

Vue.use(permission, { router, store });
Vue.use(JctransUI);
Vue.use(directives);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
