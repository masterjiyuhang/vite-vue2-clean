import request from '@/utils/request';

const prefix = import.meta.env.MODE === 'development' ? 'jctrans' : '';
// 获取验证图片  以及token
export function reqGet(data) {
  return request({
    url: `${prefix}/code`,
    method: 'post',
    data,
  });
}

// 滑动或者点选验证
export function reqCheck(data) {
  return request({
    url: `${prefix}/check`,
    method: 'post',
    data,
  });
}
