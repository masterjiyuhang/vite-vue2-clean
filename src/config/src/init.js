import { MessageBox } from 'jctrans-ui';
import { getToken } from '@/utils/auth';
import { getLocalItem, getSessionItem, praseStrEmpty, setLocalItem, setSessionItem } from '@/utils/common';

const whiteList = ['ExceptionCase'];

// 菜单对应的menu的key
const menuKeys = {
  Index: '/',
  Dashboard: '/',
  MyShop: '40',
  Certificate: '32',
  Novice: 'Novice',
  ConnectSetting: '33',
  AccountSetting: '34',
  MyInquiryList: '36',
  MyReceiveList: '37',
  CustomerService: '38',
  InfoCenter: '41',
};

export const initPermissions = (to, from, next, store) => {
  // prjId 渠道
  const prjId = praseStrEmpty(to.query.prjId);

  if (prjId !== '') {
    setSessionItem('prjId', prjId);
    delete to.query.prjId;
  }
  if (praseStrEmpty(getLocalItem('clientId')) === '') {
    setLocalItem('clientId');
  }

  store.dispatch('system/setMenuKey', menuKeys[to.name] || '/');

  // 获取ExChange，换取Token
  const ecStr = to.query.exchange || '';
  // 说明已经登陆完成 从passport跳转回来了
  if (ecStr !== '') {
    store
      .dispatch('user/authExchange', {
        code: ecStr,
      })
      .then(() => {
        delete to.query.exchange;
        next({ ...to, replace: true });
      })
      .catch(() => {
        next({ path: '/404' });
      });
  } else {
    // 获取token
    handleGetToken(to, from, next, store);
  }
};

/**
 * 获取Token处理
 * @param {*} to 当前路的由信息
 * @param {*} from 来自的路由信息
 * @param {*} next 跳转方法
 * 有token: 获取用户信息
 * 没token: 根据条件跳转
 *      1. 客户端需要登录访问页面（无参），带客户端AppId = APPID ，跳转登录页面
 *      2. 客户端需要登录访问页面（有参），带客户端AppId = APPID + 参数，跳转登录页面
 *      3. 其他系统跳转到客户端需要登录访问页面，带客户端AppId = APPID ，跳转登录页面
 */
const handleGetToken = (to, from, next, store) => {
  const ITEM_KEY = `${import.meta.env.VITE_APP_ID}-Token`;
  if (getToken() || getLocalItem(ITEM_KEY)) {
    delete to.query.exchange;

    // 设置页面的title
    if (to.meta.title) {
      store.dispatch('system/setTitle', to.meta.title);
    }

    // 其实我们的系统中没有login页面压根。
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      // 白名单 直接走
      if (whiteList.indexOf(to.name) !== -1) {
        return next();
      }

      // // 直接跳转到异常登录状态页(异地登录被挤掉)
      // if (from.path === '/relogin') {
      //   return next(false);
      // }

      // 获取用户信息
      try {
        store.dispatch('user/getUserInfo');
      } catch (err) {
        if (err.code === 401) {
          MessageBox.confirm(err.msg, store.getters.language === 'zh-CN' ? '提示' : 'Tips', {
            confirmButtonText: store.getters.language === 'zh-CN' ? '确定' : 'Confirm',
            cancelButtonText: store.getters.language === 'zh-CN' ? '取消' : 'Cancel',
            type: 'warning',
          })
            .then(() => {
              store.dispatch('user/LogOut').then(() => {
                // 异常返回统一登录页面，需要带当前系统的APPID + 当前path
                // eslint-disable-next-line no-restricted-globals, no-undef
                location.href = `${BASE_INFO.VUE_APP_LOGIN_PAGE}?appId=${store.getters.appId}&path=${
                  to.path
                }&prjId=${getSessionItem('prjId')}`;
              });
            })
            .catch(() => {
              store.dispatch('user/LogOut').then(() => {
                next({ path: '/' });
              });
            });
        }
      }
    }
  } else {
    console.log('没取到token', to);

    // 在免登录白名单，直接进入
    if (whiteList.indexOf(to.name) !== -1) {
      next();
    } else {
      console.log(window.BASE_INFO.VUE_APP_LOGIN_PAGE, store.getters.appId, to.path, getSessionItem('prjId'));
      window.location.href = `${window?.BASE_INFO.VUE_APP_LOGIN_PAGE}?appId=${store.getters.appId}&path=${
        to.path
      }&prjId=${getSessionItem('prjId')}`;
    }
  }
};
