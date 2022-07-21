import React from 'react';
import {
  ControlOutlined,
  DashboardOutlined,
  DeploymentUnitOutlined,
  DesktopOutlined,
  LineChartOutlined,
  SettingOutlined,
  WarningOutlined,
} from '@ant-design/icons';
export default [
  {
    path: '/',
    component: '@/layouts',
    routes: [
      {
        path: '/dashboard',
        name: '企业看板',
        icon: <DesktopOutlined />,
        component: '@/pages/index',
      },
      {
        path: '/monitor',
        name: '数据监控',
        icon: <DashboardOutlined />,
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
        icon: <ControlOutlined />,
        routes: [
          {
            path: '/energyMerge/energyInclude',
            name: '用能概况',
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
            name: '能源流向图（二期）',
            component: '@/pages/energyMerge/flowCart',
          },
        ],
      },
      {
        path: '/comp',
        name: '企业报表',
        icon: <LineChartOutlined />,
        routes: [
          {
            path: '/comp/rate',
            name: '复费率报表',
            component: '@/pages/comp/rate',
          },
          {
            path: '/comp/electric',
            name: '参量采集报表',
            component: '@/pages/comp/electric',
          },
          {
            path: '/comp/reading',
            name: '能耗集抄报表',
            component: '@/pages/comp/reading',
          },
        ],
      },
      {
        path: '/alarm',
        name: '报警管理',
        icon: <WarningOutlined />,
        routes: [
          {
            path: '/alarm/rules',
            name: '报警规则',
            component: '@/pages/alarmMerge/rules',
          },
          {
            hideInMenu: true,
            path: '/alarm/rules/add',
            name: '新增报警规则',
            component: '@/pages/alarmMerge/rules/add',
          },
          {
            path: '/alarm/event',
            name: '事件记录（产品未做）',
            component: '@/pages/monitor/board',
          },
        ],
      },
      {
        path: '/eqMerge',
        name: '系统管理',
        icon: <SettingOutlined />,
        routes: [
          {
            path: '/eqMerge/record',
            name: '设备档案',
            component: '@/pages/eqMerge/record',
          },
          {
            hideInMenu: true,
            path: '/eqMerge/record/add',
            name: '新增设备档案',
            component: '@/pages/eqMerge/record/add',
          },
          {
            hideInMenu: true,
            path: '/eqMerge/record/detail',
            name: '查看设备档案',
            component: '@/pages/eqMerge/record/detail',
          },
          {
            path: '/eqMerge/areaNode',
            name: '区域节点',
            component: '@/pages/eqMerge/areaNode',
          },
          {
            hideInMenu: true,
            path: '/eqMerge/areaNode/add',
            name: '新增区域节点',
            component: '@/pages/eqMerge/areaNode/add',
          },
          {
            hideInMenu: true,
            path: '/eqMerge/areaNode/detail',
            name: '查看节点详情',
            component: '@/pages/eqMerge/areaNode/detail',
          },
          {
            hideInMenu: true,
            path: '/eqMerge/areaNode/edit',
            name: '更新节点信息',
            component: '@/pages/eqMerge/areaNode/edit',
          },
        ],
      },
      {
        path: '/devops',
        name: '运维管理（产品未做）',
        icon: <DeploymentUnitOutlined />,
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
