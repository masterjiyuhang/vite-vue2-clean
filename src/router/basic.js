const modules = import.meta.glob(['./modules/**/*.js'], {
  eager: true,
});

export const HOME_URL = '/';

// 导出constantMenus作为待处理的menu菜单
const constantMenuRoutes = [];

Object.keys(modules).forEach((key) => {
  constantMenuRoutes.push(...modules[key].default);
});

// modules下面导出的路由信息
export const moduleRouteList = constantMenuRoutes;

export const staticRouter = [
  {
    path: '',
    name: 'layout',
    component: () => import('@/layouts/index.vue'),
    redirect: HOME_URL,
    children: [...moduleRouteList],
  },
];

export const errorRouter = [
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: '404页面',
    },
  },
  // 解决刷新页面，路由警告
  {
    // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404.vue'),
  },
];
