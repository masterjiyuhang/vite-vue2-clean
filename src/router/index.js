import Vue from 'vue';
import VueRouter from 'vue-router';

import { basicRouter } from './basic';

Vue.use(VueRouter);

const routes = [...basicRouter];

const router = new VueRouter({
  mode: import.meta.env.MODE !== 'production' ? 'history' : 'hash',
  base: import.meta.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
