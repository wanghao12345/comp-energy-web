export default [
  {
    path: '/',
    name: '企业看板',
    icon: 'dashboard',
    component: '@/pages/index',
  },
  {
    path: '/monitor',
    name: '数据监控',
    icon: 'dashboard',
    routes: [
      {
        path: '/monitor/real',
        name: '实时监控',
        component: '@/pages/monitor/real',
      },
      {
        path: '/monitor/board',
        name: '数据看板',
        component: '@/pages/monitor/board',
      },
    ],
  },
];
