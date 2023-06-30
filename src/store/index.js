import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import getters from '@/store/getters';

const plugins = import.meta.env.MODE !== 'production' ? [createLogger()] : [];

const files = import.meta.glob('./modules/*.js', {
  eager: true,
});

const modules = [];
Object.keys(files).forEach((key) => {
  const moduleName = key.substring(key.lastIndexOf('/') + 1, key.lastIndexOf('.js'));
  modules[moduleName] = files[key].default;
});

Vue.use(Vuex);

const store = new Vuex.Store({
  // 严格模式
  strict: import.meta.env.MODE !== 'production',
  modules,
  getters,
  plugins,
});

export default store;
