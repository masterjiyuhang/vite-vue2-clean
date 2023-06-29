import trackReport from '@/directives/modules/trackReport/index';
import copy from '@/directives/modules/copy/index';

const directivesList = {
  copy,
  trackReport,
};

const directives = {
  install(app) {
    Object.keys(directivesList).forEach((item) => {
      app.directive(item, directivesList[item]);
    });
  },
};

export default directives;
