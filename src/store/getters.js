const getters = {
  bgColor: (state) => state.system.bgColor,
  token: (state) => state.system.token,
  appId: (state) => state.system.appId,
  language: (state) => state.system.language,
  menuKey: (state) => state.system.menuKey,
  isCollapse: (state) => state.system.isCollapse,
  indexQuery: (state) => state.system.indexQuery,

  userInfo: (state) => state.user.userInfo,
  userId: (state) => state.user.userId,
  nameLog: (state) => state.user.nameLog,
  comVips: (state) => state.user.comVips,
  compInfo: (state) => state.user.compInfo,
};
export default getters;
