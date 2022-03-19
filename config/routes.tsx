import { LaptopOutlined } from '@ant-design/icons';
export default [
  {
    path: '/',
    component: '@/layouts',
    routes: [
      {
        path: '/dashboard',
        name: '企业看板',
        icon: <LaptopOutlined />,
        component: '@/pages/index',
      },
      {
        path: '/monitor',
        name: '数据监控',
        icon: <LaptopOutlined />,
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
    ],
  },
];
