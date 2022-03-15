import { defineConfig } from 'umi';

export default defineConfig({
  layout: {
    menu: {

    }
  },
  mfsu: {},
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', name: '欢迎', component: '@/pages/index' },
    { path: '/one', name: '欢迎', component: '@/pages/index' },
    { path: '/two', name: '欢迎', component: '@/pages/index' },
    { path: '/three', name: '欢迎', component: '@/pages/index' },
  ],
  fastRefresh: {},
});
