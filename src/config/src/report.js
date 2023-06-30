import { reportApi } from '@/api/trackReport';

/**
 * 获取埋点上报的headers
 * @param {*} store
 * @param {*} to
 * @param {*} from
 * @returns
 */
const getReportHeaders = (store, to, from) => {
  const start = store.getters['report/getCurrentTimestamp'];
  const operateTime = new Date().getTime();
  const stay = operateTime - start;
  store.dispatch('report/setStartTime', operateTime);
  const headers = {
    'page-code': to.meta.pageCode,
    'operation-timestamp': operateTime,
    'operation-stay': from.meta.pageCode ? stay : 0,
    'operation-type': 'ROUTE', // 操作类型
  };

  return headers;
};

/**
 * 获取埋点上报的参数
 * @param {*} from
 * @param {*} appId
 * @param {*} extensions
 * @returns
 */
const getReportData = (store, from, appId, extensions = {}) => {
  appId = appId || store.getters['system/getAppId'];
  return {
    fromCode: from.meta.pageCode,
    compId: null,
    status: 'OK',
    eventCode: `${appId}.PAGE_INFO`, // 路由跳转默认是PAGE_INFO
    extensions: Object.keys(extensions).length > 0 ? extensions : {},
  };
};

/**
 * 埋点上报方法
 * @param {*} store
 * @param {*} to
 * @param {*} from
 */
export const execTrackReport = async (store, to, from) => {
  const headers = getReportHeaders(store, to, from);
  const reportData = getReportData(store, from);
  await reportApi(headers, reportData);
  console.log(headers, reportData, '埋点上报');
};
