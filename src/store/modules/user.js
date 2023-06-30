import { authExchangeApi, getUserInfoApi, logoutApi } from '@/api/system';
import { removeToken, setExpiresIn, setToken } from '@/utils/auth';

const state = {
  userInfo: {},
  userId: '',
  nameLog: '',

  comVips: {},
  compInfo: {},
};

const getters = {
  getUserId(state) {
    return state.userId;
  },
};
const mutations = {
  SET_USERINFO: (state, data) => {
    state.userInfo = data;
  },

  SET_USER_ID: (state, data) => {
    state.userId = data;
  },

  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_EXPIRES_IN: (state, time) => {
    state.expires_in = time;
  },

  SET_COMP: (state, data) => {
    state.compInfo = data;
  },

  SET_VIPS: (state, data) => {
    state.accVips = data.accVips;
    state.comVips = data.comVips;
  },
};

const actions = {
  /**
   * 获取用户信息
   */
  async getUserInfo({ commit }) {
    try {
      const { data } = await getUserInfoApi();
      commit('SET_USERINFO', data.account);

      commit('SET_COMP', {
        orgId: data.company.compId,
        orgName: data.company.nameCn,
        orgNameEn: data.company.nameEn || data.company.nameCn,
        compName: data.company.compName,
        industrySector: data.company.industrySector,
      });

      commit('SET_VIPS', {
        accVips: data.accVips,
        comVips: data.company.compVips || [],
      });
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * 获取用户信息
   */
  async authExchange({ commit }, data) {
    return new Promise((resolve, reject) => {
      authExchangeApi(data)
        .then((res) => {
          const { data } = res;
          setToken(data.accessToken);
          commit('SET_TOKEN', data.accessToken);
          setExpiresIn(data.expireIn);
          commit('SET_EXPIRES_IN', data.expireIn);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // 退出系统
  LogOut({ commit, state }) {
    return new Promise((resolve, reject) => {
      logoutApi(state.token)
        .then(() => {
          commit('SET_TOKEN', '');
          commit('SET_USER_ID', '');
          removeToken();
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
