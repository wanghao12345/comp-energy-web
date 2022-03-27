import React from 'react';
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
      {
        name: '能源管理',
        path: '/energyMerge',
        icon: <LaptopOutlined />,
        routes: [
          {
            path: '/energyMerge/energyInclude',
            name: '用能概括',
            component: '@/pages/energyMerge/energyInclude',
          },
          {
            path: '/energyMerge/expendBoard',
            name: '能耗看板',
            component: '@/pages/energyMerge/expendBoard',
          },
          {
            path: '/energyMerge/trendAnalysis',
            name: '趋势分析',
            component: '@/pages/energyMerge/trendAnalysis',
          },
          // {
          //   path: '/energy/compare',
          //   name: '对比（损耗）分析',
          //   component: '@/pages/monitor/board',
          // },
          {
            path: '/energyMerge/consumptionReport',
            name: '用能报表',
            component: '@/pages/energyMerge/consumptionReport',
          },
          {
            path: '/energyMerge/wastageReport',
            name: '损耗报表',
            component: '@/pages/energyMerge/wastageReport',
          },
          {
            path: '/energyMerge/flowCart',
            name: '能源流向图',
            component: '@/pages/energyMerge/flowCart',
          },
        ],
      },
      {
        path: '/comp',
        name: '企业报表',
        icon: <LaptopOutlined />,
        routes: [
          {
            path: '/comp/rate',
            name: '复费率报表',
            component: '@/pages/comp/rate',
          },
          {
            path: '/comp/electric',
            name: '电参量采集报表',
            component: '@/pages/comp/electric',
          },
          {
            path: '/comp/reading',
            name: '能耗集抄报表',
            component: '@/pages/monitor/board',
          },
          {
            path: '/comp/param',
            name: '电参量采集报表',
            component: '@/pages/monitor/board',
          },
        ],
      },
      {
        path: '/alarm',
        name: '报警管理',
        icon: <LaptopOutlined />,
        routes: [
          {
            path: '/alarm/rules',
            name: '报警规则',
            component: '@/pages/monitor/real',
          },
          {
            path: '/alarm/event',
            name: '事件记录',
            component: '@/pages/monitor/board',
          },
        ],
      },
      {
        path: '/device',
        name: '设备管理',
        icon: <LaptopOutlined />,
        routes: [
          {
            path: '/device/archives',
            name: '设备档案',
            component: '@/pages/monitor/real',
          },
          {
            path: '/device/node',
            name: '区域节点',
            component: '@/pages/monitor/board',
          },
        ],
      },
      {
        path: '/devops',
        name: '运维管理',
        icon: <LaptopOutlined />,
        routes: [
          {
            path: '/devops/user',
            name: '用户管理',
            component: '@/pages/monitor/real',
          },
          {
            path: '/devops/electricity',
            name: '电价管理',
            component: '@/pages/monitor/board',
          },
          {
            path: '/devops/plan',
            name: '巡检计划',
            component: '@/pages/monitor/board',
          },
          {
            path: '/devops/record',
            name: '巡检记录',
            component: '@/pages/monitor/board',
          },
        ],
      },
    ],
  },
];
