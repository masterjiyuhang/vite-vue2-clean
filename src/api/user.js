import { post } from '@/utils/request';

const prefix = 'erhang';
export default class User {
  /**
   * 登录
   * @param {String} username 用户名
   * @param {String} password 密码
   * @returns
   */
  static async login(username, password) {
    return post(`/${prefix}/login`, {
      username,
      password,
    });
  }
}
