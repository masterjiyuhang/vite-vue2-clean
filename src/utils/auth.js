import Cookies from 'js-cookie';

const TokenKey = 'Tsp-Token';

const ExpiresInKey = 'Tsp-Expires-In';

export function getToken() {
  return Cookies.get(TokenKey);
}

// 工程默认APPID获取
export function getAppId() {
  return 'ERA';
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getExpiresIn() {
  return Cookies.get(ExpiresInKey) || -1;
}

export function setExpiresIn(time) {
  return Cookies.set(ExpiresInKey, time);
}

export function removeExpiresIn() {
  return Cookies.remove(ExpiresInKey);
}

export function setCookiesData(key, data) {
  return Cookies.set(key, data);
}

export function getCookiesData(key) {
  return Cookies.get(key);
}
