import axios from 'axios';
import { MessageBox } from 'jctrans-ui';
import store from '@/store';
import { getLocalItem, getSessionItem, praseStrEmpty } from './common';
import { getToken } from './auth';

let confirm = null;

// 创建请求实例
const instance = axios.create({
  baseURL: import.meta.env.MODE === 'development' ? import.meta.env.VITE_API_URL : window?.BASE_INFO.VUE_APP_BASE_API,
  // 指定请求超时的毫秒数
  timeout: 1000,
  // 表示跨域请求时是否需要使用凭证
  withCredentials: false,
});

// 前置拦截器（发起请求之前的拦截）
instance.interceptors.request.use(
  (config) => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false;
    const prjId = getSessionItem('prjId');
    const clientId = getLocalItem('clientId');
    if (getToken() && !isToken) {
      config.headers.Authorization = `Bearer ${getToken()}`; // 让每个请求携带自定义token 请根据实际情况自行修改
    }

    config.headers['Accept-Language'] = store.getters.language;
    config.headers.APPLICATION_ID = store.getters.appId;
    config.headers['APP-ID'] = store.getters.appId;
    // 访问接口的终端：电脑端网页-PC；小程序-MP；移动端H5页面-H5
    config.headers['terminal-type'] = 'PC';

    if (praseStrEmpty(prjId) !== '') {
      if (typeof prjId === 'number') {
        config.headers['popular-channel'] = prjId;
      } else if (typeof prjId === 'string') {
        config.headers['popular-channel'] = prjId.indexOf(',') > 0 ? prjId.split(',')[0] : prjId;
      }
    }
    if (praseStrEmpty(clientId) !== '') {
      config.headers['client-uid'] = clientId;
    }

    /**
     * 在这里一般会携带前台的参数发送给后台，比如下面这段代码：
     * const token = getToken()
     * if (token) {
     *  config.headers.token = token
     * }
     */
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 后置拦截器（获取到响应时的拦截）
instance.interceptors.response.use(
  (response) => {
    const { code } = response.data;
    if (code === 401) {
      if (!confirm) {
        confirm = 'message';
        MessageBox.confirm(
          store.getters.language === 'zh-CN'
            ? '亲爱的JCtrans用户，请您先登录哦'
            : 'Dear JCtrans user, please log in first',
          store.getters.language === 'zh-CN' ? '提示' : 'Tips',
          {
            confirmButtonText: store.getters.language === 'zh-CN' ? '确定' : 'Confirm',
            cancelButtonText: store.getters.language === 'zh-CN' ? '取消' : 'Cancel',
            type: 'warning',
          },
        )
          .then(() => {
            confirm = null;
            store.dispatch('LogOut').then(() => {
              // 异常返回统一登录页面，需要带当前系统的APPID + 当前path
              window.location.href = `${window.BASE_INFO.VUE_APP_LOGIN_PAGE}?appId=${
                store.getters.appId
              }&path=/&prjId=${getSessionItem('prjId')}`;
            });
          })
          .catch(() => {
            confirm = null;
          });
      }

      return Promise.reject(response.data);
    }
    return response.data;
  },
  (error) => {
    const { response } = error;
    if (response && response.data) {
      return Promise.reject(error);
    }
    const { message } = error;
    console.error(message);
    return Promise.reject(error);
  },
);

// 导出常用函数

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export const post = (url, data = {}, params = {}) => {
  return instance({
    method: 'post',
    url,
    data,
    params,
  });
};

/**
 * @param {string} url
 * @param {object} params
 */
export const get = (url, params = {}) => {
  return instance({
    method: 'get',
    url,
    params,
  });
};

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export const put = (url, data = {}, params = {}) => {
  return instance({
    method: 'put',
    url,
    params,
    data,
  });
};

/**
 * @param {string} url
 * @param {object} params
 */
export const _delete = (url, params = {}) => {
  return instance({
    method: 'delete',
    url,
    params,
  });
};

export default instance;
