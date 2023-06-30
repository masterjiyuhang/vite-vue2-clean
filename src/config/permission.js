import nProgress from '@/utils/nprogress';
import { execTrackReport } from '@/config/src/report';

const install = (Vue, { router, store }) => {
  if (install.installed) {
    // eslint-disable-next-line no-useless-return
    return;
  }
  install.installed = true;

  router.beforeEach(async (to, from, next) => {
    // 进行埋点上报
    await execTrackReport(store, to, from);
    nProgress.start();
    next();
  });

  router.afterEach(() => {
    nProgress.done();
  });
};

export default { install };
