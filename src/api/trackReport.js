import http from '@/utils/request';

const prefix = import.meta.env.MODE === 'development' ? 'jctrans' : '';

/**
 * 埋点上报接口
 * @param {*} data
 * @param {*} headers
 * @returns
 */
export const reportApi = (data, headers) => {
  return http({
    url: `/${prefix}/tracking/report`,
    method: 'post',
    data,
    headers,
  });
};
