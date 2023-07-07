import nProgress from '@/utils/nprogress';
import { execTrackReport } from '@/config/src/report';
// import { initPermissions } from './src/init';

const install = (Vue, { router, store }) => {
  if (install.installed) {
    return;
  }
  install.installed = true;

  router.beforeEach(async (to, from, next) => {
    // // 初始化权限信息
    // initPermissions(to, from, next, store);

    try {
      // 进行埋点上报
      await execTrackReport(store, to, from);
    } catch (error) {
      console.log(error);
    }

    nProgress.start();
    next();
  });

  router.afterEach(() => {
    nProgress.done();
  });
};

export default { install };
