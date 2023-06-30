import { post } from '@/utils/request';
import { jctransPrefix } from './prefix';

/**
 * 获取用户信息
 * @returns
 */
export const getUserInfoApi = () => {
  return post(`${jctransPrefix}/auth/user`);
};

/**
 * 获取ExChange，换取Token
 * @param {*} data
 * @returns
 */
export const authExchangeApi = (data) => post(`${jctransPrefix}/auth/exchange`, data);

// 退出方法
export const logoutApi = () => post(`${jctransPrefix}/logout`);
