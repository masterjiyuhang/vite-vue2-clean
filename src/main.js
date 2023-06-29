import Vue from 'vue';

import JctransUI from 'jctrans-ui';
import App from './App.vue';
import store from './store';
import router from './router';
import directives from '@/directives';

import 'jctrans-ui/lib/theme-chalk/index.css';

import 'uno.css';

import '@/style/index.less';
import '@/assets/main.css';

Vue.use(JctransUI);
Vue.use(directives);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
