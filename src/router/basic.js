const modules = import.meta.glob(['./modules/**/*.js'], {
  eager: true,
});

// 导出constantMenus作为待处理的menu菜单
const constantMenuRoutes = [];

Object.keys(modules).forEach((key) => {
  constantMenuRoutes.push(...modules[key].default);
});

export const HOME_URL = '/';

export const basicRouter = [
  {
    path: '',
    name: 'Layout',
    component: () => import('@/layouts/index.vue'),
    redirect: HOME_URL,
    children: [...constantMenuRoutes],
  },
];
