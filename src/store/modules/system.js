import { getBrowserLanguage } from '@/utils/common';

const state = {
  bgColor: '#FFFFFF',
  token: '',
  appId: import.meta.env.VITE_APP_ID,
  language: getBrowserLanguage(),

  menuKey: '1',
  isCollapse: false,
  indexQuery: [],
};

const getters = {
  getAppId(state) {
    return state.appId;
  },
  getLanguage(state) {
    return state.language;
  },
};
const mutations = {
  SET_MENU_KEY: (state, data) => {
    state.menuKey = data;
  },
  SET_IS_COLLAPSE: (state, data) => {
    state.isCollapse = data;
  },
  SET_LANGUAGE: (state, language) => {
    state.language = language;
  },
  SET_TITLE: (state, title) => {
    state.title = title;
  },
};

const actions = {
  // 国际化设置
  setLanguage({ commit }, language) {
    localStorage.setItem('jc-language', language);
    commit('SET_LANGUAGE', language);
  },

  setTitle({ commit }, title) {
    commit('SET_TITLE', title);
  },

  // 存储MenuKey
  setMenuKey({ commit }, data) {
    commit('SET_MENU_KEY', data);
  },

  setIsCollapse({ commit }, data) {
    commit('SET_IS_COLLAPSE', data);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
