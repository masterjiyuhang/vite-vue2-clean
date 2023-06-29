// /**
//  * 是否为开发环境
//  * @returns {Boolean}
//  */
// export const isDev = () => {
//   return import.meta.env.DEV;
// };

// /**
//  * 是否为生产环境
//  * @returns {Boolean}
//  */
// export const isProd = () => {
//   return import.meta.env.PROD;
// };

// Read all environment variable configuration files to process.env
export function wrapperEnv(envConf) {
  const ret = {};

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n');
    // eslint-disable-next-line no-nested-ternary
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;

    if (envName === 'VITE_PORT') {
      realName = Number(realName);
    }
    if (envName === 'VITE_PROXY') {
      try {
        realName = JSON.parse(realName);
      } catch (error) {
        console.log(error);
      }
    }
    ret[envName] = realName;
    process.env[envName] = realName;
  }
  return ret;
}
