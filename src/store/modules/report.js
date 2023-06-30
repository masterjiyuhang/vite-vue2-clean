const state = {
  startTime: new Date().getTime(),
};

const getters = {
  getCurrentTimestamp(state) {
    return state.startTime;
  },
};
const mutations = {
  GET_START_TIME(state) {
    return state.startTime;
  },
  SET_START_TIME(state, payload) {
    state.startTime = payload.time;
  },
};

const actions = {
  setStartTime({ commit }, currentTime) {
    commit('SET_START_TIME', { time: currentTime });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
