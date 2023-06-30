import { getBrowserLanguage } from '@/utils/common';

const state = {
  token: '',
  appId: import.meta.env.VITE_APP_ID,
  language: getBrowserLanguage(),
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
  SET_LANGUAGE: (state, language) => {
    state.language = language;
  },
};

const actions = {
  // 国际化设置
  setLanguage({ commit }, language) {
    localStorage.setItem('jc-language', language);
    commit('SET_LANGUAGE', language);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
